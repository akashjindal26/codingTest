const sql = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken"); // to generate signed token
const url = require('url');

const redis = require("redis");
const client = redis.createClient();

const { logger } = require("../logger.js");

exports.signup = async (req, res) => {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  logger.info(fullUrl);

  await sql.query("CALL sp_search_email(?)", req.body.USER_EMAIL, (err, result) => {
    if (err) {
      logger.error("Signup Error");
      res.send({ ERROR: "ERROR" });
    }
    else {
      if (result[0] == "") {

        bcrypt.hash(req.body.PASSWORD, 10, function (err, hash) {

          if (err) {
            logger.error("Password is not encrypted");
            res.send({ error: err })
          }
          else {

            const createdon = new Date();
            const modifiedon = new Date();

            sql.query("CALL sp_createuser(?,?,?,?,?,?,?,?,?)",
              [req.body.LEVEL_ID, req.body.USER_NAME, req.body.USER_EMAIL,
              req.body.USER_MOBILE_NO, createdon, req.body.CREATED_BY, modifiedon,
              req.body.MODIFIED_BY, hash], (err, result) => {
                if (err) {
                  res.send({ ERROR_MSG: err });
                }
                else {
                  res.send({ USERS_DETAILS: result });
                }
              })
          }

        });

      }
      else {
        logger.error("USER ALREADY EXICTED");
        res.send({ MSG: "USER ALREADY EXICTED" })

      }
    }
  })

}

exports.signin = async (req, res) => {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  logger.info(fullUrl);

  var USER_EMAIL = req.body.USER_EMAIL;

  await sql.query("CALL sp_search_email(?)", req.body.USER_EMAIL, (err, response) => {
    if (err) {
      res.send({ ERROR: "ERROR" });
    }
    else {

      if (response[0][0].email == req.body.USER_EMAIL) {


        bcrypt.compare(req.body.PASSWORD, response[0][0].password, function (err, result) {

          if (err) {
            logger.error("Something went wrong in password matching");
            res.send({ Error: "Something went wrong in password matching" });
          }
          if (result == true) {

            sql.query("CALL sp_get_particular_user_details(?)", USER_EMAIL, (err, resp) => {
              if (err) {
                res.send({ ERROR_MSG: err });
              } else {
                var token = jwt.sign({ id: resp[0][0].email }, process.env.JWT_SECRET);

                // jwt token store in redis
                client.SETEX(resp[0][0].email, 3600, JSON.stringify(token));

                logger.error("Login Succesfully login id :" + resp[0][0].id);
                res.send({ token: token, User_id: resp[0][0].id })
              }
            })
          } else {
            logger.error("PASSWORD IS INCORRECT");
            res.send({ Msg: "PASSWORD IS INCORRECT" });
          }

        });


      }
    }
  });

}

exports.verifyUserLogin = (req, res, next) => {
  const email = req.body.USER_EMAIL

  //getting token value from redis
  client.get(email, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      var token = data.slice(1, -1);
      jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
          res.send(err);
        } else {
          if (authData.id == req.body.USER_EMAIL) {
            next();
          } else {
            res.sendStatus(403);
          }
        }
      });
    }
    else {
      next();
    }
  })

};

exports.getprofile = async (req, res) => {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  logger.info(fullUrl);

  try {
    sql.query("CALL sp_get_particular_user_details(?)", req.body.USER_EMAIL, (err, resp) => {
      if (err) {
        res.send({ ERROR_MSG: err });
      } else {
        res.send(resp)
      }
    })
  } catch { }

}

