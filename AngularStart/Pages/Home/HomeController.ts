module Pages
{
    export class HomeController
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