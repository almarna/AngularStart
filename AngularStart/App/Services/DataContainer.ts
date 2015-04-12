module Services
{
    export class DataContainer
    {
        constructor(private $http: ng.IHttpService)
        {
        }

        public GetPersons()
        {
            return [
                { FirstName: 'Willhelm', LastName: 'Tell', Address: 'Hut road 15', Zip: '123 45', City: 'Alpendorf' },
                { FirstName: 'Cinder', LastName: 'Ella', Address: 'Glass Mountain 42', Zip: '543 21', City: 'FairyTown' },
                { FirstName: 'Snow', LastName: 'White', Address: 'Castle road 1', Zip: '999 99', City: 'FairyTown' }
            ];
        }

        public GetServerData(): ng.IPromise<Contracts.IFirstName>
        {
            return this.$http.get('Api/data.txt').then((serverResponse) => { return serverResponse.data; });
        }

        public GetServerDataError(): ng.IPromise<Contracts.IFirstName>
        {
            return this.$http.get('Api/nonExistant.txt').then((serverResponse) => { return serverResponse.data; });
        }
    }
}