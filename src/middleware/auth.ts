import { User } from './../types';
import jwtDecode from 'jwt-decode';
import { Response, NextFunction } from 'express';
import { NewRequestType } from '../types/index';
import decodeUser from '../utils/decodeToken';

const auth = (req: NewRequestType, res: Response, next: NextFunction) => {
    let token: string | undefined;

    const { token: queryToken } = req.query;
    
    if(queryToken) {
        token = queryToken as string;
    }


    if(typeof req.headers["x-authorization"] === "string") {
        token = req.headers["x-authorization"].split(" ")[1];
    }

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        let userAuth = decodeUser(token, req)
        if(!userAuth) return res.status(400).json({ msg: 'Token is not' });
        next();
    } catch (e) {
        return res.status(400).json({ msg: 'Token is not' });
    }
};

export default auth;