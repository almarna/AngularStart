module Pages
{
    export interface IHomeViewModel extends ng.IScope
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