const express = require('express')
const router = express.Router()

const Parks = require('../models/Park.model')
const { localUpload, CDNupload } = require('../configs/cloudinary.config')
const Coasters = require('../models/Coaster.model')


const { isLogged, hasRoles, whatever} = require('./../middleware')

// Endpoints

router.get('/', (req, res, next) => {
    Coasters
        .find()
        .populate('park_id')
        .then( coasters => res.render('pages/coasters/coasters-index', {coasters}))
        .catch( err => res.send(`there's been an error: ${err}`))
})

router.get('/new', isLogged, hasRoles('ADMIN'), (req, res, next) => {
    Parks
        .find()
        .then( parks => res.render('pages/coasters/new-coaster', {parks}))
        .catch( err => res.send(`there's been an error: ${err}`))
})

router.post('/new', isLogged, hasRoles('ADMIN'), CDNupload.single('image'), (req, res, next) => {
    const { name, description, inversions, length, park_id } = req.body
    console.log(req.file)
    const { path } = req.file

    const missingValue = name && description && inversions && length

    if( !missingValue ){
        res.render('pages/coasters/new-coaster', {errorMessage: 'All fields are mandatory.'})
        return
    }

    Coasters
        .create({name, description, inversions, length, active:true, park_id, image: path })
        .then( coaster => res.redirect('/coasters') )
        // .then( coaster => res.send(`name: ${coaster.name} <br> description: ${coaster.description} <br> active: ${coaster.active}`) )
        .catch( err => res.send(`there's been an error: ${err}`))    
})

router.get('/delete', isLogged, hasRoles('ADMIN'), (req, res, next) => {
    const {id} = req.query
    Coasters
        .findByIdAndDelete( id )
        .then( coaster => res.redirect('/coasters'))
        .catch( err => res.send(`there's been an error: ${err}`))
})

router.get('/edit', isLogged, hasRoles('ADMIN'),  (req, res, next) => {
    const {id} = req.query
    // console.log(id)

    Parks
    .find()
    .then( parks => {
        Coasters
            .findById( id )
            .populate('park_id')
            .then( coaster => {
                parks.forEach(element => {
                    element.selected = ( coaster.park_id.id === element.id ) ? 'selected' : ''
                });
                res.render('pages/coasters/coaster-edit', {coaster, parks: {parks}})
            })

    })
    .catch( err => res.send(`there's been an error: ${err}`))
})

router.post('/edit', isLogged, hasRoles('ADMIN'), (req, res, next) => {
    const {id} = req.query
    console.log('pfffffff.... ',req.body)
    const { name, description, inversions, length, park_id, image } = req.body

    const missingValue = name && description && inversions && length

    if( !missingValue ){
        Parks
        .find()
        .then( parks => {
            Coasters
            .findById(id)
            .populate('park_id')
            .then( coaster => {
                parks.forEach(element => {
                    element.selected = ( coaster.park_id.id === element.id ) ? 'selected' : ''
                });
                const data = {coaster, parks: {parks}, errorMessage: 'All fields are mandatory.'}
                data.errorMessage = 'All fields are mandatory.'
                // console.log(data.errorMessage, data.coaster.name,"*****************************************************")
                res.render(`pages/coasters/coaster-edit`, data)
                // res.render(`pages/coasters/coaster-edit`, {errorMessage: 'All fields are mandatory.'})
                return
            })
        })
        .catch( err => res.send(`there's been an error: ${err}`))


    }else{
        Coasters
            .findByIdAndUpdate( id, {name, description, inversions, length, image, active:true, park_id } )
            .populate('park_id')
            .then( coaster => res.redirect(`/coasters/${id}`))
            .catch( err => res.send(`there's been an error: ${err}`))
    }

})

router.get('/:id', (req, res, next) => {
    const {id} = req.params
    Coasters
        .findById( id )
        .populate('park_id')
        .then( coaster => res.render('pages/coasters/coaster-details', coaster))
        .catch( err => res.send(`there's been an error: ${err}`))
})


module.exports = router
