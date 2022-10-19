import { IInviteInfo } from "../data-model.ts"
export class Parser {

    private static instance: Parser

    public static getInstance() {
        if (Parser.instance === undefined) {
            Parser.instance = new Parser()
        }
        return Parser.instance
    }

    private constructor() { // private to ensure programmers adhere to singleton pattern for services
    }

    public getChildren(input: IInviteInfo): IInviteInfo[] {
        return input.invitees
    }

    public getChildByName(name: string, input: IInviteInfo): IInviteInfo {
        let index = 0
        let childByName = input.invitees.filter((entry: IInviteInfo) => entry.host === name)[0]

        if (childByName === undefined) {
            while (input.invitees.length > 0 && input.invitees[index] !== undefined) {
                childByName = this.getChildByName(name, input.invitees[index])
                if (childByName !== undefined) {
                    return childByName
                }
                index++
            }
            index = 0
            while (input.invitees[index]) {
                childByName = this.getChildByName(name, input.invitees[index])
                index++
            }
            index++
        }
        return childByName
    }

    public addChildTo(hostName: string, input: IInviteInfo, signature: string, child: IInviteInfo): IInviteInfo {
        if (this.isAlreadyPresent(child.host, input)) {
            throw new Error(`${child.host} is already present`)
        }
        const pregnantHost = (hostName === input.host) ? input : this.getChildByName(hostName, input)
        if (pregnantHost === undefined) {
            console.log(`hmm: ${hostName} not found in ${JSON.stringify(input)}`)
        }
        this.addChild(pregnantHost, signature, child)
        
        return input
    }

    private addChild(host: IInviteInfo, signature: string, child: IInviteInfo): IInviteInfo {
        host.invitees.push(child)
        host.signature = signature
        return host
    }

    private isAlreadyPresent(childName: string, input: IInviteInfo): boolean {
            const existingEntry = this.getChildByName(childName, input)
            if (existingEntry !== undefined) {
                return true
            }
        return false
    }
}