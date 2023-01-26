const express = require('express')
const router = express.Router()
const Parks = require('../models/Park.model')

const { isLogged, hasRoles, whatever} = require('./../middleware')

// Endpoints
router.get('/new', isLogged, hasRoles('ADMIN'), (req, res, next) => {
    res.render('pages/parks/new-park')
})

router.post('/new', isLogged, hasRoles('ADMIN'), (req, res, next) => {
    const { name, description } = req.body
    Parks
        .create({name, description, active: true})
        .then( park => res.send(`name: ${park.name} <br> description: ${park.description} <br> active: ${park.active}`) )
        .catch( err => res.send(`there's been an error: ${err}`))    
})


module.exports = router
