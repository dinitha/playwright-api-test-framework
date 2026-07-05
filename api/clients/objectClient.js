const BaseApiClient = require('./baseAPIClient');
const endpoints = require('../endpoints');

class ObjectClient extends BaseApiClient {
    constructor(request) {
        super(request);
    }

    async getAllObjects() {
        return await this.execute(() => this.request.get(endpoints.OBJECTS));
    }

    async getObject(id) {
        return await this.execute(() => this.request.get(`${endpoints.OBJECTS}/${id}`));
    }

    async createObject(payload) {
        return await this.execute(() =>
            this.request.post(endpoints.OBJECTS, {
                data: payload,
            })
        );
    }

    async updateObject(id, payload) {
        return await this.execute(() =>
            this.request.put(`${endpoints.OBJECTS}/${id}`, {
                data: payload,
            })
        );
    }

    async deleteObject(id) {
        return await this.execute(() => this.request.delete(`${endpoints.OBJECTS}/${id}`));
    }
}

module.exports = ObjectClient;
