const db = require('../models')

module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await db.User.findAll()
            res.json(users)
        } catch (error) {
            res.status(500).json({
                message: 'Error getting users',
                error
            })
        }
    },
    getOne: (req, res) => {
        res.json({
            message: 'Welcome to the API v1'
        })
    }
}