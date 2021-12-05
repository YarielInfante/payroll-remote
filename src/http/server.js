const routes = require('./routes')
const express = require('express');

const server = express();

module.exports = async function init() {
    try {
        server.use(routes)
        server.listen(3001, () => {
            console.log('Express App Listening on Port 3001');
        });
    } catch (error) {
        console.error(`An error occurred: ${JSON.stringify(error)}`);
        process.exit(1);
    }
}
