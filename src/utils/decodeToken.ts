import jwtDecode from "jwt-decode";
import { NewRequestType, User } from "../types/index";

export default function decodeUser(token: string, req: NewRequestType): boolean{
    try {
        const decoded = jwtDecode<User>(token);
        req.user = {
            pin: decoded.pin,
            expire: new Date(decoded.expire),
        };

        return true;
    } catch (error) {
        return false;
    }
}