const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profiles = require('../../models/Profiles');
const Users = require('../../models/Users');
const validateProfileInput = require('../../validations/profile');
const validateExperienceInput = require('../../validations/experience');
const validateEducationInput = require('../../validations/education');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profiles.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'No profile for this user';
                return res.status(404).json({errors});
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }


    const profileFields = {};
    profileFields.user = req.user.id;
    // TODO: Refactor this
    if (req.body.handle)
        profileFields.handle = req.body.handle;
    if (req.body.company)
        profileFields.company = req.body.company;
    if (req.body.website)
        profileFields.website = req.body.website;
    if (req.body.location)
        profileFields.location = req.body.location;
    if (req.body.bio)
        profileFields.bio = req.body.bio;
    if (req.body.status)
        profileFields.status = req.body.status;
    if (req.body.githubUserName)
        profileFields.githubUserName = req.body.githubUserName;
    if (req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    profileFields.social = {};

    if (req.body.Facebook)
        profileFields.social.Facebook = req.body.Facebook;
    if (req.body.Linkedin)
        profileFields.social.Linkedin = req.body.Linkedin;
    if (req.body.Google)
        profileFields.social.Google = req.body.Google;


    Profiles.findOne({user: req.user.id})
        .then(profile => {
            if (profile) {
                Profiles.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
                    .then(profile => res.json(profile));
            }
            else {
                Profiles.findOne({handle: profileFields.handle})
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'Handle already existed';
                            res.status(400).json(errors);
                        }
                        new Profiles(profileFields).save()
                            .then(profile => res.json(profile));
                    });
            }
        });
});

router.get('/all', (req, res) => {
    const errors = {};
    Profiles.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noProfile = 'No profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(500).json({profile: 'No profile for this user'}));

});

router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profiles.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'No profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(500).json({profile: 'No profile for this user'}));
});

router.get('/user/:userId', (req, res) => {
    const errors = {};
    Profiles.findOne({user: req.params.userId})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'No profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(500).json({profile: 'No profile for this user'}));
});


router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateExperienceInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profiles.findOne({user: req.user.id})
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            profile.experience.unshift(newExp);
            profile.save()
                .then(profile => res.json(profile));
        });
});

router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateEducationInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profiles.findOne({user: req.user.id})
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            profile.education.unshift(newEdu);
            profile.save()
                .then(profile => res.json(profile));
        });
});


router.delete('/experience/:expId', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profiles.findOne({user: req.user.id})
        .then(profile => {
            const removedIndex = profile.experience.map(item => item.id)
                .indexOf(req.params.expId);

            profile.experience.splice(removedIndex, 1);

            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
});

router.delete('/education/:eduId', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profiles.findOne({user: req.user.id})
        .then(profile => {
            const removedIndex = profile.education.map(item => item.id)
                .indexOf(req.params.eduId);

            profile.education.splice(removedIndex, 1);

            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
});

router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profiles.findOneAndRemove({user: req.user.id})
        .then(() => {
            Users.findOneAndRemove({_id: req.user.id})
                .then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json(err));
});
module.exports = router;
