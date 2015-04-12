module Pages
{
    export class HomeController
    {
        constructor(
            private $scope: Pages.IHomeViewModel,
            private dataContainer: Services.DataContainer
        )
        {
        }

    }
}