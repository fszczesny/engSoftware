'use strict';

angular.module('user', ['core']);

angular
    .module('user')
    .constant('ClientUserTypes', [
        { id: 'Customer', name: 'Cliente' },
        { id: 'Owner', name: 'Proprietário' }
    ])
    .constant('EmployeeUserTypes', [
        { id: 'Consultant', name: 'Consultor' },
        { id: 'Supervisor', name: 'Supervisor' },
        { id: 'Manager', name: 'Gerente' },
    ]);