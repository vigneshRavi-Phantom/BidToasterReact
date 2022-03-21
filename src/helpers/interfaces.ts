export type UserAccessType = "superadmin" | "admin" | "organization" | "vendor" | "buyer" | "vendor_buyer" | any;
export type USER_TYPE = "INIT" | "NOT_LOGGED_IN" | "LOGGED_IN" | "SUBSCRIBED";
export interface StringMap { [key: string]: any; }