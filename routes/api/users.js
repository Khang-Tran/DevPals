const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const Users = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/key');
const passport = require('passport');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
router.get('/test', (req, res) => res.json({message: 'Users works'}));

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    else {
        Users.findOne({email: req.body.email}).then(user => {
            if (user) {
                errors.email = 'Email already existed';
                return res.status(400).json(errors);
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                const newUser = new Users({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log(newUser);
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    else {
        const email = req.body.email;
        const password = req.body.password;

        Users.findOne({email})
            .then(user => {
                if (!user) {
                    errors.email = 'Users not found';
                    return res.status(404).json(errors);
                }
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.password = 'Password incorrect';
                            return res.status(400).json(errors);
                        }
                        else {
                            const payload = {id: user.id, name: user.name, avatar: user.avatar};
                            jwt.sign(payload, keys.key, {expiresIn: 3600}, (err, token) => res.json({
                                success: true,
                                token: 'Bearer ' + token
                            }));
                        }
                    });
            });
    }
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;
