import { PersistenceService } from "./persistence-service.ts"
import { ILearn2EarnAsset, IAssetLink } from "./data-model.ts";
// import { SortService, Direction, ISortOptions } from "https://deno.land/x/sort@v1.1.1/mod.ts"

export class Learn2EarnService {

    private static instance: Learn2EarnService

    public static getInstance() { 
        if (Learn2EarnService.instance === undefined) {
            Learn2EarnService.instance = new Learn2EarnService()
        }
        return Learn2EarnService.instance
    }

    private persistenceService: PersistenceService
    
    private constructor() { // private to adhere to singleton pattern
        this.persistenceService = PersistenceService.getInstance()
    } 

    public async ensureSystemConsistency() {

        await this.sortLearn2EarnAssets()
        await this.updateDataToFitNewDataModel()

    }

    private async updateDataToFitNewDataModel() {

        const learn2EarnAssets = await this.persistenceService.readLearnToEarnAssets()

        for (const learn2EarnAsset of learn2EarnAssets) {
            // might be helpful on demand :)
        }

        await this.persistenceService.writeLearnToEarnAssets(learn2EarnAssets)
    }


    public async addAssetLink(learn2EarnAsset: ILearn2EarnAsset): Promise<void> {

            // valueCreatorKey: string
            // assetLinks: IAssetLink[]
        
            // url: string
            // publicWalletAddress: string
            // socialMediaHandle: string
        
        console.log(`adding learn 2 earn asset ${JSON.stringify(learn2EarnAsset)}`)

    }


    public async sortLearn2EarnAssets() {
        // const sortOptions: ISortOptions[] = [
        //     { fieldName: 'expiryDateUTC', direction: Direction.DESCENDING }
        // ]

        // const gameProposals = await PersistenceService.readGameProposals()
        // const sortedArray = SortService.sort(gameProposals, sortOptions)
        // await PersistenceService.writeGameProposals(sortedArray)
    }

}