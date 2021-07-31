const express = require("express");
require("dotenv").config();
const { logger } = require("./logger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = require("./routes/users_route");
app.use("/api", users)

app.listen(process.env.PORT, () => {
    logger.info(`SERVER IS RUNNING ON ${process.env.PORT}`);
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}`);
})
