const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const urlEncodedParser = bodyParser.urlencoded({extended: true});
const jsonParser = bodyParser.json();

let app = express();

app.set('port', 3000 || process.env.PORT);

app.use(express.static(path.join(__dirname, '../public')));
app.use(urlEncodedParser);
app.use(jsonParser);

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});

//require routers
const indexRouter = require('./routes/index');
const customerRouter = require('./routes/customer');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const reportRouter = require('./routes/report');
const staffRouter = require('./routes/staff');
const authRouter = require('./routes/auth');

//routers
app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/report', reportRouter);
app.use('/staff', staffRouter);
app.use('/auth', authRouter);
