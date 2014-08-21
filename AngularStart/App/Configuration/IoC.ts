module Configuration
{
    export class IoC
    {
        public static SetupMappings(applicationName: string): void
        {
            var application: ng.IModule = angular.module(applicationName, ['ui.bootstrap', 'ngRoute']);

            application.config(["$routeProvider", this.mapRoutes]);

            application.directive('menu', [() => new Directives.MenuDirective()]);
            application.service('dataContainer', Services.DataContainer);

            application.filter('diff', () => { return Filters.Difference; });


//            application.config(["$httpProvider", ($httpProvider) => { return new JsonExtender($httpProvider); }]);


//            application.directive('jqPlot', [() => new jqPlotDirective()]);
//            application.directive('saveCookie', (storage) => new SaveCookieDirective(storage));

//            application.constant('_', _);
        }

        private static mapRoutes($routeProvider: ng.route.IRouteProvider)
        {
            $routeProvider
                .when("/home", { controller: "Pages.HomeController", templateUrl: "App/Pages/Home/HomeView.html" })
                .when("/samples", { controller: "Pages.SamplesController", templateUrl: "App/Pages/Samples/SamplesView.html" })
                .when("/ui", { controller: "Pages.UiBootstrapController", templateUrl: "App/Pages/UiBootstrap/UiBootstrapView.html" })
                .when("/links", { controller: "Pages.LinksController", templateUrl: "App/Pages/Links/LinksView.html" })
                .when("/about", { controller: "Pages.AboutController", templateUrl: "App/Pages/About/AboutView.html" })
//                .when("/login/:action", { controller: "Pages_Start.Controller", templateUrl: "Pages/Start/View.html" })
                .otherwise({ redirectTo: "/home" });
        }
    }
}