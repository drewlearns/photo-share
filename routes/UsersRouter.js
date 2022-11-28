const express = require('express');
const UsersRouter = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');
UsersRouter.use(bodyParser.urlencoded())
UsersRouter.use(bodyParser.json())

UsersRouter.route('/login')
.post((request, response) =>{
    const password = request.body.password
    const username = request.body.username
    db.user.findOne({where:{username: username, password: password}}.then(user=>{
            response.send(user)
        }).catch((error) => {
            response.send("You do not have an account. Try signing up!")
        }
    )
)})
UsersRouter.route('/signup')
.post((request, response) =>{
    const email = request.body.email
    const password = request.body.password
    const username = request.body.username
    db.user.create({email: email, username: username, password: password}).then(user=>{
            response.send(user)
        }).catch((error) => {
            response.send("You do not have an account. Try signing up!")
        }
    )
    })









module.exports = UsersRouter;