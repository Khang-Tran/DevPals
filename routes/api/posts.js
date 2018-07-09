const express = require('express');
const router = express.Router();
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profiles');
const validatePostInput = require('../../validations/post');

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    }
    else {
        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        newPost.save().then(post => res.json(post));
    }
});

router.get('/', (req, res) => {
    Post.find()
        .sort({data: -1})
        .then(post => res.json(post))
        .catch(err => res.status(404).json(err));
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json(err));
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        res.status(401).json({unauthorized: 'User is not authorized'});
                    }

                    else {
                        post.remove().then(() => res.json({success: true}))
                            .catch(err => res.status(400).json(err));
                    }
                });
        });
});

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({alreadyLiked: 'User already liked this post'});
                    }

                    post.likes.unshift({user: req.user.id});

                    post.save().then(post => res.json(post));
                });
        });
});


router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({alreadyLiked: 'User have not liked this post yet'});
                    }

                    const removeLike = post.likes.map(like => like.user.toString())
                        .indexOf(req.user.id);
                    post.likes.splice(removeLike, 1);

                    post.save().then(post => res.json(post));
                });
        });
});


router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);
            post.save().then(post => res.json(post))
                .catch(err => res.status(404).json(err));
        });
});


router.delete('/comment/:id/:commentId', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.id)

        .then(post => {
            if (post.comments.filter(comment => comment._id.toString() === req.params.commentId).length === 0) {
                return res.status(404).json({notexist: 'Comment does not exist'});
            }
            const removeComment = post.comments.map(comment => comment._id.toString())
                .indexOf(req.params.commentId);
            post.comments.splice(removeComment, 1);

            post.save().then(post => res.json(post));
        });
});

module.exports = router;
