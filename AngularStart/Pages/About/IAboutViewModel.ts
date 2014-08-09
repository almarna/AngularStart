module Pages
{
    export interface IAboutViewModel extends ng.IScope
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