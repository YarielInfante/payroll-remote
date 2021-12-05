const server = require('./http/server')
const {sequelize: database} = require('./model/model')

class Application {

    async start() {
        await database.authenticate()
        await server()
    }
}

module.exports = Application;
