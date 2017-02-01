const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.set('port', 3000 || process.env.PORT);

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});
