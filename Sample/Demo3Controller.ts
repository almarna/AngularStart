function SetupMappings(applicationName: string): void
{
    var application: ng.IModule = angular.module(applicationName, []);

    application.service('dataContainer', DataContainer);
}

interface IDemo3Scope extends ng.IScope
{
    newContact: string;
    addContact(): void;
    addContactOldStyle(): void;
    addContactNoControllerStyle(): void;
    contacts: string[];
}

class Demo3Controller
{
    constructor(private $scope: IDemo3Scope, private dataContainer: DataContainer)
    {

        $scope.addContactOldStyle = () =>
        {
            $scope.contacts.push(this.$scope.newContact);
            $scope.newContact = "";
        }

        $scope.addContactNoControllerStyle = this.addContactNoControllerStyle;

        
        $scope.addContact = () => this.addcontactToList();

        $scope.contacts = dataContainer.GetContacts();
    }

    // *********************************************
    // Crazy <any> casts of 'this' are necessary
    // for TypeScript
    // The demo shows a bad effect of direct connect
    // of method. "this" is now the $scope
    // *********************************************
    private addContactNoControllerStyle()
    {
        (<any>this).contacts.push((<any>this).newContact);
        (<any>this).newContact = "";
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