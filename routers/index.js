const Router = require('express').Router()
Router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API v1'
    })
})
Router.use('/auth', require('./auth'))
Router.use('/user', require('./user'))

module.exports = Router
