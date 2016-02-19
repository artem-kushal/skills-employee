var log = require('./../utils/log')(module);
var employeeService = require('../data_layer/employeeService');
var PDFDocument = require('pdfkit');
var fs = require('fs');

var documentCtrl = {};

documentCtrl.getByDatePdf = function (req, res, next) {
    employeeService.getEmpoyeeByProjectDate().then(function (employees) {
        var doc = createByDatePdf(employees, getNewDate(req.query.date));
        var filename = 'output.pdf';
        filename = encodeURIComponent(filename);
        res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        return doc.pipe(res);
    }).catch(function (err) {
        return next(err);
    });
}

documentCtrl.getHistoryProjectPdf = function (req, res, next) {
  employeeService.getEmpoyeeByProjectDate().then(function (employees) {
        var doc = employeeProjectByDate(employees, getNewDate(req.query.date));
        var filename = 'output.pdf';
        filename = encodeURIComponent(filename);
        res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        return doc.pipe(res);
    }).catch(function (err) {
        return next(err);
    });
};

function createHistoryPdf(employees) {
    filteringEmployeeByDate(employees, startDate, endDate);  
    var doc = new PDFDocument
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.font('FreeSans.ttf');
    doc.fontSize(16).text('История занятости сотрудников', 0, 5, { width: 620, height: 30, align: 'center' });
    doc.fontSize(10);
    var table = new Table({ column: 3, margin: [40, 10] }, doc);
    outputTableByDate.call(table, getOutputEmployee(employees))
    doc.end();

    return doc;
}

function createByDatePdf(employees, date) {
    filteringEmployeeByDate(employees, date);
    var doc = new PDFDocument
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.font('FreeSans.ttf');
    doc.fontSize(16).text('Отчет занятости сотрудников', 0, 5, { width: 620, height: 30, align: 'center' });
    doc.fontSize(10);
    var table = new Table({ column: 3, margin: [40, 10] }, doc);
    outputTableByDate.call(table, getOutputEmployee(employees))
    doc.end();

    return doc;
}

function filteringEmployeeByDate(employees) {
    var startDate = arguments[1];
    var endDate = arguments[2] || arguments[1];
    employees.forEach(function (item) {
        item.projects = item.projects.filter(function (project) {
            if (project.endDate) {
                return project.startDate.getTime() <= startDate.getTime() && project.endDate.getTime() >= endDate.getTime();
            } else {
                project.startDate.getTime() <= startDate.getTime();
            }

        });
    });
}

function getOutputEmployee(employees) {
    var outputEmployees = [];
    employees.forEach(function (item) {
        outputEmployees.push({
            fio: item.firstname + ' ' + item.patronymic + ' ' + item.lastname,
            projects: (function (projects) {
                var line = '';
                projects.forEach(function (proj) {
                    if (line !== '') {
                        line += ', ';
                    }
                    line += proj.name
                });
                return line;
            })(item.projects)
        });
    });
    return outputEmployees;
}

function getNewDate(date) {
    var datePart = date.split('/');
    return new Date(datePart[1] + '/' + datePart[0] + '/' + datePart[2]);
}

function outputTableByDate(data) {
    var startX = 0;
    var maxHeightColumnText = 20;
    this.drawLine(this.margin[1], this.margin[0], this.width, this.margin[0]);
    this.drawText('Дата', startX, this.paddingTextTop + this.margin[0], this.columnWidth, maxHeightColumnText, 'center');
    this.drawText('ФИО', startX + this.columnWidth, this.paddingTextTop + this.margin[0], this.columnWidth, maxHeightColumnText, 'center');
    this.drawText('Проекты', startX + this.columnWidth * 2, this.paddingTextTop + this.margin[0], this.columnWidth, maxHeightColumnText, 'center');
    this.drawLine(this.margin[1], this.columnHeight + this.margin[0], this.width, this.columnHeight + this.margin[0]);
    for (var i = 0; i < data.length; i++) {
        var y = this.paddingTextTop + this.columnHeight * (i + 1) + this.margin[0];
        startX = 0;
        this.drawText(data[i].date, startX, y, this.columnWidth, maxHeightColumnText, 'center');
        this.drawText(data[i].fio, startX + this.columnWidth, y, this.columnWidth, maxHeightColumnText, 'center');
        this.drawText(data[i].projects, startX + this.columnWidth * 2, y, this.columnWidth, maxHeightColumnText, 'center');
        this.drawLine(this.margin[1], y + maxHeightColumnText, this.width, y + maxHeightColumnText);
    }
}

function Table(options, doc) {
    this.width = options.width || 600;
    this.column = options.column;
    this.columnWidth = this.width / this.column;
    this.margin = options.margin;
    this.columnHeight = options.columnHeight || 30;
    this.paddingTextTop = options.paddingTextTop || 10;
    this.drawLine = function (x, y, x1, y1) {
        doc.moveTo(x, y).lineTo(x1, y1).stroke();
    }

    this.drawText = function (data, x, y, w, h, align) {
        doc.text(data, x, y, { width: w, height: h, align: align });
    }
}



module.exports = documentCtrl;
