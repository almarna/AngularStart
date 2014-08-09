var Pages;
(function (Pages) {
    var SamplesController = (function () {
        function SamplesController($scope, dataContainer) {
            var _this = this;
            this.$scope = $scope;
            this.dataContainer = dataContainer;
            $scope.menuItems = dataContainer.GetMenu();

            $scope.getData = function () {
                return _this.getServerData();
            };
            $scope.getData2 = function () {
                return _this.getServerDataError();
            };
        }
        SamplesController.prototype.getServerData = function () {
            var _this = this;
            this.dataContainer.GetServerData().then(function (data) {
                return _this.serverDataFetched(data);
            }, function (errorInfo) {
                return _this.serverFail(errorInfo);
            });
        };

        SamplesController.prototype.getServerDataError = function () {
            var _this = this;
            this.dataContainer.GetServerDataError().then(function (data) {
                return _this.serverDataFetched(data);
            }, function (errorInfo) {
                return _this.serverFail(errorInfo);
            });
        };

        SamplesController.prototype.serverDataFetched = function (data) {
            this.$scope.serverData = data;
            this.$scope.message = "DataFetched!";
        };

        SamplesController.prototype.serverFail = function (errorInfo) {
            this.$scope.serverData = null;
            this.$scope.message = "Error " + errorInfo.status + " Message: " + errorInfo.statusText;
        };
        return SamplesController;
    })();
    Pages.SamplesController = SamplesController;
})(Pages || (Pages = {}));
//# sourceMappingURL=SamplesController.js.map
