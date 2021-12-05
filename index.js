const Application = require('./src/Application')

new Application()
    .start()
    .catch((error) => {
        console.log(error);
        process.exit();
    });
