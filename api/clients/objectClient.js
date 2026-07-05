const BaseApiClient = require('./baseAPIClient');
const endpoints = require('../endpoints');

class ObjectClient extends BaseApiClient {
    constructor(request) {
        super(request);
    }

    async getAllObjects(testInfo) {
        return await this.execute(() => this.request.get(endpoints.OBJECTS), testInfo);
    }

    async getObject(id, testInfo) {
        return await this.execute(() => this.request.get(`${endpoints.OBJECTS}/${id}`), testInfo);
    }

    async createObject(payload, testInfo) {
        return await this.execute(
            () =>
                this.request.post(endpoints.OBJECTS, {
                    data: payload,
                }),
            testInfo
        );
    }

    async updateObject(id, payload, testInfo) {
        return await this.execute(
            () =>
                this.request.put(`${endpoints.OBJECTS}/${id}`, {
                    data: payload,
                }),
            testInfo
        );
    }

    async deleteObject(id, testInfo) {
        return await this.execute(
            () => this.request.delete(`${endpoints.OBJECTS}/${id}`),
            testInfo
        );
    }
}

module.exports = ObjectClient;
