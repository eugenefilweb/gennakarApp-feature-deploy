

export class Utils {
    public static isUndefined(data){
        return typeof data === 'undefined';
    }

    public static isNull(value: any) {
        return value === null;
    }

    public static isNullOrUndefined(value: any) {
        return value === null || value === undefined;
    }

    public static isEmptyString(value: any) {
        return value === '';
    }

    public static isStringJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}