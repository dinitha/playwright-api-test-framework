const Logger = require('../../utils/logger');

class BaseApiClient {
    constructor(request) {
        this.request = request;
    }

    async execute(apiCall, testInfo) {
        let attempt = 0;
        const maxRetries = 2;

        while (attempt <= maxRetries) {
            const startTime = Date.now();

            try {
                const response = await apiCall();

                const duration = Date.now() - startTime;
                const body = await response.text();
                await Logger.log(response, duration);

                // Retry only for transient server errors
                if (response.status() >= 500 && attempt < maxRetries) {
                    console.log(`Retrying request... Attempt ${attempt + 1}`);
                    attempt++;
                    continue;
                }
                if (testInfo) {
                    await testInfo.attach('API Response', {
                        body: body,

                        contentType: 'application/json',
                    });
                }
                return response;
            } catch (error) {
                if (attempt >= maxRetries) throw error;

                console.log(`Retrying due to exception... Attempt ${attempt + 1}`);

                attempt++;
            }
        }
    }
}

module.exports = BaseApiClient;
