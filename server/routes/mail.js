const nodemailer = require('nodemailer');
const express = require('express');
let router = express.Router();

let transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

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
