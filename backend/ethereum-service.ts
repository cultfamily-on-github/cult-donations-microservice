export class EthereumService {

    private static instance: EthereumService

    public static getInstance() {
        if (EthereumService.instance === undefined) {
            EthereumService.instance = new EthereumService()
        }
        return EthereumService.instance
    }

    private constructor() { // private to ensure programmers adhere to singleton pattern for services
    }

    public isEthereumWalletAddress(address): boolean {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (
            /^(0x)?[0-9a-f]{40}$/.test(address) ||
            /^(0x)?[0-9A-F]{40}$/.test(address)
        ) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            throw new Error(
                `I guess it's fine toLowerCase the input as a client`
            );
        }
    }
}
