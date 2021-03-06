'use strict';

var technology = angular.module('technology', ['technology.service']);

technology.controller('TechnologiesCtrl', ['$scope', 'namesPagesService', 'Technologies', 'SubTech', '$log', 'subTechSortOrderService',
    function ($scope, namesPagesService, Technologies, SubTech, $log, subTechSortOrderService) {

        $scope.$parent.pageName = namesPagesService.tech;
        var markedTech;

        function getTechnologies() {
            $scope.technologies = undefined;
            Technologies.query(function (data) {
                $log.debug(data);
                $scope.technologies = data;
                //addIndexSort($scope.technologies);
            }, function (error) {
                $log.debug(error);
            });
        }
        getTechnologies();

        $scope.isTechFormSubmit = false;
        $scope.addTech = function () {
            if ($scope.techForm.$valid) {
                if (markedTech == undefined) {
                    Technologies.post({ techName: $scope.newTechName }, function (data) {
                        $log.debug(data.technology);
                        $scope.technologies.push(data.technology);
                    }, function (error) {
                        $log.debug(error);
                    });
                } else {
                    var parentId = $scope.technologies[markedTech]._id;
                    SubTech.post({ parentId: parentId, name: $scope.newTechName }, function (data) {
                        $log.debug(data.newSubTech);
                        $scope.technologies[markedTech].subTech.push(data.newSubTech);
                        changeSortOrder($scope.technologies[markedTech]._id, $scope.technologies[markedTech].subTech);
                    }, function (error) {
                        $log.debug(error);
                    });
                }
                $scope.newTechName = '';
                $scope.isTechFormSubmit = false;
            } else {
                $scope.isTechFormSubmit = true;
            }
        }
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

        $scope.removeSubTech = function (index, parentIndex) {
            SubTech.remove({ id : $scope.technologies[parentIndex].subTech[index]._id }, function (data) {
                $log.debug(data);
                $scope.technologies[parentIndex].subTech.splice(index, 1);
                changeSortOrder($scope.technologies[parentIndex]._id, $scope.technologies[parentIndex].subTech);
            }, function (error) {
                $log.debug(error);
            });
        }

        $scope.removeTech = function (index) {
            Technologies.remove({ id : $scope.technologies[index]._id }, function (data) {
                $log.debug(data);
                $scope.technologies.splice(index, 1);
                if ($scope.technologies.length == 0 || $scope.isMarkedTech(index)) {
                    markedTech = undefined
                }
            }, function (error) {
                $log.debug(error);
            });
        }

        $scope.markTech = function (index) {
            markedTech = (markedTech === index) ? undefined : index;
        }

        $scope.isMarkedTech = function (index) {
            return markedTech === index;
        }

        var indexEditTech = [];
        $scope.editTech = function (index, parentIndex) {
            $scope.editTechName = (parentIndex !== undefined)
                    ? $scope.technologies[parentIndex].subTech[index].name
                    : $scope.technologies[index].techName;
            indexEditTech.push(index);
            indexEditTech.push(parentIndex);
        }

        $scope.saveEditTech = function () {
            if (indexEditTech[1] === undefined) {
                var editIndex = indexEditTech[0];
                Technologies.update({ id : $scope.technologies[editIndex]._id,
                techName : $scope.editTechName }, function (data) {
                    $log.debug(data);
                    $scope.technologies[editIndex].techName = data.technology.techName;
                }, function (error) {
                    $log.debug(error);
                });
            } else {
                var editSubTech = $scope.technologies[indexEditTech[1]].subTech[indexEditTech[0]];
                SubTech.update({ id: editSubTech._id, name: $scope.editTechName }, function (data) {
                    $log.debug(data.subtech);
                    editSubTech.name = data.subtech.name;
                }, function (error) {
                    $log.debug(error);
                });
            }
            $scope.editTechName = '';
            indexEditTech = [];
        }

        $scope.subTechConfig = {
            group: 'subTech',
            animation: 150,
            onAdd: function (e) {
                var parentId = (e.newIndex === 0) ? e.models[e.newIndex + 1].technology : e.models[e.newIndex - 1].technology;
                SubTech.post({ parentId: parentId, name: e.model.name }, function (data) {
                    $log.debug("move adding subtech", data.newSubTech);
                    e.models[e.newIndex] = data.newSubTech;
                    var parentTech = $scope.technologies.find(function(tech) {
                        return tech._id == parentId;
                    });
                    parentTech.subTech[e.newIndex] = data.newSubTech;
                    changeSortOrder(parentId, e.models);
                }, function (error) {
                    $log.debug(error);
                });
            },
            onRemove: function (e) {
                SubTech.remove({ id : e.model._id }, function (data) {
                    $log.debug("move removed subtech", data);
                    changeSortOrder(e.model.technology, e.models);
                }, function (error) {
                    $log.debug(error);
                });
            },
            onSort: function (e) {
                if (e.model !== undefined) {
                    changeSortOrder(e.model.technology, e.models);
                }
            }
        };


        function changeSortOrder (techId, subTech) {
            console.log('1');
            var names = [];
            var sortOrder = subTech.map(function (subTech) {
                names.push(subTech.name);
                return subTech._id;
            });
            $log.debug(names.join(', '));
            $log.debug(sortOrder.join(', '));
            subTechSortOrderService.changeSortOrder(techId, sortOrder).then(function (data) {
                $log.debug("changed sort order");
            }, function (error) {
                $log.debug(error);
            });
        }


        // remove after adding indexSort
        function addIndexSort (technologies) {
            technologies.forEach(function (tech) {
                $log.debug("index", tech);
                changeSortOrder(tech._id, tech.subTech);
            });
        }

    }]);
