
import Web3 from "npm:web3"
import { readDotEnv } from './deps.ts';

export class SignatureService {

    private static instance: SignatureService

    public static getInstance() {
        if (SignatureService.instance === undefined) {
            SignatureService.instance = new SignatureService()
        }
        return SignatureService.instance
    }

    private web3 = new Web3(new Web3.providers.HttpProvider(readDotEnv().providerURL));

    private constructor() { // private to ensure programmers adhere to singleton pattern for services
    }

    public async getPublicWalletAddressFromSignature(signature: string, body: any): Promise<string> {

        let dataThatWasSigned = `This signature ensures that only invited wallets can upload content, invite friends etc. in order to foster high quality content right from the start.`;
        if (body.assetURL && body.description) {
            dataThatWasSigned = `${dataThatWasSigned} Data: ${body.assetURL} ${body.description}`
        } else if (body.host && body.invitees && body.invitees.length > 0) {
            dataThatWasSigned = `${dataThatWasSigned} Data: ${body.host} ${body.invitees[0].host}`
        }

        console.log(`yay: ${JSON.stringify(body)}`)

        const publicWalletAddress = await this.web3.eth.accounts.recover(
            dataThatWasSigned,
            signature
        );

        return publicWalletAddress
    }

}