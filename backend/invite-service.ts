import { IInvite } from "./data-model.ts";
import { PersistenceService } from "./persistence-service.ts"

export class InviteService {

    private static instance: InviteService

    public static getInstance() {
        if (InviteService.instance === undefined) {
            InviteService.instance = new InviteService()
        }
        return InviteService.instance
    }

    private persistenceService: PersistenceService


    private constructor() { // private to ensure programmers adhere to singleton pattern for services
        this.persistenceService = PersistenceService.getInstance()
    }


    public getUITreeFormatFromInvites(invites: IInvite[]) {
        return {
            data: '0x9E972a43B3B8D68cD70930697E16429E47E88151',
            expanded: true,
            invitees: [
                { data: '0x4396A292512AA418087645B56a3a76333Bd10e28', expanded: true, invitees: [] }
            ]
        }
    }

    public async getInvites(): Promise<IInvite[]> {
        const invites = await this.persistenceService.readInvites()
        return invites
    }

    public async inviteWallet(invite: IInvite): Promise<void> {
        const invites = await this.persistenceService.readInvites()
        const potentiallyExistingEntryForInvitee = invites.filter((entry: IInvite) => { entry.invitee === invite.invitee.toLowerCase() })[0]

        if (potentiallyExistingEntryForInvitee === undefined) {
            invite.dateString = new Date().toUTCString()
            invites.push(invite)
            await this.persistenceService.writeInvites(invites)
        } else {
            throw new Error(`${invite.invitee} has already been invited.`)
        }
    }
}