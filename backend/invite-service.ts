import { IInviteInfo } from "./data-model.ts";
import { PersistenceService } from "./persistence-service.ts"
import { Parser } from "./parser/parser.ts"
import Web3 from "npm:web3"
// import ethers from "npm:ethers"
// import ethJsUtil from "npm:ethereumjs-util"
import { readDotEnv } from './deps.ts';

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
    private web3 = new Web3(new Web3.providers.HttpProvider(readDotEnv().providerURL));

    private constructor() { // private to ensure programmers adhere to singleton pattern for services
        this.persistenceService = PersistenceService.getInstance()
        this.parser = Parser.getInstance()
    }



    public async getInvites(): Promise<IInviteInfo> {
        const invites = await this.persistenceService.readInvites()
        return invites
    }

    public async inviteWallet(inviteInfo: IInviteInfo): Promise<void> {

        try {
            let inviteInfoPersistence = await this.persistenceService.readInvites()
            if (inviteInfoPersistence.host === undefined) {
                inviteInfoPersistence = inviteInfo
            } else {
                console.log(`add ${JSON.stringify(inviteInfo.invitees[0])} to \n\n${JSON.stringify(inviteInfoPersistence)}`)
                inviteInfoPersistence = this.parser.addChildTo(inviteInfo.host, inviteInfoPersistence, inviteInfo.signature, inviteInfo.invitees[0])
            }

            const walletAddressFromSignature = await this.getPublicWalletAddressFromSignature(inviteInfo.signature)

            if (walletAddressFromSignature === inviteInfo.host) {
                console.log(`writing invitation`)
                await this.persistenceService.writeInvites(inviteInfoPersistence)
            } else {
                console.log(walletAddressFromSignature, "vs.", inviteInfo.host)
            }
        } catch (error) {
            console.log(`error while storing ${JSON.stringify(inviteInfo)}: ${error.message}`)
        }


    }


    public async getPublicWalletAddressFromSignature(signature: string): Promise<string> {

        const dataThatWasSigned = "This signature is used to validate that you are the owner of this wallet.";

        const publicWalletAddress = await this.web3.eth.accounts.recover(
            dataThatWasSigned,
            signature
        );

        return publicWalletAddress
    }

}