module Pages
{
    export interface IHomeViewModel extends ng.IScope
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