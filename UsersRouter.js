const express = require('express');
const UsersRouter = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');
UsersRouter.use(bodyParser.urlencoded())
UsersRouter.use(bodyParser.json())
const bcrypt = require('bcryptjs');
const saltRounds = 10;

UsersRouter.route("/login").post(async (request, response) => {
    // username and password are required
    const username = request.body.username;
    const password = request.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    db.user
      .findOne({ where: { username: username } })
      .then(async (user) => {
        if (user) {
          await bcrypt.compare(password, user.password, (error, same) => {
            if (same) {
              // console.log(user.id)
              request.session.userId = user.id; // THIS LINE HERE!!!!!!!!!
              console.log(request.session)
              console.log("logged in")
              response.redirect("/");
            } else {
              response.status(401)
              console.log("401 error")
              response.redirect("/badlogin");
            }
          });
        }else{
          response.send("No such user")
        }
      })
      .catch((error) => {
        console.log(error);
        response.send(error);
      });
  });
UsersRouter.route('/signup')
    .post(async (request, response) => {
        const email = request.body.email
        const password = request.body.password
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        const username = request.body.username
        db.user.create({ email: email[0], username: username, password: encryptedPassword }).then(user => {
            // response.send(user)
            response.redirect('/login')
        }).catch((error) => {
            response.send("You do not have an account. Try signing up!")
        }
        )
    })

module.exports = UsersRouter;