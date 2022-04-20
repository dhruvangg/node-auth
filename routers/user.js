const Router = require('express').Router(),
    UserController = require('../controllers/user')


Router.get('/', UserController.getAll).post('/', (req, res) => {
    res.json({
        message: 'Post User Router'
    })
}).put('/', (req, res) => {
    res.json({
        message: 'Put User Router'
    })
}).delete('/', (req, res) => {
    res.json({
        message: 'Delete User Router'
    })
})

module.exports = Router