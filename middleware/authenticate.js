function authenticationMW(req, res, next) {
    // console.log(req.session.id)
    if (req.session) {
        if (req.session.userID) {
            next()
        } else {
            res.render('login', {loginMessage: 'You must be logged in to view this page.'})
        }
    } else {
        res.render('login', {loginMessage: 'You must be logged in to view this page.'})
    }
}

module.exports = authenticationMW