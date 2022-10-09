import { ILearn2EarnAsset } from "./data-model.ts";
// import { SortService, Direction } from "https://deno.land/x/sort@v1.1.1/mod.ts"

export class PersistenceService {

    private static instance: PersistenceService

    public static getInstance() { 
        if (PersistenceService.instance === undefined) {
            PersistenceService.instance = new PersistenceService()
        }
        return PersistenceService.instance
    }
    public readonly pathToIndexHTML = `${Deno.cwd()}/docs`;
    public readonly pathToAssets = `${this.pathToIndexHTML}/assets`;
    public readonly pathToCertificates = '/etc/letsencrypt/live/cultplayground.org';
    public readonly pathToLearn2EarnAssets = `${Deno.cwd()}/operational-data/learn-2-earn-assets.json`;

    private constructor() { } // private to adhere to singleton pattern
    
    public async readLearnToEarnAssets(): Promise<ILearn2EarnAsset[]> {
        const gameProposals: ILearn2EarnAsset[] = JSON.parse(await Deno.readTextFile(this.pathToLearn2EarnAssets))
        return gameProposals
    }

    public async writeLearnToEarnAssets(learn2EarnAssets: ILearn2EarnAsset[]): Promise<void> {
        await Deno.writeTextFile(this.pathToLearn2EarnAssets, JSON.stringify(learn2EarnAssets))
    }

}