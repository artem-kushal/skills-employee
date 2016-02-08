'use strict';


skillsControllers.controller('NewProjectCtrl', ['$scope', 'namesPagesService', 'Technologies', 'Project', '$location',
    'roleService', 'responsibilityService', 'uploadService',
    function ($scope, namesPagesService, Technologies, Project, $location, roleService, responsibilityService, uploadService) {
    $scope.$parent.pageName = namesPagesService.newProject;

    $scope.newProject = {
        tech: [],
        roles: [],
        responsibilities: []
    };
    $scope.projectImgs = [];
    $scope.isNewProjectForm = false;
    $scope.addProject = function () {
        var isCanAdd = $scope.newProject.tech.length !== 0 && $scope.newProject.roles.length !== 0 &&
        $scope.newProject.responsibilities.length !== 0;
        if ($scope.newProjectForm.$valid && isCanAdd) {
            Project.post({ newProject: $scope.newProject }, function (data) {
                console.log(data.project);
                uploadFiles(data.project._id);
            }, function (error) {
                console.log(error);
            });
        } else {
            $scope.isNewProjectForm = true;
        }
    }

    function uploadFiles(id) {
        uploadService.add($scope.projectImgs, id).then(function (data) {
            console.log(data);
            $scope.isNewProjectForm = false;
            Materialize.toast('Проект успешно добавлен!', 3000);
            $location.path('/projects');
        }, function (error) {
            console.log(error);
        });
    }

    function getTechnologies() {
        Technologies.query(function (data) {
            console.log(data);
            $scope.technologies = data;
        }, function (error) {
            console.log(error);
        });
    }
    getTechnologies();

    var activeTech = [];
    $scope.setActiveTech = function (index) {
        if (activeTech.indexOf(index) == -1) {
            activeTech.push(index);
        } else {
            activeTech.splice(activeTech.indexOf(index), 1);
        }
    }

    $scope.showAllSubTech = function () {
        activeTech = [];
        for (var i = 0; i < $scope.technologies.length; i++) {
            activeTech.push(i);
        }
    }

    $scope.hideAllSubTech = function () {
        activeTech = [];
    }

    $scope.isActiveTech = function (index) {
        return !(activeTech.indexOf(index) == -1);
        // return true;
    }
    $scope.isShowTechList = false;
    $scope.showTechnologies = function () {
        $scope.isShowTechList = ($scope.isShowTechList) ? false : true;
    }

    $scope.addTechInProject = function (index) {
        if (isTechContains($scope.technologies[index]._id) == undefined) {
            var addingItem = angular.copy($scope.technologies[index]);
            addingItem.subTech = [];
            $scope.newProject.tech.push(addingItem);
        }
    }

    function isTechContains(id) {
        for (var i = 0; i < $scope.newProject.tech.length; i++) {
            if ($scope.newProject.tech[i]._id === id) {
                return i;
            }
        }
        return undefined;
    }

    $scope.addSubTechInProject = function (index, parentIndex) {
        $scope.addTechInProject(parentIndex);
        var newProjectParentIndex = isTechContains($scope.technologies[parentIndex]._id);
        if (!isSubTechContains(newProjectParentIndex, $scope.technologies[parentIndex].subTech[index]._id)) {
            var addingSubItem = angular.copy($scope.technologies[parentIndex].subTech[index]);
            $scope.newProject.tech[newProjectParentIndex].subTech.push(addingSubItem);
        }
    }

    $scope.removeSubTechFromProject = function (subtechIndex, techIndex) {
        $scope.newProject.tech[techIndex].subTech.splice(subtechIndex, 1);
        if ($scope.newProject.tech[techIndex].subTech.length == 0) {
            $scope.newProject.tech.splice(techIndex, 1);
        }
    }

    $scope.removeTechFromProj = function (techIndex) {
        $scope.newProject.tech.splice(techIndex, 1);
    }

    function isSubTechContains(index, id) {
        for (var i = 0; i < $scope.newProject.tech[index].subTech.length; i++) {
            if ($scope.newProject.tech[index].subTech[i]._id === id) {
                return true;
            }
        }
        return false;
    }

    $scope.isSelectedSubTech = function (techId, subtechId) {
        var findTech = getTechById(techId);
        if (findTech) {

            if (getSubtechById(findTech, subtechId)) {
                return true;
            }
        }
        return false;
    }

    function getTechById(techId) {
        for (var i = 0; i < $scope.newProject.tech.length; i++) {
            if ($scope.newProject.tech[i]._id == techId) {
                return $scope.newProject.tech[i];
            }
        }
        return undefined;
    }

    function getSubtechById(tech, subtechId) {

        for (var i = 0; i < tech.subTech.length; i++) {
            if (tech.subTech[i]._id == subtechId) {
                return tech.subTech[i];
            }
        }
        return undefined;
    }

    $scope.isShowRoleList = false;
    $scope.showRoles = function () {
        $scope.isShowRoleList = ($scope.isShowRoleList) ? false : true;
    }

    function getRoles() {
        $scope.roles = [];
        roleService.getAll().then(function (data) {
            $scope.roles = data;
        }, function (error) {
            console.log(error);
        });
    }
    getRoles();

    $scope.addRole = function (role) {
        var isConsist = false;
        for (var i = 0; i < $scope.newProject.roles.length; i++) {
            if ($scope.newProject.roles[i].name == role.name) {
                $scope.newProject.roles[i].count++;
                isConsist = true;
            }
        }
        if (!isConsist) {
            $scope.newProject.roles.push({ name: role.name, count: 1 });
        }
    }

    $scope.removeRole = function (index) {
        $scope.newProject.roles.splice(index, 1);
    }

    $scope.isShowResponsibList = false;
    $scope.showResponsibility = function () {
        $scope.isShowResponsibList = ($scope.isShowResponsibList) ? false : true;
    }

    function getResponsibilities() {
        $scope.responsibilities = [];
        responsibilityService.getAll().then(function (data) {
            $scope.responsibilities = data;
            console.log($scope.responsibilities);
        }, function (error) {
            console.log(error);
        });
    }
    getResponsibilities();

    $scope.addResponsibility = function (responsibility) {
        $scope.newProject.responsibilities.push({ name: responsibility.name, responsibId: responsibility._id });
    }

    $scope.removeResponsibility = function (index) {
        $scope.newProject.responsibilities.splice(index, 1);
    }

    $scope.isSelectedResponsibility = function (responsibility) {
        return Boolean(getResponsibilityById(responsibility));
    }

    function getResponsibilityById(responsibility) {
        for (var i = 0; i < $scope.newProject.responsibilities.length; i++) {
            if (responsibility._id === $scope.newProject.responsibilities[i].responsibId) {
                return $scope.newProject.responsibilities[i];
            }
        }
    }

    $scope.addNewResponsibility = function () {
        if ($scope.newResponsibility.name !== undefined && $scope.newResponsibility.name !== '') {
            $scope.newProject.responsibilities.push($scope.newResponsibility);
            $scope.newResponsibility = undefined;
        };
    }

    $scope.$watch('files', function (newVal, oldVal) {
        if (newVal !== undefined && newVal !== null) {
            console.log(newVal);
            console.log(JSON.stringify(newVal));
            $scope.projectImgs = $scope.projectImgs.concat(newVal);
        }
    });

    $scope.removeImage = function (index) {
        $scope.projectImgs.splice(index, 1);
    }

    // $scope.upload = function (file) {
    //     console.log(file);
    //     Upload.upload({
    //         url: 'http://localhost:1337/images',
    //         method: 'POST',
    //         arrayKey: '',
    //         data: {
    //             files: file,
    //             project: $scope.newProject
    //         }
    //     }).then(function (resp) {
    //         console.log('Success ' + resp.config.file.name + 'uploaded. Response: ' + resp.data);
    //     }, function (resp) {
    //         console.log('Error status: ' + resp.status);
    //     }, function (evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ');
    //     });
    // };


}]);
