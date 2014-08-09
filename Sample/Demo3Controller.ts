function SetupMappings(applicationName: string): void
{
    var application: ng.IModule = angular.module(applicationName, []);

    application.service('dataContainer', DataContainer);
}

interface IDemo3Scope extends ng.IScope
{
    newContact: string;
    addContact(): void;
    contacts: string[];
}

class Demo3Controller
{
    constructor(private $scope: IDemo3Scope, private dataContainer: DataContainer)
    {
        $scope.addContact = () => this.addcontactToList();
        $scope.contacts = dataContainer.GetContacts();
    }

    private addcontactToList()
    {
        this.$scope.contacts.push(this.$scope.newContact);
        this.$scope.newContact = "";
    }
}

class DataContainer
{
    public GetContacts(): string[]
    {
        return ["bill.gates@gmail.com", "eric.schmidt@hotmail.com"];
    }
}