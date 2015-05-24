module Directives
{
    export interface IMenuViewModel extends ng.IScope
    {
        selectedItem: number;
        routes: any[];
        isExpanded: boolean;
    }

    export class MenuDirective implements ng.IDirective
    {
        restrict = 'E';
        replace = true;
        templateUrl: string = 'App/Directives/MenuDirective.html';
        transclude = true;

        private routes = [];

        private $scope: IMenuViewModel;

        constructor(private $route)
        {
            this.setRoutes();
        }

        public compile(elem, attrs, transclude)
        {
            return ($scope) => this.postLink($scope);
        }

        private postLink($scope: IMenuViewModel)
        {
            this.$scope = $scope;

            $scope.routes = this.routes;
            this.setCurrentPage();

            $scope.$on('$locationChangeSuccess',() => this.locationChanged());
        }

        private locationChanged()
        {
            this.$scope.isExpanded = false;
            this.setCurrentPage();
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

        private setCurrentPage(): void
        {
            var currentPath = this.$route.current.originalPath;

            for (var i = 0; i < this.routes.length; i++)
            {
                if (this.routes[i].originalPath === currentPath)
                {
                    this.$scope.selectedItem = i;
                    return;
                }
            }
            this.$scope.selectedItem = -1;
        }
    }
}