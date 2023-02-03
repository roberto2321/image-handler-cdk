const jwt = require('jsonwebtoken');

const privateKey: string = process.env.JWT_PRIVATE_KEY as string;

export class AuthorizationMiddleware {
    constructor() { }

    public async validateToken(token: string) {
        let decoded: any;
        try {
            decoded = jwt.verify(token, privateKey);

            return true;
        } catch (err) {
            return false;
        }
    }
}