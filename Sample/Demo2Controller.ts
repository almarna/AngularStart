interface IDemo2Scope extends ng.IScope
{
    newContact: string;
    addContact(): void;
    contacts: string[];
}

class Demo2Controller
{
    private lastContact: string;

    constructor(private $scope: IDemo2Scope)
    {
        $scope.addContact = () => this.addcontactToList();
        $scope.contacts = ["bill.gates@gmail.com", "eric.schmidt@hotmail.com"];
    }

    private addcontactToList()
    {
        this.$scope.contacts.push(this.$scope.newContact);
        this.lastContact = this.$scope.newContact;

        this.$scope.newContact = "";

    }
}