const Ajv = require('ajv');

const ajv = new Ajv();

class SchemaValidator {
    static validate(schema, response) {
        const validate = ajv.compile(schema);

        const valid = validate(response);

        if (!valid) {
            throw new Error(JSON.stringify(validate.errors, null, 2));
        }
    }
}

module.exports = SchemaValidator;
