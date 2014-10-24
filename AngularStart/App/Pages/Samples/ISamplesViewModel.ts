module Pages
{
    export interface ISamplesViewModel extends ng.IScope
    {
        menuItems: Contracts.IMenuItem[];
        serverData: Contracts.IFirstName;

        message: string;

        getData(): void;
        getData2(): void;
    }
}