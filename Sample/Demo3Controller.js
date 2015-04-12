function SetupMappings(applicationName) {
    var application = angular.module(applicationName, []);
    application.service('dataContainer', DataContainer);
}
var Demo3Controller = (function () {
    function Demo3Controller($scope, dataContainer) {
        var _this = this;
        this.$scope = $scope;
        this.dataContainer = dataContainer;
        $scope.addContactOldStyle = function () {
            $scope.contacts.push(_this.$scope.newContact);
            $scope.newContact = "";
        };
        $scope.addContactNoControllerStyle = this.addContactNoControllerStyle;
        $scope.addContact = function () { return _this.addcontactToList(); };
        $scope.contacts = dataContainer.GetContacts();
    }
    // *********************************************
    // Crazy <any> casts of 'this' are necessary
    // for TypeScript
    // The demo shows a bad effect of direct connect
    // of method. "this" is now the $scope
    // *********************************************
    Demo3Controller.prototype.addContactNoControllerStyle = function () {
        this.contacts.push(this.newContact);
        this.newContact = "";
    };
    Demo3Controller.prototype.addcontactToList = function () {
        this.$scope.contacts.push(this.$scope.newContact);
        this.$scope.newContact = "";
    };
    return Demo3Controller;
})();
var DataContainer = (function () {
    function DataContainer() {
    }
    DataContainer.prototype.GetContacts = function () {
        return ["bill.gates@gmail.com", "eric.schmidt@hotmail.com"];
    };
    return DataContainer;
})();
//# sourceMappingURL=Demo3Controller.js.map