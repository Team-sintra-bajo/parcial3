const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:3000/home'); 
});

router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.sendStatus(200);
    });
});

module.exports = router;
