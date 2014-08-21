class Filters
{
    static Difference(indataUnparsed: any): string
    {
        var result: string = "";
        var indata: number = +indataUnparsed;

        if (indata < 0)
        {
            result = "" + indata.toFixed(1);
        }
        else if (indata > 0)
        {
            result = "+" + indata.toFixed(1);
        }

        return result;
    }
}