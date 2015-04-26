module Pages
{
    interface IBootstrapViewModel extends ng.IScope
    {
        Theme : string;
        ThemeChange();
    }

    export class BootstrapController
    {
        constructor(
            private $scope: IBootstrapViewModel,
            private storage: LocalStorageOrCookie
            )
        {
            var theme = this.storage.Get("theme");
            if (theme)
            {
                $scope.Theme = theme;
            }

            $scope.ThemeChange = () => this.themeChange();
        }

        private themeChange()
        {
            var parent: any = this.$scope.$parent;
            parent.Theme = this.$scope.Theme;
            this.storage.Set("theme", this.$scope.Theme);
        }
    }
}