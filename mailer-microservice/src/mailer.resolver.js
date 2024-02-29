const Guards = require('./guards')
const mailerService = require('./mailer.service')
const { redisClient, getOrSetCacheObject } = require('./redis.helper');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const resolvers = {
    Query: {
        findAllEmails: async (parent, args, context) => {
            Guards.adminGuardCheck(context.user);
            Guards.apiKeyGuardCheck(context.apiKey);

            return mailerService.findAllEmails();
        },

        findAllEmailsEvents: async (parent, args, context) => {
            Guards.adminGuardCheck(context.user);
            Guards.apiKeyGuardCheck(context.apiKey);

            return mailerService.findAllEmailsEvents();
        },

        findEmail: async (parent, args, context) => {
            Guards.adminGuardCheck(context.user);
            Guards.apiKeyGuardCheck(context.apiKey);

            return mailerService.findEmail(args);
        },

        findEmailEvent: async (parent, args, context) => {
            Guards.adminGuardCheck(context.user);
            Guards.apiKeyGuardCheck(context.apiKey);

            return mailerService.findEmailEvent(args);
        }
    },
    Mutation: {
        sendEmail: async (parent, args, context) => {
            Guards.adminGuardCheck(context.user);
            Guards.apiKeyGuardCheck(context.apiKey);

            return mailerService.sendEmail(args);
        },

        createEmailEvent: async (parents, args, context) => {
            Guards.apiKeyForEventsGuardCheck(context.apiKey);

            return mailerService.createEmailEvent(args);
        },

        deleteEmail: async (parent, args, context) => {
            Guards.adminGuardCheck(context.user);
            Guards.apiKeyGuardCheck(context.apiKey);

            return mailerService.deleteEmail(args);
        },

        deleteEmailEvents: async (parent, args, context) => {
            Guards.adminGuardCheck(context.user);
            Guards.apiKeyGuardCheck(context.apiKey);

            return mailerService.deleteEmailEvents(args);
        },

        deleteEmailEvent: async (parent, args, context) => {
            Guards.adminGuardCheck(context.user);
            Guards.apiKeyGuardCheck(context.apiKey);

            return mailerService.deleteEmailEvent(args);
        }
    },
    email: {
        __resolveReference: async (reference) => {
            Guards.apiKeyGuardCheck(context.apiKey);
            
            return mailerService.findEmail({ id: reference.id });
        },
    }
}

module.exports = resolvers