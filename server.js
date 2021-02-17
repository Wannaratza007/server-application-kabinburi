const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ 'extended': true, limit: '100mb' }));
app.use('/', express.static(path.join(__dirname, '/clients')));
app.use(express.static(__dirname + '/server'));
app.use(bodyParser.json({ type: 'application/*+json' }))

require('./server/user/rout')(app);
require('./server/student/rout')(app);
require('./server/dashboard/rout')(app);
require('./server/form/route')(app);


app.get('/', (req, res) => res.send('WElCOME TO KABINBURY SERVER'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));