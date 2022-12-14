import { PersistenceService } from "./persistence-service.ts"
import { WebHarvester } from "./web-harvester.ts"
import { IAsset } from "./data-model.ts";
// import { SortService, Direction, ISortOptions } from "https://deno.land/x/sort@v1.1.1/mod.ts"

export class DonationsService {

    private static instance: DonationsService

    public static getInstance() {
        if (DonationsService.instance === undefined) {
            DonationsService.instance = new DonationsService()
        }
        return DonationsService.instance
    }

    private persistenceService: PersistenceService
    private webHarvester: WebHarvester

    private constructor() { // constructor is private to adhere to singleton pattern
        this.persistenceService = PersistenceService.getInstance()
        this.webHarvester = new WebHarvester()
    }

    public async ensureSystemConsistency() {

        await this.sortAssets()
        await this.updateDataToFitNewDataModel()

    }

    private async updateDataToFitNewDataModel() {

        const assets = await this.persistenceService.readAssets()

        for (let asset of assets) {
            console.log("might be helpful on demand :)")
            if (asset.assetURL.indexOf("http://localhost:8047/") !== -1) {

                const part2 = asset.assetURL.split("http://localhost:8047/")[1]

                console.log("ok")
                asset.assetURL = `https://cultdonations.org:11443/${part2}`
                asset.previewURL = asset.assetURL
            }
        }

        await this.persistenceService.writeAssets(assets)
    }


    public async getAssets(): Promise<IAsset[]> {
        const assets = await this.persistenceService.readAssets()
        return assets   
    }
    
    

    public async addAsset(asset: IAsset): Promise<void> {
        
        if (asset.assetURL.indexOf("https://rumble.com") === 0) {
            const embedURL = await this.webHarvester.getEmbedURL(asset.assetURL)
            asset.previewURL = embedURL
        } else {
            asset.previewURL = await this.webHarvester.getOGImageURL(asset.assetURL)
        }

        console.log("we are here")
        asset.donationsReceivedCULT = 0
        asset.donationsReceivedRVLT = 0
        asset.ipfsContentIdentifierCID = "not-applicable-yet-for-external-links"
        
        const assets: IAsset[] = await this.persistenceService.readAssets()
        
        const existingEntryForsignature = 
        assets.filter((entry: IAsset) => entry.signature === asset.signature)[0] 
        
        if (existingEntryForsignature === undefined) {
            console.log(`adding a completely new entry from ${JSON.stringify(asset)}`)
            assets.push(asset)
        } else {
            throw new Error(`this seems to be a duplicate. the asset seems already available.`)
        }
        await this.persistenceService.writeAssets(assets)
    }


    public async sortAssets() {
        // const sortOptions: ISortOptions[] = [
        //     { fieldName: 'expiryDateUTC', direction: Direction.DESCENDING }
        // ]

        // const gameProposals = await PersistenceService.readGameProposals()
        // const sortedArray = SortService.sort(gameProposals, sortOptions)
        // await PersistenceService.writeGameProposals(sortedArray)
    }

}