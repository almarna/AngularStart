var Configuration;
(function (Configuration) {
    var IoC = (function () {
        function IoC() {
        }
        IoC.SetupMappings = function (applicationName) {
            var application = angular.module(applicationName, ['ui.bootstrap', 'ngRoute']);

            application.config(["$routeProvider", this.mapRoutes]);

            application.directive('menu', [function () {
                    return new Directives.MenuDirective();
                }]);
            application.service('dataContainer', Services.DataContainer);

            application.filter('diff', function () {
                return Filters.Difference;
            });
            //            application.config(["$httpProvider", ($httpProvider) => { return new JsonExtender($httpProvider); }]);
            //            application.directive('jqPlot', [() => new jqPlotDirective()]);
            //            application.directive('saveCookie', (storage) => new SaveCookieDirective(storage));
            //            application.constant('_', _);
        };

        IoC.mapRoutes = function ($routeProvider) {
            $routeProvider.when("/home", { controller: "Pages.HomeController", templateUrl: "Pages/Home/HomeView.html" }).when("/samples", { controller: "Pages.SamplesController", templateUrl: "Pages/Samples/SamplesView.html" }).when("/ui", { controller: "Pages.UiBootstrapController", templateUrl: "Pages/UiBootstrap/UiBootstrapView.html" }).when("/links", { controller: "Pages.LinksController", templateUrl: "Pages/Links/LinksView.html" }).when("/about", { controller: "Pages.AboutController", templateUrl: "Pages/About/AboutView.html" }).otherwise({ redirectTo: "/home" });
        };
        return IoC;
    })();
    Configuration.IoC = IoC;
})(Configuration || (Configuration = {}));
var Directives;
(function (Directives) {
    var MenuDirective = (function () {
        function MenuDirective() {
            this.restrict = 'E';
            this.replace = true;
            this.scope = { selectedItem: '@selectedItem', title: '@title', items: '=' };
            this.templateUrl = 'Directives/MenuDirective.html';
        }
        return MenuDirective;
    })();
    Directives.MenuDirective = MenuDirective;
})(Directives || (Directives = {}));
var Filters = (function () {
    function Filters() {
    }
    Filters.Difference = function (indataUnparsed) {
        var result = "";
        var indata = +indataUnparsed;

        if (indata < 0) {
            result = "" + indata.toFixed(1);
        } else if (indata > 0) {
            result = "+" + indata.toFixed(1);
        }

        return result;
    };
    return Filters;
})();
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
var Services;
(function (Services) {
    var DataContainer = (function () {
        function DataContainer($http) {
            this.$http = $http;
        }
        DataContainer.prototype.GetMenu = function () {
            return [
                { link: '#/home', text: 'Home' },
                { link: '#/samples', text: 'Samples' },
                { link: '#/ui', text: 'Ui Bootstrap' },
                { link: '#/links', text: 'Links' },
                { link: '#/about', text: 'About' }
            ];
        };

        DataContainer.prototype.GetServerData = function () {
            return this.$http.get('DummyData/data.txt').then(function (serverResponse) {
                return serverResponse.data;
            });
        };

        DataContainer.prototype.GetServerDataError = function () {
            return this.$http.get('DummyData/nonExistant.txt').then(function (serverResponse) {
                return serverResponse.data;
            });
        };
        return DataContainer;
    })();
    Services.DataContainer = DataContainer;
})(Services || (Services = {}));
//# sourceMappingURL=CombinedTypescript.js.map
