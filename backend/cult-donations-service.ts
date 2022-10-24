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

        for (const asset of assets) {
            // might be helpful on demand :)
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

    // public async rateAsset(voteInbound: IVoteInbound): Promise<number> {

    //     const apprenticeKeys = await this.persistenceService.readApprenticeKeysFile()
    //     const masterKeys = await this.persistenceService.readMasterKeysFile()
    //     const apprenticeKeysEntry: IApprenticeKeyFileEntry =
    //         apprenticeKeys.filter((m: IApprenticeKeyFileEntry) => m.apprenticeKey === voteInbound.fromKey)[0]
    //     let masterKeyFileEntry: IMasterkeyFileEntry = {} as IMasterkeyFileEntry
    //     if (apprenticeKeysEntry === undefined) {
    //         masterKeyFileEntry = masterKeys.filter((m: IMasterkeyFileEntry) => m.masterKey === voteInbound.fromKey)[0]
    //         if (masterKeyFileEntry === undefined) {
    //             const errorMessage = `the key ${voteInbound.fromKey} might be wrong.`
    //             console.log(errorMessage)
    //             throw new Error(errorMessage)
    //         }
    //     }

    //     const votes: IVote[] = await this.persistenceService.readVotes()
    //     const voteBy = (apprenticeKeysEntry === undefined) ? masterKeyFileEntry.socialMediaLink : apprenticeKeysEntry.socialMediaLink
    //     const existingVoteOnGameProposal = votes.filter((v: IVote) => v.id === voteInbound.id && v.voteBy === voteBy)[0]
    //     if (existingVoteOnGameProposal !== undefined) {
    //         throw new Error(`you have already voted on this proposal. you gave it a ${existingVoteOnGameProposal.rating} earlier.`)
    //     }

    //     console.log(`adding vote on game proposal ${JSON.stringify(voteInbound)}`)


    //     const vote: IVote = {
    //         id: voteInbound.id,
    //         votingDate: DateDoctor.getFormattedUTCDateFromDate(new Date()),
    //         rating: voteInbound.rating,
    //         voteBy
    //     }


    //     votes.unshift(vote)
    //     await this.persistenceService.writeVotes(votes)

    //     const newRatingOfProposal = await this.updateRatingInGameProposalWithAverageRank(voteInbound.id, votes)
    //     const allGamesRaw = await this.getGameProposals()
    //     const updatedFutureGames = await this.updateFutureGamesExpiryDatesAccordingToRating(allGamesRaw)
    //     const executedOrStartedGames = await this.getExecutedOrStartedGames()
    //     const allGames = executedOrStartedGames.concat(updatedFutureGames)

    //     //  console.log(allGames)
    //     // await PersistenceService.writeGameProposals(allGames)

    //     // const allGamesToBeStored: IGameProposal[] = this.sortGameProposalsByExpiryDate(allGames)

    //     await this.persistenceService.writeGameProposals(allGames)

    //     return newRatingOfProposal

    // }

}