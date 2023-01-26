const router = require("express").Router()
const bcrypt = require('bcrypt')

const User = require('./../models/User.model')


// SIGNUP
router.get('/signup', (req, res) => res.render('pages/auth/signup'))

router.post('/signup', (req, res, next) => {
    const {username, pwd} = req.body

    User
    .findOne({username})
    .then( user => {

        if(user){
            res.render('pages/auth/signup',{errorMessage: 'User is already taken' })
            return
        }

        const bcryptSalt = 10
        const salt = bcrypt.genSaltSync( bcryptSalt )
        const hashedPassword = bcrypt.hashSync( pwd, salt )

        User
        .create({username, password: hashedPassword})
        .then(() => res.redirect('/'))
        .catch( err =>  res.send(`there's been an error: ${err}`))
    })
    .catch( err =>  res.send(`there's been an error: ${err}`))

})

// LOGIN
router.get('/login', (req, res) => res.render('pages/auth/login'))

router.post('/login', (req, res) => {
    const {username, pwd} = req.body

    User
    .findOne({username})
    .then( user => {

        if( !user ){
            res.render('/pages/auth/signup',{errorMessage: `${useername} is not registered` })
            return
        }

        if( bcrypt.compareSync(pwd, user.password) === false){
            res.render('pages/auth/login', {errorMessage: 'Wrong password.'})
            return
        }

        req.session.currentUser = user
        // console.log(req.session.currentUser)
        res.redirect('/')
    })
    .catch( err =>  res.send(`there's been an error: ${err}`))
})

// LOGOUT
router.get('/logout', (req, res, next) => {
    req.session.destroy( () => res.redirect('/'))
})







module.exports = router