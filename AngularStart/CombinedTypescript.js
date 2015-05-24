var Configuration;
(function (Configuration) {
    //export interface IMenuRoute extends ng.route.IRoute
    //{
    //    name: string;
    //    icon: string;
    //}
    var IoC = (function () {
        function IoC() {
        }
        IoC.SetupMappings = function (applicationName) {
            var application = angular.module(applicationName, ['ui.bootstrap', 'ngRoute']);
            application.directive('menu', function ($route) { return new Directives.MenuDirective($route); });
            application.directive('personInfo', function () { return new Directives.PersonInfoDirective(); });
            application.service('dataContainer', Services.DataContainer);
            application.service('storage', LocalStorageOrCookie);
            application.filter('diff', function () {
                return Filters.Difference;
            });
            application.controller('MasterController', Pages.MasterController);
            application.controller('HomeController', Pages.HomeController);
            application.controller('SamplesController', Pages.SamplesController);
            application.controller('UiBootstrapController', Pages.UiBootstrapController);
            application.controller('BootstrapController', Pages.BootstrapController);
            application.controller('LinksController', Pages.LinksController);
            application.config(["$routeProvider", this.mapRoutes]);
        };
        IoC.mapRoutes = function ($routeProvider) {
            $routeProvider.when("/home", {
                controller: "HomeController",
                templateUrl: "App/Pages/Home/HomeView.html",
                name: "Info",
                icon: "fa fa-car"
            }).when("/samples", {
                controller: "SamplesController",
                templateUrl: "App/Pages/Samples/SamplesView.html",
                name: "Samples",
                icon: "fa fa-ship"
            }).when("/bootstrap", {
                controller: "BootstrapController",
                templateUrl: "App/Pages/Bootstrap/BootstrapView.html",
                name: "Bootstrap & FontAwesome",
                icon: "fa fa-bicycle"
            }).when("/ui", {
                controller: "UiBootstrapController",
                templateUrl: "App/Pages/UiBootstrap/UiBootstrapView.html",
                name: "UI Bootstrap",
                icon: "fa fa-motorcycle"
            }).when("/links", {
                controller: "LinksController",
                templateUrl: "App/Pages/Links/LinksView.html",
                name: "Links",
                icon: "fa fa-bus"
            }).otherwise({ redirectTo: "/home" });
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
            this.templateUrl = 'App/Directives/MenuDirective.html';
            this.transclude = true;
            this.routes = [];
            this.setRoutes();
        }
        MenuDirective.prototype.compile = function (elem, attrs, transclude) {
            var _this = this;
            return function ($scope) { return _this.postLink($scope); };
        };
        MenuDirective.prototype.postLink = function ($scope) {
            var _this = this;
            this.$scope = $scope;
            $scope.routes = this.routes;
            this.setCurrentPage();
            $scope.$on('$locationChangeSuccess', function () { return _this.locationChanged(); });
        };
        MenuDirective.prototype.locationChanged = function () {
            this.$scope.isExpanded = false;
            this.setCurrentPage();
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
        MenuDirective.prototype.setCurrentPage = function () {
            var currentPath = this.$route.current.originalPath;
            for (var i = 0; i < this.routes.length; i++) {
                if (this.routes[i].originalPath === currentPath) {
                    this.$scope.selectedItem = i;
                    return;
                }
            }
            this.$scope.selectedItem = -1;
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
        function BootstrapController($scope, storage) {
            var _this = this;
            this.$scope = $scope;
            this.storage = storage;
            var theme = this.storage.Get("theme");
            if (theme) {
                $scope.Theme = theme;
            }
            $scope.ThemeChange = function () { return _this.themeChange(); };
        }
        BootstrapController.prototype.themeChange = function () {
            var parent = this.$scope.$parent;
            parent.Theme = this.$scope.Theme;
            this.storage.Set("theme", this.$scope.Theme);
        };
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
    var MasterController = (function () {
        function MasterController($scope, storage) {
            this.$scope = $scope;
            this.storage = storage;
            var theme = this.storage.Get("theme");
            if (!theme) {
                theme = 'Main';
            }
            $scope.Theme = theme;
        }
        return MasterController;
    })();
    Pages.MasterController = MasterController;
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
var LocalStorageOrCookie = (function () {
    function LocalStorageOrCookie() {
        this.localStorageSupported = (typeof localStorage != "undefined" && localStorage !== null);
    }
    LocalStorageOrCookie.prototype.Delete = function (key) {
        if (this.localStorageSupported) {
            localStorage.removeItem(key);
        }
        else {
            this.createCookie(key, null, -1);
        }
    };
    LocalStorageOrCookie.prototype.Set = function (key, value) {
        if (this.localStorageSupported) {
            localStorage.setItem(key, value);
        }
        else {
            this.createCookie(key, value, 30);
        }
    };
    LocalStorageOrCookie.prototype.createCookie = function (key, value, expires) {
        var date = new Date();
        date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
        var expiresStr = "; expires=" + date.toUTCString();
        document.cookie = key + "=" + encodeURIComponent(value) + expiresStr + "; path=/";
    };
    LocalStorageOrCookie.prototype.Get = function (key) {
        if (this.localStorageSupported) {
            return localStorage.getItem(key);
        }
        else {
            return this.readCookie(key);
        }
    };
    LocalStorageOrCookie.prototype.readCookie = function (key) {
        var cookies = document.cookie;
        var startPos = cookies.indexOf(" " + key + "=");
        if (startPos == -1) {
            startPos = cookies.indexOf(key + "=");
        }
        if (startPos < 0) {
            return null;
        }
        var valueStartPos = cookies.indexOf("=", startPos) + 1;
        var valueEndPos = cookies.indexOf(";", valueStartPos);
        if (valueEndPos == -1) {
            valueEndPos = cookies.length;
        }
        return decodeURIComponent(cookies.substring(valueStartPos, valueEndPos));
    };
    return LocalStorageOrCookie;
})();
//# sourceMappingURL=CombinedTypescript.js.map