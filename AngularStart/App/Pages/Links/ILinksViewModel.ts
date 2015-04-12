module Pages
{
    export interface ILinksViewModel extends ng.IScope
    {
        loginUserName: string;
        loginPassword: string;
        message: string;
        loginSaveCookie: boolean;
        showView: string;
        viewTypes: any;

        onLogin();
    }
}