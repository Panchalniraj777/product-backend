require('dotenv').config();

const http = require('http');

const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8000;
const app = express();  
require('./Configs/globals');

const server = http.createServer(app);

app.use("/uploads", express.static(path.join(__dirname, "Uploads/Products")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cors({
        exposedHeaders: 'refreshed-access-token',
    })
);

// --------------------------    ROUTES    ------------------
const appRoutes = require('./Routes');
appRoutes(app);

// --------------------------    START SERVER    ---------------------
server.listen(port, () => {
    console.log(
        chalk.greenBright(
            `\nServer started on port ${chalk.white.bold(port)} ${chalk.yellow.bold(':)')} \n`
        )
    );
});
