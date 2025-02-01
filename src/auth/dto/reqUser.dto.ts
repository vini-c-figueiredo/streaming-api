import { ReqAuthDTO } from "./reqAuth.dto";

export interface AuthRequest extends Request {
    user: ReqAuthDTO
}