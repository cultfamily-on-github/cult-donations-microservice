import { IAsset } from "../data-model"
import { PersistenceService } from "./persistence-service"

export class AssetsService {

    private static instance: AssetsService

    public static getInstance() {
        if (AssetsService.instance === undefined) {
            AssetsService.instance = new AssetsService()
        }
        return AssetsService.instance
    }

    private persistenceService: PersistenceService

    private constructor() { // constructor is private to adhere to singleton pattern
        this.persistenceService = PersistenceService.getInstance()
    }

    public async addAsset(pathToImage: string, signature: string, description: string): Promise<void> {
        
        console.log("hi")
        const fileName = pathToImage.split("cult-uploads/")[1]
        console.log(fileName)

        const asset: IAsset = {
            signature,
            assetURL: "ipfs-cid-coming-soon",
            previewURL: `http://localhost:8047/api/v1/getFile?name=${fileName}`,
            donationsReceivedCULT: 0,
            donationsReceivedRVLT: 0,
            description,
            ipfsContentIdentifierCID: "IPFS CID Link Coming Soon "
        }

        console.log(`reading assets`)
        const assets: IAsset[] = await this.persistenceService.readAssets()
        
        console.log(`filter`)
        const existingEntryForsignature = 
        assets.filter((entry: IAsset) => entry.signature === asset.signature)[0] 
        
        console.log(`filter`)
        if (existingEntryForsignature === undefined) {
            console.log(`adding a new asset from ${JSON.stringify(asset)}`)
            assets.push(asset)
        } else {
            throw new Error(`this seems to be a duplicate. the asset seems already available.`)
        }
        await this.persistenceService.writeAssets(assets)
    }
}