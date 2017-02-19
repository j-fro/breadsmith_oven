const nodemailer = require('nodemailer');
const express = require('express');
let router = express.Router();

// Environment variables required for email:
// MAIL_SERVICE: the service used (e.g. 'gmail')
// MAIL_USER: the username to authenticate the email account
// MAIL_PASS: the password to authenticate the email account
let transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

/*
 * POST route to send emails
 * @data params: {
 *     emailTo: [Array[string]],   // List of email addresses to send to
 *     orderId: [integer],         // Order ID to reference in subject
 *     message: (optional)[string] // Optinal message for the body
 * }
 * @response: 200 (success) || 500 (failure)
 */
router.post('/', (req, res) => {
    let sends = req.body.emailTo.map(email => {
        if (email) {
            console.log('Sending an email to', email);
            let mailOptions = {
                from: 'Breadsmith',
                to: email,
                subject: 'Your Breadsmith Order#' + req.body.orderId,
                text: req.body.message || 'Your order has been confirmed!'
            };

            return transporter.sendMail(mailOptions);
        }
    });
    Promise.all(sends)
        .then(() => {
            console.log('Success');
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
