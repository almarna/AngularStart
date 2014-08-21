var Pages;
(function (Pages) {
    var UiBootstrapController = (function () {
        function UiBootstrapController($scope, $location, dataContainer) {
            this.$scope = $scope;
            this.$location = $location;
            this.dataContainer = dataContainer;
            $scope.menuItems = dataContainer.GetMenu();
        }
        return UiBootstrapController;
    })();
    Pages.UiBootstrapController = UiBootstrapController;
})(Pages || (Pages = {}));
//# sourceMappingURL=UiBootstrapController.js.map
