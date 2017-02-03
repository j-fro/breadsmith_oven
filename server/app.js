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
const productRouter = require('./routes/product');

//routers
app.use('/', indexRouter);
app.use('/product', productRouter);
