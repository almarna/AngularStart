module Pages
{
    interface IMasterViewModel extends ng.IScope
    {
        Theme: string;
    }

    export class MasterController
    {
        constructor(
            private $scope: IMasterViewModel,
            private storage: LocalStorageOrCookie
            )
        {
            var theme = this.storage.Get("theme");
            if (!theme)
            {
                theme = 'Main';
            }
            $scope.Theme = theme;
        }
    }
}