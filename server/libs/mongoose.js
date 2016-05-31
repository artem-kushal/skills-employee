var mongoose = require('mongoose'); // подключение модуля для работы с базой данных MongoDb
var log = require('./../utils/log')(module); // импорт модуля для логирования
var config = require('./config'); // подключение файла конфигурации

var appEnv = config.get('NODE_ENV') || 'development'; // получение типа контекста
mongoose.connect(config.get(appEnv + ':mongoose:uri')); // подключение к базе данных


var db = mongoose.connection;

// функция вызываемая при неудачном подключении к базе данных
db.on('error', function (err) {
    log.error('connection error:', err.message);
});

// функция вызываемая при успешном подключении к базе данных
db.once('open', function callback() {
    log.info('Connected to DB!');
});

module.exports = db;
