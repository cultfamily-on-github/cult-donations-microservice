
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

    public async getPublicWalletAddressFromSignature(signature: string): Promise<string> {

        const dataThatWasSigned = "This signature is used to validate that you are the owner of this wallet.";

        const publicWalletAddress = await this.web3.eth.accounts.recover(
            dataThatWasSigned,
            signature
        );

        return publicWalletAddress
    }

}