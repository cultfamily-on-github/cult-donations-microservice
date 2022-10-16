import { PersistenceService } from "./persistence-service.ts"
import { WebHarvester } from "./web-harvester.ts"
import { ILearn2EarnAsset } from "./data-model.ts";
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
    private webHarvester: WebHarvester

    private constructor() { // constructor is private to adhere to singleton pattern
        this.persistenceService = PersistenceService.getInstance()
        this.webHarvester = new WebHarvester()
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
        
        const embedURL = await this.webHarvester.getEmbedURL(learn2EarnAsset.assetURL)

        learn2EarnAsset.previewURL = embedURL

        const learn2EarnAssets: ILearn2EarnAsset[] = await this.persistenceService.readLearnToEarnAssets()
        
        const existingEntryForsignature = 
        learn2EarnAssets.filter((entry: ILearn2EarnAsset) => entry.signature === learn2EarnAsset.signature)[0] 
        
        if (existingEntryForsignature === undefined) {
            console.log(`adding a completely new entry from ${JSON.stringify(learn2EarnAsset)}`)
            learn2EarnAssets.push(learn2EarnAsset)
        } else {
            throw new Error(`this seems to be a duplicate. the asset seems already available.`)
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