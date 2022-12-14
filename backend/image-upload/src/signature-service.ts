
// import Web3 from "web3"
const Web3 = require("web3")
require('dotenv').config()

export class SignatureService {

    private static instance: SignatureService
    
    public static getInstance() {
        if (SignatureService.instance === undefined) {
            SignatureService.instance = new SignatureService()
        }
        return SignatureService.instance
    }
    
    
    private providerURL: string
    private web3: any
    
    private constructor() { // private to ensure programmers adhere to singleton pattern for services
        this.providerURL = process.env.providerURL as string
        console.log(`creating web3 object from providerURL ${this.providerURL}`)
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.providerURL));
        console.log(`hmm`)
    }

    public async getPublicWalletAddressFromSignature(signature: string, description: string): Promise<string> {

        let dataThatWasSigned = `This signature ensures that only invited wallets can upload content, invite friends etc. in order to foster high quality content right from the start.`;
        dataThatWasSigned = `${dataThatWasSigned} Data: ${description}`

        const publicWalletAddress = await this.web3.eth.accounts.recover(
            dataThatWasSigned,
            signature
        );

        return publicWalletAddress
    }

}