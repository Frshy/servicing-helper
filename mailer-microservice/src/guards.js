function adminGuardCheck(user) {
    if (!user) {
        throw 'Forbidden resource';
    }

    const parsedUser = JSON.parse(user);

    if (!parsedUser?.admin) {
        throw 'Forbidden resource';
    }
}

function apiKeyGuardCheck(apiKey) {
    if (apiKey !== process.env.API_KEY) {
        throw 'Forbidden resource';
    }
}

function apiKeyForEventsGuardCheck(apiKey) {
    if (apiKey !== process.env.API_KEY_FOR_EVENTS) {
        throw 'Forbidden resource';
    }
}

module.exports = {
    adminGuardCheck,
    apiKeyGuardCheck,
    apiKeyForEventsGuardCheck
}