module Pages
{
    export class LinksController
    {
        constructor(
            private $scope: Pages.IHomeViewModel,
            private dataContainer: Services.DataContainer
            )
        {
            $scope.menuItems = dataContainer.GetMenu();
        }

    }
}