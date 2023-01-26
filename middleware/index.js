const transporter = require('./../configs/nodemailer.config')

module.exports = {
    isLogged: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            transporter
            .sendMail({
                from: "Unregistred user trying to access...",
                to: 'silviudilimot@gmail.com',
                subject: 'Unregistred user trying to access...',
                text: 'Unregistred user trying to access...',
                html: `<b>Unregistred user trying to access...</b>`
            })
            .then(info => console.log(info))
            .catch(error => console.log(error))
            res.render('pages/auth/login', { errorMessage: 'Restricted to registered users only.' })
        }
    },
    hasRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session?.currentUser.role)) {
            next()
        } else {
            res.render('pages/auth/login', { errorMessage: 'Restricted to authorized users only.' })
        }
    },
    whatever: (req, res, next) => {
        console.log('SOY UN MIDDLEWARE QUE NO HACE NAda lalalalLALAL')
        next()
    }
}