module Pages
{
    export interface ISamplesViewModel extends ng.IScope
    {
        personInfos: Contracts.IPersonInfo[];
        serverData: Contracts.IFirstName;

        message: string;

        getData(): void;
        getData2(): void;
    }
}