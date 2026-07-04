const endpoints = require('../endpoints');

class ObjectClient {

    constructor(request) {

        this.request = request;

    }

    async getAllObjects() {

        return await this.request.get(endpoints.OBJECTS);

    }

    async createObject(payload) {

        return await this.request.post(endpoints.OBJECTS, {

            data: payload

        });

    }

    async getObject(id) {

        return await this.request.get(`${endpoints.OBJECTS}/${id}`);

    }

    async updateObject(id, payload) {

        return await this.request.put(`${endpoints.OBJECTS}/${id}`, {

            data: payload

        });

    }

    async deleteObject(id) {

        return await this.request.delete(`${endpoints.OBJECTS}/${id}`);

    }

}

module.exports = ObjectClient;