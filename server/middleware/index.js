module.exports = function (app, express) {
    var bodyParser = require('body-parser');
    var router = require('./../routes');
    var errorHandler = require('./errorHandler');

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // app.use(function (req, res, next) {
    //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //     res.setHeader('Access-Control-Allow-Credentials', true);
    //     next();
    // });

    app.use(express.static(__dirname + '/../../client/app'));

    router(app);

    errorHandler(app, express);
}
