const Router = require('express').Router(),
    AuthController = require('../controllers/auth')

Router
    .post('/register', AuthController.register)
    .post('/login', AuthController.login)
    .post('/logout', (req, res) => {
        res.json({
            message: 'Logout User Router'
        })
    }).post('/forgot-password', (req, res) => {
        res.json({
            message: 'Forgot Password User Router'
        })
    }).post('/reset-password', (req, res) => {
        res.json({
            message: 'Reset Password User Router'
        })
    }).post('/change-password', (req, res) => {
        res.json({
            message: 'Change Password User Router'
        })
    }).post('/me', (req, res) => {
        res.json({
            message: 'Me User Router'
        })
    }).post('/send-email', (req, res) => {
        res.json({
            message: 'Send Email User Router'
        })
    }).post('/verify-email', (req, res) => {
        res.json({
            message: 'Verify Email User Router'
        })
    }).post('/resend-verification-email', (req, res) => {
        res.json({
            message: 'Resend Verification Email User Router'
        })
    }).post('/change-email', (req, res) => {
        res.json({
            message: 'Change Email User Router'
        })
    })

module.exports = Router