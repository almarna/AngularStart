module Pages
{
    export interface IUiBootstrapViewModel extends ng.IScope
    {
        menuItems: any;

        loginUserName: string;
        loginPassword: string;
        message: string;
        loginSaveCookie: boolean;
        showView: string;
        viewTypes: any;

        onLogin();
    }
}