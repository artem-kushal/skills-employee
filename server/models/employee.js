var mongoose = require('mongoose'); // подключение модуля для работы с базой данных MongoDb
var Schema = mongoose.Schema;

// схема для хранения записи о сотруднике
var Employee = new Schema({
    firstname: { type: String, required: true }, // поле для хранения информации об имени
    lastname: { type: String, required: true }, // поле для хранения информации о фамилии
    patronymic: { type: String, required: true }, // поле для хранения информации об отчестве
    birthday: { type: String }, // поле для хранения информации о дне рождения
    role: { type: Schema.Types.ObjectId, required: true }, // поле для хранения информации о роли сотрудника
    department: { type: String, required: true }, // поле для хранения информации о департаменте
    group: { type: String }, // поле для хранения информации о группе
    room: { type: String, required: true }, // поле для хранения информации о комнате
    dateEmployment: { type: String }, // поле для хранения информации о дате трудоустройства
    projects: [{ // поле для хранения информации о проектах, в которых учавствовал сотрудник
        projId: { type: String },
        name: { type: String },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date }
    }],
    technologies: [{ // поле для хранения информации о компетенциях сотрудника
        tech: { type: Schema.Types.ObjectId, ref: 'Technology' },
        subTech: [{ type: Schema.Types.ObjectId, ref: 'SubTech' }]
    }]
});


module.exports = mongoose.model('Employee', Employee);
