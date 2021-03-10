/**
 * Acá dejamos las rutas internas (rutas que asumen que el usuario ya se logueo a nuestra App)
 */
const { Router } = require('express');
const Sequelize = require('sequelize');
const { Mensaje, User } = require('../db');
const { checkAdmin, checkLogin } = require('../middleware/mismiddleware')
const router = Router();



router.get('/bienvenida', [checkLogin], async (req, res) => {

    const errors = req.flash('errors');
    const mensajes = req.flash('mensajes');
    res.render('indexpro.ejs', { errors , mensajes});

});

router.get('/admin', [checkLogin, checkAdmin], async (req, res) => {

    const errors = req.flash('errors');
    const mensajes = req.flash('mensajes');
    res.render('adminpro.ejs', { errors , mensajes});

});

router.get('/', [checkLogin], async (req, res) => {


    const errors = req.flash('errors');
    const mensajes = req.flash('mensajes');

    chats = await Mensaje.findAll({include: User, order:[['createdAt', 'ASC']] });
    

    const usuarios = await User.findAll({
        raw: true,
        attributes: { 
            include: [
                [Sequelize.fn("COUNT", Sequelize.col("mensajes.id")), "mensajes"],
                [Sequelize.fn("AVG", Sequelize.col("mensajes.id")), "promedio"],
                [Sequelize.fn("SUM", Sequelize.col("mensajes.id")), "suma"]
            ] , 
        },
        include: [{
            model: Mensaje, attributes: []
        }],
        group: ['User.id']
    })

    
    

    res.render('chat.ejs', { errors , mensajes, chats, usuarios});
});

router.post('/guardarmensaje', [checkLogin],async (req, res) => {

    console.log("Intentando guardar mensaje con el usuario : ", req.session.user.id);
    const user = await User.findByPk(req.session.user.id);

    user.createMensaje({ mensaje: req.body.mensaje });

    res.json({estado: "OK"});

});




module.exports = router;