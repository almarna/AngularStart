var Pages;
(function (Pages) {
    var AboutController = (function () {
        function AboutController($scope, dataContainer) {
            this.$scope = $scope;
            this.dataContainer = dataContainer;
            $scope.menuItems = dataContainer.GetMenu();
        }
        return AboutController;
    })();
    Pages.AboutController = AboutController;
})(Pages || (Pages = {}));
//# sourceMappingURL=AboutController.js.map
