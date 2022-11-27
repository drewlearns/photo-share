const { response } = require('express');
const express = require('express');
const db = require('./models');
const app = new express();
const bodyParser = require('body-parser');
const port = 8080;
const sqlPort = 3307; // 3306

// server
app.listen(port, ()=>{
    console.log(`Seving photo app on http://localhost:${port}`);
})

//db
db.sequelize.sync({}).then(()=>{
    app.listen(sqlPort, ()=>{
        console.log(
            `MariaDB connection has been established successfully to http://localhost:${sqlPort}.`
        );
    });
});
.catch((error) => {
    console.error("Unable to connect to the database", error)
});

//routes
app.get("/", (request, response) =>{
    response.render("index");
});
app.use(express.static('public'));
app.set("view engine", "ejs");
