'use strict';

var mainService = angular.module('main.service', []);


mainService.factory('namesPagesService', function () {
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

mainService.factory('restApiUrl', function () {
    return 'http://localhost:1337/';
});
