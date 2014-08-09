module Directives
{
    export class MenuDirective implements ng.IDirective
    {
        restrict: string = 'E';
        replace: boolean = true;

        scope: any = { selectedItem: '@selectedItem', title: '@title', items: '=' };

        templateUrl = 'Directives/MenuDirective.html';
    }
}