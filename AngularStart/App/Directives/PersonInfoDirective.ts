module Directives
{
    export class PersonInfoDirective implements ng.IDirective
    {
        restrict: string = 'E';
        replace: boolean = true;

        scope: any = { value: '=' };

        templateUrl = 'App/Directives/PersonInfoDirective.html';
    }
}