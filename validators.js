const { logger } = require("./logger.js");

// Email Validation
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Mobile Number Validation
function validateMobile(mobile) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(mobile);
}

//Validation to check that filed is not empty
function validateEmpty(EmptyField) {
    const re = /^(?!\s*$).+/;
    return re.test(String(EmptyField).toLowerCase());
}

// validation on signup api
exports.sing_up_Validation = async (req, res, next) => {

    // get full url for logger file
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(fullUrl);

    const email = req.body.USER_EMAIL;
    const mobile = req.body.USER_MOBILE_NO;
    const userName = req.body.USER_NAME;

    // validating the filed
    var UserMsg = validateEmpty(userName);
    var EmailMsg = validateEmail(email);
    var MobileMsg = validateMobile(mobile);

    if (EmailMsg == true && MobileMsg == true && UserMsg == true) {
        next();
    }
    else {
        if (UserMsg == false) return res.status(500).send({ UserName: 'User Name is not valid' });

        if (EmailMsg == false) return res.status(500).send({ Email: 'Email is not valid' });

        if (MobileMsg == false) return res.status(500).send({ MobileNumber: 'Mobile Number is not valid' });
    }
}

// validation on sign in api
exports.sing_in_Validation = async (req, res, next) => {

     // get full url for logger file
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(fullUrl);

    const email = req.body.USER_EMAIL;

    //validating the email field
    var EmailMsg = validateEmail(email);
    if (EmailMsg == true) {
        next();
    }
    else {
        return res.status(500).send({ Email: 'Email is not valid' });
    }
}