const { login, findAll } = require('../../../controllers/user.controller')

const UserRouter = (url, app) => {
    app.get(`${url}/all`, findAll)
    app.post(`${url}/login`, login)
}

module.exports = UserRouter