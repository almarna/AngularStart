module Directives
{
    export class MenuDirective implements ng.IDirective
    {
        restrict: string = 'E';
        replace: boolean = true;

        scope: any = { selectedItem: '@', title: '@', items: '=' };

        templateUrl = 'App/Directives/MenuDirective.html';
    }
}