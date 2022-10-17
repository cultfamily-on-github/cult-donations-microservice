import {IInviteInfo} from "../data-model.ts"
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
        let childByName = input.invitees.filter((entry: IInviteInfo) => entry.host === name)[0]
        if (childByName === undefined) {
            let index = 0
            while (input.invitees[index]) {
                childByName = this.getChildByName(name, input.invitees[index])
                index++
            }
        }
        return childByName
    }

    public addChildTo(hostName: string, host: IInviteInfo, child: IInviteInfo): IInviteInfo {
        // host.invitees.push(child)
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