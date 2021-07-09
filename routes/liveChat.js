const express = require('express')
const router = express.Router()

// const users = ['admin'] // Dummy array for users

router.get('/', (req, res, next) => {
    res.render('pages/pr12-login', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    res.render('pages/pr12-chat', {
        user: req.session.username,
        title: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

module.exports = router
