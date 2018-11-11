module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile',  function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/talent/login', passport.authenticate('talent-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/talent/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('talent-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/talent/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // recruiter --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/recruiter/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/recruiter/login', passport.authenticate('recruiter-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/recruiter/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages

    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/recruiter/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/recruiter/signup', passport.authenticate('recruiter-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/recruiter/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
    console.log('failed login')
}
