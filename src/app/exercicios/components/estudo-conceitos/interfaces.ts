import { BaseResponse } from 'src/app/common/interfaces/baseResponse.model';

export type Response = BaseResponse;

export interface ConcluirEstudoConceitosInput {
  usuHash: string;
  exeHash: string;
}
