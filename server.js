const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use('/', express.static(path.join(__dirname, '/clients')));

require('./server/user/rout')(app);
require('./server/student/rout')(app);
require('./server/dashboard/rout')(app);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));