const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/api/images', require('./controllers/imageController'));
app.use('/api/maintenances', require('./controllers/maintenanceController'));
app.use('/api/notices', require('./controllers/noticeController'));
app.use('/api/objects', require('./controllers/objectController'));
app.use('/api/objectNotices', require('./controllers/objectNoticeController'));
app.use('/api/countries', require('./controllers/countryApi'));
app.use('/api/cities', require('./controllers/cityApi'));
app.use('/api/addresses', require('./controllers/addressApi'));
app.use('/api/owners', require('./controllers/ownerApi'));
app.use('/api/payments', require('./controllers/paymentApi'));
app.use('/api/tenancyAgreements', require('./controllers/tenancyAgreementApi'));
app.use('/api/tenants', require('./controllers/tenantApi'));
app.use('/api/utilityBills', require('./controllers/utilityBillApi'));

var port = process.env.PORT || 3000;
app.listen(port);