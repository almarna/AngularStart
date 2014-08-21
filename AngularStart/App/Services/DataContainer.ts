module Services
{
    export class DataContainer
    {
        constructor(private $http: ng.IHttpService)
        {
        }

        public GetMenu(): any
        {
            return [
                { link: '#/home', text: 'Home' },
                { link: '#/samples', text: 'Samples' },
                { link: '#/ui', text: 'Ui Bootstrap' },
                { link: '#/links', text: 'Links' },
                { link: '#/about', text: 'About' }
            ];
        }


        public GetServerData(): ng.IPromise<any>
        {
            return this.$http.get('Api/data.txt').then((serverResponse) => { return serverResponse.data; });
        }

        public GetServerDataError(): ng.IPromise<any>
        {
            return this.$http.get('Api/nonExistant.txt').then((serverResponse) => { return serverResponse.data; });
        }
    }
}