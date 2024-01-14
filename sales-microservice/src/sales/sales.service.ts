import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleInput } from './dto/create-sale.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchSaleInput } from './dto/patch-sale.input';

@Injectable()
export class SalesService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(input: CreateSaleInput) {
        const sale = await this.prisma.sale.create({
            data: {
                ...input
            }
        });

        if (!sale) {
            throw new ForbiddenException('Error when creating the sale!');
        }

        return sale
    }

    async patch(input: PatchSaleInput) {
        const saleExists = await this.prisma.sale.count({
            where: {
                id: input.id,
            }
        });

        if (!saleExists) {
            throw new NotFoundException('There is no sale with such id');
        }

        const sale = await this.prisma.sale.update({
            where: {
                id: input.id
            },
            data: {
                ...input
            }
        });

        return sale
    }

    async delete(id: number) {
        const saleExists = await this.prisma.sale.count({
            where: {
                id
            }
        });

        if (!saleExists) {
            throw new NotFoundException('There is no sale with such id');
        }

        const deletedSale = await this.prisma.sale.delete({
            where: {
                id
            }
        });

        return deletedSale;
    }

    async findAll() {
        const sales = await this.prisma.sale.findMany();

        return sales;
    }

    async findOne(id: number) {
        const sale = await this.prisma.sale.findUnique({
            where: { id }
        });

        if (!sale) {
            throw new NotFoundException('There is no sale with such id');
        }

        return sale;
    }

    async forUser(userId: number) {
        const sales = await this.prisma.sale.findMany({
            where: {
                orderedBy: userId
            }
        });

        return sales;
    }
}
