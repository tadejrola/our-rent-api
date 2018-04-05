const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/app/image', require('./controllers/imageController'));
app.use('/app/maintenance', require('./controllers/maintenanceController'));
app.use('/app/notice', require('./controllers/noticeController'));
app.use('/app/object', require('./controllers/objectController'));
app.use('/app/objectNotice', require('./controllers/objectNoticeController'));

app.listen(3000);