var Pages;
(function (Pages) {
    var HomeController = (function () {
        function HomeController($scope, dataContainer) {
            this.$scope = $scope;
            this.dataContainer = dataContainer;
            $scope.menuItems = dataContainer.GetMenu();
        }
        return HomeController;
    })();
    Pages.HomeController = HomeController;
})(Pages || (Pages = {}));
//# sourceMappingURL=HomeController.js.map
