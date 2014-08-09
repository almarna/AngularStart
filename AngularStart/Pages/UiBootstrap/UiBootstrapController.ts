module Pages
{
    export class UiBootstrapController
    {
        constructor(
            private $scope: Pages.IHomeViewModel,
            private $location: ng.ILocationService,
            private dataContainer: Services.DataContainer
        )
        {
            $scope.menuItems = dataContainer.GetMenu();
        }

    }
}