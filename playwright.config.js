const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    reporter: [['list'], ['html', { open: 'never' }]],

    use: {
        baseURL: 'https://api.restful-api.dev',
        extraHTTPHeaders: {
            'Content-Type': 'application/json',

            'x-api-key': process.env.API_KEY,
        },
    },
});
