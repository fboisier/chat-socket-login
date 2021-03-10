// Middleware: Verifica si el usuario está logueado.
// en caso de que no, lo mandamos al login
function checkLogin(req, res, next) {
    console.log('verificando que el usuario está logueado');
    if(req.session.user == null){
        req.flash("errors","Tienes que ser un usuario logeado para poder entrar al sistema.");
        return res.redirect('/login');
    }
    console.log("next del checkLogin");
    
    res.locals.user = req.session.user;

    next();
}

function checkAdmin(req, res, next) {
    console.log('verificando que el usuario es admin');
    if(req.session.user.rol != "ADMIN"){
        req.flash("errors","Tienes que ser un usuario administrador para poder entrar al admin.");
        return res.redirect('/');
    }
    console.log("next del checkAdmin");
    next();
}

module.exports = {
    checkAdmin,
    checkLogin
}