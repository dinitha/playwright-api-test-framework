const { test, expect } = require('@playwright/test');

const ObjectClient = require('../api/clients/ObjectClient');
const schema = require('../api/schemas/object.schema.json');
const listSchema = require('../api/schemas/object-list.schema.json');
const deleteSchema = require('../api/schemas/delete-object.schema.json');

const SchemaValidator = require('../utils/schemaValidator');

const { createObjectPayload } = require('../utils/payloadFactory');

let objectId;

let client;

test.beforeEach(async ({ request }) => {
    client = new ObjectClient(request);
});

test('Verify user is able to get the list of all objects', async () => {
    const response = await client.getAllObjects();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    SchemaValidator.validate(listSchema, body);
});

test('Verify user is able to add an object', async () => {
    const payload = createObjectPayload();

    const response = await client.createObject(payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe(payload.name);

    objectId = body.id;

    expect(objectId).toBeTruthy();
    SchemaValidator.validate(schema, body);
});

test('Verify user is able to get a single object using the ID', async () => {
    const payload = createObjectPayload();

    const createResponse = await client.createObject(payload);

    objectId = (await createResponse.json()).id;

    const response = await client.getObject(objectId);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(objectId);

    expect(body.name).toBe(payload.name);
    SchemaValidator.validate(schema, body);
});

test('Verify user is able to update the object', async () => {
    const payload = createObjectPayload();

    const createResponse = await client.createObject(payload);

    objectId = (await createResponse.json()).id;

    payload.data.price = 2000;

    payload.data.RAM = '64 GB';

    const response = await client.updateObject(objectId, payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.price).toBe(2000);

    expect(body.data.RAM).toBe('64 GB');
    SchemaValidator.validate(schema, body);
});

test('Verify user is able to delete the object', async () => {
    const payload = createObjectPayload();

    const createResponse = await client.createObject(payload);

    objectId = (await createResponse.json()).id;

    const response = await client.deleteObject(objectId);

    expect(response.status()).toBe(200);

    const body = await response.json();

    const getResponse = await client.getObject(objectId);

    expect(getResponse.status()).toBe(404);
    SchemaValidator.validate(deleteSchema, body);

    expect(body.message).toContain('has been deleted');
});
