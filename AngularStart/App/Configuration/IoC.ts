module Configuration
{
    //export interface IMenuRoute extends ng.route.IRoute
    //{
    //    name: string;
    //    icon: string;
    //}

    export class IoC
    {
        public static SetupMappings(applicationName: string): void
        {
            var application: ng.IModule = angular.module(applicationName, ['ui.bootstrap', 'ngRoute']);

            application.directive('menu',($route) => new Directives.MenuDirective($route));
            application.directive('personInfo',() => new Directives.PersonInfoDirective());

            application.service('dataContainer', Services.DataContainer);
            application.service('storage', LocalStorageOrCookie);

            application.filter('diff',() => { return Filters.Difference; });

            application.controller('MasterController', Pages.MasterController);
            application.controller('HomeController', Pages.HomeController);
            application.controller('SamplesController', Pages.SamplesController);
            application.controller('UiBootstrapController', Pages.UiBootstrapController);
            application.controller('BootstrapController', Pages.BootstrapController);
            application.controller('LinksController', Pages.LinksController);

            application.config(["$routeProvider", this.mapRoutes]);
        }

        private static mapRoutes($routeProvider: ng.route.IRouteProvider)
        {
            $routeProvider
                .when("/home",{
                    controller: "HomeController",
                    templateUrl: "App/Pages/Home/HomeView.html",
                    name: "Info",
                    icon: "fa fa-car"
                    })
                .when("/samples", {
                    controller: "SamplesController",
                    templateUrl: "App/Pages/Samples/SamplesView.html",
                    name: "Samples",
                    icon: "fa fa-ship"
                    })
                .when("/bootstrap", {
                    controller: "BootstrapController",
                    templateUrl: "App/Pages/Bootstrap/BootstrapView.html",
                    name: "Bootstrap & FontAwesome",
                    icon: "fa fa-bicycle"
                    })
                .when("/ui", {
                    controller: "UiBootstrapController",
                    templateUrl: "App/Pages/UiBootstrap/UiBootstrapView.html",
                    name: "UI Bootstrap",
                    icon: "fa fa-motorcycle"
                    })
                .when("/links", {
                    controller: "LinksController",
                    templateUrl: "App/Pages/Links/LinksView.html",
                    name: "Links",
                    icon: "fa fa-bus"
                    })
                .otherwise({ redirectTo: "/home" });
        }
    }
}