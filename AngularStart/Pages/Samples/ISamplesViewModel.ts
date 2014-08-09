module Pages
{
    export interface ISamplesViewModel extends ng.IScope
    {
        menuItems: any;
        serverData: any;

        message: string;

        getData(): void;
        getData2(): void;
    }
}