
const { logger } = require("./logger.js");

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateTelephone(telephone) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(telephone);
}

function validateEmpty(EmptyField) {
    const re = /^(?!\s*$).+/;
    return re.test(String(EmptyField).toLowerCase());
}

exports.singupValidation = async (req, res, next) => {

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(fullUrl);

    const email = req.body.USER_EMAIL;
    const mobile = req.body.USER_MOBILE_NO;
    const userName = req.body.USER_NAME;

    var UserMsg = validateEmpty(userName);
    var EmailMsg = validateEmail(email);
    var MobileMsg = validateTelephone(mobile);

    if (EmailMsg == true && MobileMsg == true && UserMsg == true) {
        next();
    }
    else {
        if (UserMsg == false) return res.status(500).send({ UserName: 'User Name is not valid' });

        if (EmailMsg == false) return res.status(500).send({ Email: 'Email is not valid' });

        if (MobileMsg == false) return res.status(500).send({ MobileNumber: 'Mobile Number is not valid' });
    }
}

exports.singinValidation = async (req, res, next) => {
    
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(fullUrl);

    const email = req.body.USER_EMAIL;
    var EmailMsg = validateEmail(email);
    if (EmailMsg == true) {
        next();
    }
    else {
        return res.status(500).send({ Email: 'Email is not valid' });
    }
}