module Directives
{
    export interface IMenuViewModel extends ng.IScope
    {
        selectedItem: number;
        routes: any[];
    }

    export class MenuDirective implements ng.IDirective
    {
        restrict = 'E';
        replace = true;
        templateUrl: string = 'App/Directives/MenuDirective.html';
        transclude = true;

        private routes = [];

        constructor(private $route)
        {
        }

        public compile(elem, attrs, transclude)
        {
            return ($scope) => this.postLink($scope);
        }

        private postLink($scope: IMenuViewModel)
        {
            this.setRoutes();

            $scope.selectedItem = this.getCurrentPage();
            $scope.routes = this.routes;
            $scope.$on('$locationChangeSuccess',() => $scope.selectedItem = this.getCurrentPage());
        }

        private setRoutes()
        {
            this.routes = [];
            for (var propertyName in this.$route.routes)
            {
                var item = this.$route.routes[propertyName];

                if (item.name)
                {
                    this.routes.push(item);
                    console.debug(propertyName);
                }
            }
        }

        private getCurrentPage(): number
        {
            var currentPath = this.$route.current.originalPath;

            for (var i = 0; i < this.routes.length; i++)
            {
                if (this.routes[i].originalPath === currentPath)
                {
                    return i + 1;
                }
            }
            return 0;
        }
    }
}