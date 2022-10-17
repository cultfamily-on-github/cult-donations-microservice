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
            while (input.invitees.length > 0) {
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

    public addChildTo(hostName: string, host: IInviteInfo, child: IInviteInfo): IInviteInfo {
        const pregnantHost = this.getChildByName(hostName, host)
        if (pregnantHost === undefined) {
            console.log(`hmm: ${hostName} not found in ${JSON.stringify(host)}`)
        }
        this.addChild(pregnantHost, child)

        return host
    }

    public addChild(host: IInviteInfo, child: IInviteInfo): IInviteInfo {
        host.invitees.push(child)
        return host
    }

    public getFirstChild(input: IInviteInfo): IInviteInfo {
        return input.invitees[0]
    }
}