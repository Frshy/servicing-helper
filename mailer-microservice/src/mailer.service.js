const { redisClient, getOrSetCacheObject } = require('./redis.helper');
const { mailTransporter, getEmailTrackingImageUrl } = require('./email.helper');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function findAllEmails() {
    const emails = await getOrSetCacheObject('emails', async () => {
        return await prisma.email.findMany({
            include: {
                EmailEvent: true,
            }
        });
    });

    return emails;
}

async function findAllEmailsEvents() {
    const emailsEvents = await getOrSetCacheObject('emailsEvents', async () => {
        return await prisma.emailEvent.findMany({
            include: {
                email: true,
            }
        });
    });

    return emailsEvents;
}

async function findEmail(args) {
    const email = await getOrSetCacheObject(`emails:${args.id}`, async () => {
        return await prisma.email.findUnique({
            where: { id: args.id },
            include: {
                EmailEvent: true,
            }
        });
    });

    return email;
}

async function findEmailEvent(args) {
    const emailEvent = await getOrSetCacheObject(`emailsEvents:${args.id}`, async () => {
        return await prisma.emailEvent.findUnique({
            where: {
                id: args.id,
            },
            join: {
                email: true,
            }
        });
    });

    return emailEvent;
}

async function sendEmail(args) {
    await redisClient.del('emails');

    const partUrl = await getEmailTrackingImageUrl();
    const fullUrl = (process.env.ACCESSIBLE_CDN_URL || process.env.CDN_URL) + partUrl;
    const fullHtml = args.html + `<img src="${fullUrl}"/>`

    await mailTransporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: args.receiver,
        subject: args.subject,
        text: args.text,
        html: fullHtml,
    });

    const generatedEmail = await prisma.email.create({
        data: {
            sentFrom: process.env.SMTP_EMAIL,
            sentTo: args.receiver,
            subject: args.subject,
            text: args.text,
            html: fullHtml,
            trackingImageUrl: partUrl
        }
    });


    return generatedEmail;
}

async function createEmailEvent(args) {
    await redisClient.del('emailsEvents');

    const emailExists = await prisma.email.count({
        where: {
            trackingImageUrl: args.trackingImageUrl
        }
    });

    if (!emailExists) {
        throw "There is no email sent with such event tracking image path (url)!";
    }

    const createdEmailEvent = await prisma.emailEvent.create({
        data: {
            email: {
                connect: {
                    trackingImageUrl: args.trackingImageUrl
                }
            },
            type: "OPENED"
        }
    });

    return createdEmailEvent
}

async function deleteEmail(args) {
    try {
        const deletedEmail = await prisma.$transaction(async (tx) => {
            await redisClient.del('emailsEvents');

            const eventsToDelete = await prisma.emailEvent.findMany({
                where: {
                    emailId: args?.id
                }
            })

            const deletedEvents = await prisma.emailEvent.deleteMany({
                where: {
                    emailId: args?.id
                }
            });

            for (const event of eventsToDelete) {
                await redisClient.del(`emailsEvents:${event.id}`)
            }

            await redisClient.del('emails');
            await redisClient.del(`emails:${args.id}`);

            const delEmail = await prisma.email.delete({
                where: {
                    id: args.id
                }
            });

            return delEmail;
        });

        return deletedEmail;
    } catch (err) {
        console.log(err)
        throw 'Failed to delete the email!';
    }
}

async function deleteEmailEvents(args) {
    await redisClient.del('emailsEvents');

    const eventsToDelete = await prisma.emailEvent.findMany({
        where: {
            emailId: args?.id
        }
    })

    const deletedEvents = await prisma.emailEvent.deleteMany({
        where: {
            emailId: args?.id
        }
    });

    for (const event of eventsToDelete) {
        await redisClient.del(`emailsEvents:${event.id}`)
    }

    return deletedEvents;
}

async function deleteEmailEvent(args) {
    await redisClient.del('emailsEvents');
    await redisClient.del(`emailsEvents:${args.id}`);

    const deletedEvent = await prisma.emailEvent.delete({
        where: {
            id: args.id,
        }
    })

    return deletedEvent;
}

module.exports = {
    findAllEmails,
    findAllEmailsEvents,
    findEmail,
    findEmailEvent,
    sendEmail,
    createEmailEvent,
    deleteEmail,
    deleteEmailEvents,
    deleteEmailEvent
}