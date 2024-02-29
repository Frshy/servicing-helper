import { ConflictException, ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios'
import * as pdf from 'html-pdf'
import * as ejs from 'ejs'
import * as fs from 'fs';
import * as path from 'path';
import * as FormData from 'form-data'
const phantomPath = require('witch')('phantomjs-prebuilt', 'phantomjs');
const puppeteer = require('puppeteer');

@Injectable()
export class FinanceService {
    constructor(private readonly prisma: PrismaService) { }

    async findOne(id: number) {
        const document = await this.prisma.document.findUnique({
            where: { id }
        });

        if (!document) {
            throw new NotFoundException('There is no document with such id');
        }

        return document;
    }

    async findAll() {
        const documents = await this.prisma.document.findMany();
        return documents;
    }

    async forSale(saleId: number) {
        const document = await this.prisma.document.findFirst({
            where: {
                saleId
            }
        });

        return document;
    }

    async forEmail(emailId: number) {
        const document = await this.prisma.document.findFirst({
            where: {
                emailId
            }
        });

        return document;
    }

    async createDocument(saleId: number, authorization: string, user: any) {
        const documentAlreadyCreated = await this.prisma.document.count({
            where: {
                saleId
            }
        });

        if (documentAlreadyCreated) {
            throw new ConflictException('Document for this sale already exists!');
        }

        const sale = await this.getSaleById(saleId, authorization);
        const documentFile = await this.generateDocument({
            username: sale.user.username,
            createdAt: (await this.formatDate(sale?.createdAt)),
            ...sale
        });
        const partUrl = await this.uploadFileToCDN(documentFile, `SaleDocument-${sale.id}.pdf`);
        const fullUrl = (process.env.ACCESSIBLE_CDN_URL || process.env.CDN_URL) + partUrl;

        const emailText = `
            Hello ${sale?.user?.username}, below is info about service you ordered!
            Service: ${sale?.service}
            Price: ${sale?.price}$
            Ordered at: ${await this.formatDate(sale?.createdAt)}

            Styled document which you can print is avaible at: ${fullUrl}
        `

        const emailHtml = `
            Hello ${sale?.user?.username}, below is info about service you ordered! <br>
            Service: ${sale?.service} <br>
            Price: ${sale?.price}$ <br>
            Ordered at: ${await this.formatDate(sale?.createdAt)} <br>

            <a href="${fullUrl}">Click here to see styled document</a> <br>
        `

        const emailInfo = await this.sendDocumentInEmail(
            user,
            {
                receiver: sale?.user?.email,
                subject: `${sale?.service} Sale Document`,
                text: emailText,
                html: emailHtml
            });


        const document = await this.prisma.document.create({
            data: {
                saleId,
                emailId: +emailInfo.id,
                documentUrl: partUrl,
            }
        });

        return document;
    }

    async sendDocumentInEmail(user, emailArgs) {
        const mutation = `
            mutation SendEmail($receiver: String!, $subject: String!, $text: String!, $html: String!) {
                sendEmail(receiver: $receiver, subject: $subject, text: $text, html: $html) {
                    id
                    sentFrom
                    sentTo
                    subject
                    text
                    html
                    trackingImageUrl
                }
            }
            `;

        const variables = {
            receiver: emailArgs.receiver,
            subject: emailArgs.subject,
            text: emailArgs.text,
            html: emailArgs.html
        };

        try {
            const response = await axios.post(process.env.MAILER_URL, {
                query: mutation,
                variables: variables
            },
                {
                    headers: {
                        user: JSON.stringify(user),
                        'x-api-key': process.env.MAILER_API_KEY
                    }
                });

            return response.data.data.sendEmail;
        } catch (error) {
            throw new HttpException('Error:' + error?.response?.data || 'Unknown error', error?.response?.status);
        }
    }

    async deleteDocument(id: number) {
        const existingDocument = await this.prisma.document.findUnique({
            where: {
                id
            }
        });

        if (!existingDocument) {
            throw new NotFoundException('There is no document with such id!');
        }

        await this.deleteAssetFromCDN(existingDocument.documentUrl);

        const deletedDocument = await this.prisma.document.delete({
            where: {
                id
            }
        });

        return deletedDocument;
    }

    async deleteAssetFromCDN(tokenAndFilename) {
        const url = process.env.CDN_URL + tokenAndFilename;
        const headers = {
            'x-api-key': process.env.CDN_API_KEY
        };

        try {
            const response = await axios.delete(url, { headers });
            return response.data;
        } catch (error) {
            throw new HttpException(error?.response?.message, error?.response?.status);
        }
    }


    async getSaleById(id: number, authorization: string) {
        //kind of trash code, im pretty sure its not good approach to fetch it from gateway
        try {
            const response = await axios.post(
                process.env.GATEWAY_URL,
                {
                    query: `
                    query {
                        findOneSale(id: ${id}) {
                            id
                            service
                            price
                            editedAt
                            createdAt
                            user {
                                id
                                username
                                email
                            }
                        }
                    }
                `,
                },
                {
                    headers: {
                        Authorization: authorization
                    },
                }
            );

            const data = response.data;
            if (data?.errors) {
                throw new ForbiddenException(data?.errors[0]?.message);
            }

            const sale = data.data.findOneSale;
            return sale;
        } catch (err) {
            if (err instanceof ForbiddenException) {
                throw err;
            } else {
                throw new HttpException(err?.response?.data, err?.response?.status);
            }
        }
    }

    async generateDocument(data) {
        return new Promise((resolve, reject) => {
            ejs.renderFile(path.resolve(process.cwd(), 'resources', 'documentTemplate.ejs'), data, async function (err, html) {
                if (err) {
                    reject(err);
                }

                const browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox']
                });
                const page = await browser.newPage();

                await page.setContent(html, {
                    waitUntil: 'domcontentloaded'
                });

                try {
                    const buffer = await page.pdf({ format: 'Letter' });
                    await browser.close();
                    resolve(buffer);
                } catch (err) {
                    await browser.close();
                    reject(err);
                }
            });
        });
    }

    async uploadFileToCDN(buffer, filename) {
        try {
            const formData = new FormData();
            const fileBlob = Buffer.from(buffer, 'binary');

            formData.append('file', fileBlob, { filename });

            const headers = {
                'Content-Type': `multipart/form-data`,
                'x-api-key': process.env.CDN_API_KEY
            };

            const response = await axios.post(`${process.env.CDN_URL}/add-asset`, formData, { headers });

            return response.data.url;
        } catch (error) {
            throw new Error(`Error uploading buffer to CDN: ${error.message}`);
        }
    }

    async formatDate(inputDate: Date): Promise<string> {
        const date = new Date(inputDate);

        const day: string = String(date.getDate()).padStart(2, '0');
        const month: string = String(date.getMonth() + 1).padStart(2, '0');
        const year: string = String(date.getFullYear());
        const hours: string = String(date.getHours()).padStart(2, '0');
        const minutes: string = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
}
