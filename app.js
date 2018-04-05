const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/api/images', require('./controllers/imageController'));
app.use('/api/maintenances', require('./controllers/maintenanceController'));
app.use('/api/notices', require('./controllers/noticeController'));
app.use('/api/objects', require('./controllers/objectController'));
app.use('/api/objectNotices', require('./controllers/objectNoticeController'));

var port = process.env.PORT || 3000;
app.listen(port);