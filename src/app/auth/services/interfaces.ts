import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';

export type Auth = {
  accessToken: string;
  tokenType: string;
  email: string;
};

export interface AuthResponse extends BaseResponse {
  data?: Auth;
}
