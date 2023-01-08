import { User } from './../types';
import jwtDecode from 'jwt-decode';
import { Response, NextFunction } from 'express';
import { NewRequestType } from '../types/index';

const auth = (req: NewRequestType, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if(typeof req.headers["x-authorization"] === "string") {
        token = req.headers["x-authorization"].split(" ")[1];
    }

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwtDecode<User>(token);
        req.user = {
            pin: decoded.pin,
            expire: new Date(decoded.expire),
        };
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not' });
    }
};

export default auth;