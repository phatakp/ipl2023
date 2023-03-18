export interface IAPIGenericError {
    type: "validation_error" | "client_error" | "server_error";
    errors: IAPIError[];
}

export interface IAPIError {
    code: string;
    detail: string;
    attr: string;
}
