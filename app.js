const express = require("express");
require("dotenv").config();
const { logger } = require("./logger");
const kafka = require('kafka-node');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setting api rotuers
const users = require("./routes/users_route");
app.use("/api", users)


// node js server starting oon port 3000
app.listen(process.env.PORT, () => {
    logger.info(`SERVER IS RUNNING ON ${process.env.PORT}`);
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}`);
})
