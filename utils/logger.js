class Logger {
    static async log(response, duration) {
        console.log('\n========================================');
        console.log('URL      :', response.url());
        console.log('STATUS   :', response.status());
        console.log('TIME(ms) :', duration);

        try {
            const body = await response.json();
            console.log('BODY');
            console.log(JSON.stringify(body, null, 2));
        } catch {
            console.log(await response.text());
        }

        console.log('========================================\n');
    }
}

module.exports = Logger;
