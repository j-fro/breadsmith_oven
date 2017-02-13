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
    let mailOptions = {
        from: 'Breadsmith',
        to: req.body.emailTo,
        subject: 'Your Breadsmith Order#' + req.body.orderId,
        text: req.body.message || 'Your order has been confirmed!'
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log('Message sent');
            res.sendStatus(200);
        }
    });
});

module.exports = router;
