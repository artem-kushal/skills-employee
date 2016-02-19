'use strict';

var services = angular.module('services', ['blobConverter', 'employee.service', 'project.service',
    'responsibility.service', 'role.service', 'technology.service', 'upload.service', 'docs.service']);


services.factory('namesPagesService', function () {
    return {
        instructions: 'Инструкция',
        role: 'Роли',
        tech: 'Технологии',
        responsibility: 'Обязанности',
        projectListing: 'Все проекты',
        projectDetails: 'Детали проекта',
        newProject: 'Новый проект',
        editProject: 'Изменение проекта',
        newEmployee: 'Новый сотрудник',
        employeeList: 'Все сотрудники',
        employeeDetail: 'Детали анкеты',
        editEmployee: 'Изменение анкеты',
    };
});

services.factory('restApiUrl', function () {
    return 'http://localhost:1337/';
});
