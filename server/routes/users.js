const router = require('express').Router()
let User = require('../models/user')

//get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

//add new user
router.route('/').post((req, res) => {
    const username = req.body.username
    const password = req.body.password

    const newUser = new User({
        username,
        password
    })

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

//get specific user
router.route('/:name').get((req, res) => {
    User.findOne({username: req.params.name},(err, course) => {
        res.json(course)
    })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
})

//delete specific user
router.route('/:name').delete((req, res) => {
    User.findOne({username: req.params.name},(err, course) => {
        res.json(course)
    })
        .then(() => res.json('User Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

//update user
router.route('/:name').post((req, res) => {
    User.findOne({username: req.params.name},(err, course) => {
        res.json(course)
    })
        .then(user => {
            user.username = req.body.username
            user.password = req.body.password

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router