import jwt from "jsonwebtoken"

export class JWTService {

    private static instance: JWTService

    public static getInstance() { 
        if (JWTService.instance === undefined) {
            JWTService.instance = new JWTService()
        }
        return JWTService.instance
    }

    private constructor() {} // private to ensure programmers adhere to singleton pattern

    public getJWTFor(text: string, key: string): string {
        const token = jwt.sign({ foo: text }, key);
        return token
    }
}


const text = "some text"
const key = "tiptopsecretkey"

const jWTService = JWTService.getInstance()

const actualJWT = jWTService.getJWTFor(text, key)

console.log(actualJWT)