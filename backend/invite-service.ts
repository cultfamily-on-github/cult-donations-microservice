import { IInviteInfo } from "./data-model.ts";
import { PersistenceService } from "./persistence-service.ts"
import { Parser } from "./parser/parser.ts"
import { SignatureService } from "./signature-service.ts";

export class InviteService {

    private static instance: InviteService

    public static getInstance() {
        if (InviteService.instance === undefined) {
            InviteService.instance = new InviteService()
        }
        return InviteService.instance
    }

    private persistenceService: PersistenceService
    private parser: Parser

    private constructor() { // private to ensure programmers adhere to singleton pattern for services
        this.persistenceService = PersistenceService.getInstance()
        this.parser = Parser.getInstance(5)
    }



    public async getInvites(): Promise<IInviteInfo> {
        const invites = await this.persistenceService.readInvites()
        return invites
    }

    public async inviteWallet(inviteInfo: IInviteInfo): Promise<void> {

        let inviteInfoPersistence = await this.persistenceService.readInvites()

        inviteInfo.host = inviteInfo.host.toLowerCase()
        inviteInfo.invitees[0].host = inviteInfo.invitees[0].host.toLowerCase()

        if (inviteInfoPersistence.host === undefined) {
            inviteInfoPersistence = inviteInfo
        } else {
            console.log(`add ${JSON.stringify(inviteInfo.invitees[0])} to \n\n${JSON.stringify(inviteInfoPersistence)}`)
            inviteInfoPersistence =
                this.parser.addChildTo(inviteInfo.host.toLowerCase(), inviteInfoPersistence, inviteInfo.signature, inviteInfo.invitees[0])
        }

        console.log(`writing invitation`)
        await this.persistenceService.writeInvites(inviteInfoPersistence)
    }

}