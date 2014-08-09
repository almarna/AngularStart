module Pages
{

    export class SamplesController
    {
        constructor(
            private $scope: Pages.ISamplesViewModel,
            private dataContainer: Services.DataContainer
        )
        {
            $scope.menuItems = dataContainer.GetMenu();

            $scope.getData = () => this.getServerData();
            $scope.getData2 = () => this.getServerDataError();
        }

        private getServerData(): void
        {
            this.dataContainer.GetServerData().then((data) => this.serverDataFetched(data), (errorInfo) => this.serverFail(errorInfo));
        }

        private getServerDataError(): void
        {
            this.dataContainer.GetServerDataError().then((data) => this.serverDataFetched(data), (errorInfo) => this.serverFail(errorInfo));
        }

        private serverDataFetched(data: any): void
        {
            this.$scope.serverData = data;
            this.$scope.message = "DataFetched!";
        }

        private serverFail(errorInfo: any): void
        {
            this.$scope.serverData = null;
            this.$scope.message = "Error " + errorInfo.status + " Message: " + errorInfo.statusText;
        }
    }
}