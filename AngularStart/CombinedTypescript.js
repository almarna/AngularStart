var Configuration;
(function (Configuration) {
    var IoC = (function () {
        function IoC() {
        }
        IoC.SetupMappings = function (applicationName) {
            var application = angular.module(applicationName, ['ui.bootstrap', 'ngRoute']);
            application.directive('menu', function ($route) { return new Directives.MenuDirective($route); });
            application.directive('personInfo', function () { return new Directives.PersonInfoDirective(); });
            application.service('dataContainer', Services.DataContainer);
            application.filter('diff', function () {
                return Filters.Difference;
            });
            application.controller('HomeController', Pages.HomeController);
            application.controller('SamplesController', Pages.SamplesController);
            application.controller('UiBootstrapController', Pages.UiBootstrapController);
            application.controller('BootstrapController', Pages.BootstrapController);
            application.controller('LinksController', Pages.LinksController);
            application.config(["$routeProvider", this.mapRoutes]);
        };
        IoC.mapRoutes = function ($routeProvider) {
            $routeProvider.when("/home", { controller: "HomeController", templateUrl: "App/Pages/Home/HomeView.html", name: "Info" }).when("/samples", { controller: "SamplesController", templateUrl: "App/Pages/Samples/SamplesView.html", name: "Samples" }).when("/bootstrap", { controller: "BootstrapController", templateUrl: "App/Pages/Bootstrap/BootstrapView.html", name: "Bootstrap & FontAwesome" }).when("/ui", { controller: "UiBootstrapController", templateUrl: "App/Pages/UiBootstrap/UiBootstrapView.html", name: "UI Bootstrap" }).when("/links", { controller: "LinksController", templateUrl: "App/Pages/Links/LinksView.html", name: "Links" }).otherwise({ redirectTo: "/home" });
        };
        return IoC;
    })();
    Configuration.IoC = IoC;
})(Configuration || (Configuration = {}));
var Directives;
(function (Directives) {
    var MenuDirective = (function () {
        function MenuDirective($route) {
            this.$route = $route;
            this.restrict = 'E';
            this.replace = true;
            this.scope = { iconClass: '@', title: '@' };
            this.templateUrl = 'App/Directives/MenuDirective.html';
            this.routes = [];
        }
        MenuDirective.prototype.compile = function (elem, attrs, transclude) {
            var _this = this;
            return function ($scope) { return _this.postLink($scope); };
        };
        MenuDirective.prototype.postLink = function ($scope) {
            var _this = this;
            this.setRoutes();
            $scope.selectedItem = this.getCurrentPage();
            $scope.routes = this.routes;
            $scope.$on('$locationChangeSuccess', function (event) { return _this.SetPage($scope); });
        };
        MenuDirective.prototype.setRoutes = function () {
            this.routes = [];
            for (var propertyName in this.$route.routes) {
                var item = this.$route.routes[propertyName];
                if (item.name) {
                    this.routes.push(item);
                    console.debug(propertyName);
                }
            }
        };
        MenuDirective.prototype.getCurrentPage = function () {
            var currentPath = this.$route.current.originalPath;
            for (var i = 0; i < this.routes.length; i++) {
                if (this.routes[i].originalPath === currentPath) {
                    return i + 1;
                }
            }
            return 0;
        };
        MenuDirective.prototype.SetPage = function ($scope) {
            $scope.selectedItem = this.getCurrentPage();
        };
        return MenuDirective;
    })();
    Directives.MenuDirective = MenuDirective;
})(Directives || (Directives = {}));
var Directives;
(function (Directives) {
    var PersonInfoDirective = (function () {
        function PersonInfoDirective() {
            this.restrict = 'E';
            this.replace = true;
            this.scope = { value: '=' };
            this.templateUrl = 'App/Directives/PersonInfoDirective.html';
        }
        return PersonInfoDirective;
    })();
    Directives.PersonInfoDirective = PersonInfoDirective;
})(Directives || (Directives = {}));
var Filters = (function () {
    function Filters() {
    }
    Filters.Difference = function (indataUnparsed) {
        var result = "";
        var indata = +indataUnparsed;
        if (indata < 0) {
            result = "" + indata.toFixed(1);
        }
        else if (indata > 0) {
            result = "+" + indata.toFixed(1);
        }
        return result;
    };
    return Filters;
})();
var Pages;
(function (Pages) {
    var BootstrapController = (function () {
        function BootstrapController() {
        }
        return BootstrapController;
    })();
    Pages.BootstrapController = BootstrapController;
})(Pages || (Pages = {}));
var Pages;
(function (Pages) {
    var HomeController = (function () {
        function HomeController($scope, dataContainer) {
            this.$scope = $scope;
            this.dataContainer = dataContainer;
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
            $scope.personInfos = dataContainer.GetPersons();
            $scope.getData = function () { return _this.getServerData(); };
            $scope.getData2 = function () { return _this.getServerDataError(); };
        }
        SamplesController.prototype.getServerData = function () {
            var _this = this;
            this.dataContainer.GetServerData().then(function (data) { return _this.serverDataFetched(data); }, function (errorInfo) { return _this.serverFail(errorInfo); });
        };
        SamplesController.prototype.getServerDataError = function () {
            var _this = this;
            this.dataContainer.GetServerDataError().then(function (data) { return _this.serverDataFetched(data); }, function (errorInfo) { return _this.serverFail(errorInfo); });
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
        DataContainer.prototype.GetPersons = function () {
            return [
                { FirstName: 'Willhelm', LastName: 'Tell', Address: 'Hut road 15', Zip: '123 45', City: 'Alpendorf' },
                { FirstName: 'Cinder', LastName: 'Ella', Address: 'Glass Mountain 42', Zip: '543 21', City: 'FairyTown' },
                { FirstName: 'Snow', LastName: 'White', Address: 'Castle road 1', Zip: '999 99', City: 'FairyTown' }
            ];
        };
        DataContainer.prototype.GetServerData = function () {
            return this.$http.get('Api/data.txt').then(function (serverResponse) {
                return serverResponse.data;
            });
        };
        DataContainer.prototype.GetServerDataError = function () {
            return this.$http.get('Api/nonExistant.txt').then(function (serverResponse) {
                return serverResponse.data;
            });
        };
        return DataContainer;
    })();
    Services.DataContainer = DataContainer;
})(Services || (Services = {}));
//# sourceMappingURL=CombinedTypescript.js.map