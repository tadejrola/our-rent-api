const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(require("cors")());
app.use(bodyParser.json());
app.use('/api/images', require('./controllers/imageController'));
app.use('/api/account', require('./controllers/accountController'));
app.use('/api/maintenances', require('./controllers/maintenanceController'));
app.use('/api/objects', require('./controllers/objectController'));
app.use('/api/tenancyAgreements', require('./controllers/tenancyAgreementController'));
app.use('/api/users', require('./controllers/userController'));
app.use('/api/utilityBills', require('./controllers/utilityBillController'));

var port = process.env.PORT || 3000;
app.listen(port);