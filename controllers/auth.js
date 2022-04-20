const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    db = require('../models')

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await db.User.findOne({ where: { email } })
            if (!user) {
                return res.status(401).json({ message: 'User not found' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h', algorithm: 'HS256', issuer: `${req.protocol}://${req.hostname}` })

                const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d', algorithm: 'HS256', issuer: `${req.protocol}://${req.hostname}` })

                // await db.RefreshToken.create({
                //     token: refreshToken,
                //     userId: user.id
                // })

                return res.status(200).json({
                    message: 'Login Success',
                    token,
                    refreshToken
                })
            }
            return res.status(401).json({ message: 'Invalid email/password' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error', error })
        }
    },
    register: async (req, res) => {
        const { firstname, lastname, email, password: plainTextPassword } = req.body
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(plainTextPassword, salt)
        try {
            const user = await db.User.create({ firstname, lastname, email, password })
            res.json(user)
        } catch (error) {
            res.status(500).json({
                message: 'Error registering user',
                error
            })
        }
    },
    refreshToken: async (req, res) => {
        const { refreshToken } = req.body

        try {
            const getRefreshToken = await db.RefreshToken.findOne({ where: { token: refreshToken } })
            if (!getRefreshToken) {
                return res.status(401).json({ message: 'Invalid refresh token' })
            }
            const payload = jwt.verify(refreshToken, process.env.SECRET_KEY, { issuer: `${req.protocol}://${req.hostname}` })
            const user = await db.User.findOne({ where: { id: payload.id } })
            if (!user) {
                return res.status(401).json({ message: 'User not found' })
            }
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h', algorithm: 'HS256', issuer: `${req.protocol}://${req.hostname}` })
            const refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '7d', algorithm: 'HS256', issuer: `${req.protocol}://${req.hostname}` })

            await db.RefreshToken.destroy({ where: { token: refreshToken } })

            await db.RefreshToken.create({
                token: refreshToken,
                userId: user.id
            })

            return res.status(200).json({
                message: 'Refresh token success',
                token,
                refreshToken
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Error refreshing token',
                error
            })
        }

    }
}