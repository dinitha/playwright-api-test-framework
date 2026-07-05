const Logger = require('../../utils/logger');

class BaseApiClient {
    constructor(request) {
        this.request = request;
    }

    async execute(apiCall) {
        let attempt = 0;
        const maxRetries = 2;

        while (attempt <= maxRetries) {
            const startTime = Date.now();

            try {
                const response = await apiCall();

                const duration = Date.now() - startTime;

                await Logger.log(response, duration);

                // Retry only for transient server errors
                if (response.status() >= 500 && attempt < maxRetries) {
                    console.log(`Retrying request... Attempt ${attempt + 1}`);
                    attempt++;
                    continue;
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
