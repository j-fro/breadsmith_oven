const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const urlEncodedParser = bodyParser.urlencoded({extended: true});

let app = express();

app.set('port', 3000 || process.env.PORT);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});

//require routers
const indexRouter = require('./routes/index');
const customerRouter = require('./routes/customer');

//routers
app.use('/', indexRouter);
app.use('/customer', customerRouter);
