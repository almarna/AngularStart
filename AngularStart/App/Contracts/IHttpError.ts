module Contracts
{
    export interface IHttpError
    {
        data: string;
        status: number;
        statusText: string;
    }
}