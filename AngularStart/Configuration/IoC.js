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
//# sourceMappingURL=IoC.js.map
