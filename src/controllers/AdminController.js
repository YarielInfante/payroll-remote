const adminService = require('../services/AdminService')

class AdminController {

    async getBestProfessionsByDate({start, end, limit}) {
        return (await adminService.getBestProfessionsByDate({start, end, limit})).map(this.serializePreofession)
    }

    async getBestClientsByDate({start, end, limit}) {
        return (await adminService.getBestClientsByDate({start, end, limit})).map(this.serializeClient)
    }

    serializeClient(client) {
        return {
            id: client.Contract.client.id,
            fullName: client.Contract.client.firstName.concat(' ').concat(client.Contract.client.lastName),
            paid: client.price
        }
    }

    serializePreofession(profession) {
        return {
            profession: profession.Contract.contractor.profession,
            total: profession.price
        }
    }

}

module.exports = new AdminController()
