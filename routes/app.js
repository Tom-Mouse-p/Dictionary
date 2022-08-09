const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/devlog', (req, res) => {
    res.render('devlog')
})

router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router