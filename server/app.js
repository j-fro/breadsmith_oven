const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const lib = require('./lib/autoOrderLib');
const urlEncodedParser = bodyParser.urlencoded({extended: true});
const jsonParser = bodyParser.json();

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '../public')));
app.use(urlEncodedParser);
app.use(jsonParser);

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
    lib.scheduleOrders();
});

//require routers
const indexRouter = require('./routes/index');
const customerRouter = require('./routes/customer');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const reportRouter = require('./routes/report');
const staffRouter = require('./routes/staff');
const authRouter = require('./routes/auth');
const mailRouter = require('./routes/mail');
const importRouter = require('./routes/import');
const autoOrderRouter = require('./routes/autoOrder');

//routers
app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/report', reportRouter);
app.use('/staff', staffRouter);
app.use('/auth', authRouter);
app.use('/mail', mailRouter);
app.use('/import', importRouter);
app.use('/recurring', autoOrderRouter);
