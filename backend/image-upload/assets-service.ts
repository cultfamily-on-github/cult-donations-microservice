import { IAsset } from "../data-model"
import { PersistenceService } from "../persistence-service"

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
        
        const asset: IAsset = {
            signature,
            assetURL: pathToImage,
            previewURL: pathToImage,
            donationsReceivedCULT: 0,
            donationsReceivedRVLT: 0,
            description
        }

        const assets: IAsset[] = await this.persistenceService.readAssets()
        
        const existingEntryForsignature = 
            assets.filter((entry: IAsset) => entry.signature === asset.signature)[0] 
        
        if (existingEntryForsignature === undefined) {
            console.log(`adding a new asset from ${JSON.stringify(asset)}`)
            assets.push(asset)
        } else {
            throw new Error(`this seems to be a duplicate. the asset seems already available.`)
        }
        await this.persistenceService.writeAssets(assets)
    }
}