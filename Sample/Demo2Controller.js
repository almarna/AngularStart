var Demo2Controller = (function () {
    function Demo2Controller($scope) {
        var _this = this;
        this.$scope = $scope;
        $scope.addContact = function () { return _this.addcontactToList(); };
        $scope.contacts = ["bill.gates@gmail.com", "eric.schmidt@hotmail.com"];
    }
    Demo2Controller.prototype.addcontactToList = function () {
        this.$scope.contacts.push(this.$scope.newContact);
        this.$scope.newContact = "";
        this.myvar = "";
    };
    return Demo2Controller;
})();
//# sourceMappingURL=Demo2Controller.js.map