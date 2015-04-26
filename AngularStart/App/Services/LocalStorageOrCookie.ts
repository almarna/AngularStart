
class LocalStorageOrCookie
{
    public localStorageSupported: boolean;

    constructor()
    {
        this.localStorageSupported = (typeof localStorage != "undefined" && localStorage !== null);
    }

    public Delete(key: string): void
    {
        if (this.localStorageSupported)
        { // Native support
            localStorage.removeItem(key);
        } else
        { // Use Cookie
            this.createCookie(key, null, -1);
        }
    }

     public Set(key: string, value: string): void
    {
        if (this.localStorageSupported)
        { // Native support
            localStorage.setItem(key, value);
        } else
        { // Use Cookie
            this.createCookie(key, value, 30);
        }
    }

    private createCookie(key: string, value: string, expires: number)
    {
        var date: Date = new Date();
        date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
        var expiresStr: string = "; expires=" + date.toUTCString();
        document.cookie = key + "=" + encodeURIComponent(value) + expiresStr + "; path=/";
    }

    public Get(key: string): string
    {
        if (this.localStorageSupported)
        { // Native support
            return localStorage.getItem(key);
        } else
        { // Use Cookie
            return this.readCookie(key);
        }
    }

    private readCookie(key)
    {
        var cookies: string = document.cookie;
        var startPos: number = cookies.indexOf(" " + key + "=");
        if (startPos == -1)
        {
            startPos = cookies.indexOf(key + "=");
        }

        if (startPos < 0)
        {
            return null;
        }

        var valueStartPos: number = cookies.indexOf("=", startPos) + 1;
        var valueEndPos: number = cookies.indexOf(";", valueStartPos);

        if (valueEndPos == -1)
        {
            valueEndPos = cookies.length;
        }

        return decodeURIComponent(cookies.substring(valueStartPos, valueEndPos));
    }
}
