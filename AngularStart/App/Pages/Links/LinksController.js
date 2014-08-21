var Pages;
(function (Pages) {
    var LinksController = (function () {
        function LinksController($scope, dataContainer) {
            this.$scope = $scope;
            this.dataContainer = dataContainer;
            $scope.menuItems = dataContainer.GetMenu();
        }
        return LinksController;
    })();
    Pages.LinksController = LinksController;
})(Pages || (Pages = {}));
//# sourceMappingURL=LinksController.js.map
