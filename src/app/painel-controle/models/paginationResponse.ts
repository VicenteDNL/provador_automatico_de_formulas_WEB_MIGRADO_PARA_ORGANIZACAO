/* eslint-disable @typescript-eslint/naming-convention */
export type PaginationResponse<T> ={
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string |null;
    to: number;
    total: number;
    data: T
     ;

};
