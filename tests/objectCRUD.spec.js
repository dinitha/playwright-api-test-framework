const { test, expect } = require('@playwright/test');

const ObjectClient = require('../api/clients/ObjectClient');

const {

    createObjectPayload

} = require('../utils/payloadFactory');

let objectId;

let client;

test.beforeEach(async ({ request }) => {

    client = new ObjectClient(request);

});

test("1. Get all objects", async () => {

    const response = await client.getAllObjects();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

});

test("2. Add object", async () => {

    const payload = createObjectPayload();

    const response = await client.createObject(payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe(payload.name);

    objectId = body.id;

    expect(objectId).toBeTruthy();

});

test("3. Get created object", async () => {

    const payload = createObjectPayload();

    const createResponse = await client.createObject(payload);

    objectId = (await createResponse.json()).id;

    const response = await client.getObject(objectId);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(objectId);

    expect(body.name).toBe(payload.name);

});

test("4. Update object", async () => {

    const payload = createObjectPayload();

    const createResponse = await client.createObject(payload);

    objectId = (await createResponse.json()).id;

    payload.data.price = 2000;

    payload.data.RAM = "64 GB";

    const response = await client.updateObject(objectId, payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.price).toBe(2000);

    expect(body.data.RAM).toBe("64 GB");

});

test("5. Delete object", async () => {

    const payload = createObjectPayload();

    const createResponse = await client.createObject(payload);

    objectId = (await createResponse.json()).id;

    const response = await client.deleteObject(objectId);

    expect(response.status()).toBe(200);

    const getResponse = await client.getObject(objectId);

    expect(getResponse.status()).toBe(404);

});