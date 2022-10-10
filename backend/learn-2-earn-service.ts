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


    public async getLearn2EarnAssets(): Promise<ILearn2EarnAsset[]> {

        const learn2EarnAssets = await this.persistenceService.readLearnToEarnAssets()
        return learn2EarnAssets
        
    }
    
    public async addAsset(learn2EarnAsset: ILearn2EarnAsset): Promise<void> {
        
        // valueCreatorKey: string
        // assetLinks: IAssetLink[]
        
        // url: string
        // publicWalletAddress: string
        // socialMediaHandle: string
        
        console.log(`debug 1`)
        const learn2EarnAssets: ILearn2EarnAsset[] = await this.persistenceService.readLearnToEarnAssets()
        console.log(`debug 2`)
        
        const existingEntryForValueCreatorKey = 
        learn2EarnAsset.filter((entry: ILearn2EarnAsset) => entry.valueCreatorKey === learn2EarnAsset.valueCreatorKey)[0] 
        console.log(`debug 3`)
        
        if (existingEntryForValueCreatorKey === undefined) {
            console.log(`debug 4`)
            console.log(`adding a completely new entry from ${JSON.stringify(learn2EarnAsset)}`)
            learn2EarnAssets.push(learn2EarnAsset)
        } else {
            console.log(`debug 5`)
            console.log(`updating an existing entry from ${JSON.stringify(learn2EarnAsset)}`)
        }
        await this.persistenceService.writeLearnToEarnAssets(learn2EarnAssets)
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