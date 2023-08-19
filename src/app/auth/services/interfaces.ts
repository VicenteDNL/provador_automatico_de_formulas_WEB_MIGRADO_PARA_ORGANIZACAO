import { BaseResponse } from 'src/app/common/models/baseResponse.model';

export type Auth ={
    accessToken: string;
    tokenType: string;
    email: string;
};

export interface AuthResponse extends BaseResponse {
    data?: Auth;
}
