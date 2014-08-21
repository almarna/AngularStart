module Pages
{
    export class AboutController
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