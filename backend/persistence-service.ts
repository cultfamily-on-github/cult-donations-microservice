import { IAsset, IInviteInfo } from "./data-model.ts";
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
    public readonly pathToCertificates = '/etc/letsencrypt/live/cultdonations.org';
    public readonly pathToLearn2EarnAssets = `${Deno.cwd()}/operational-data/assets.json`;
    public readonly pathToInvites = `${Deno.cwd()}/operational-data/invites.json`;

    private constructor() { } // private to adhere to singleton pattern
    
    public async readAssets(): Promise<IAsset[]> {
        const assets: IAsset[] = JSON.parse(await Deno.readTextFile(this.pathToLearn2EarnAssets))
        return assets
    }

    public async writeAssets(assets: IAsset[]): Promise<void> {
        this.updateDataAccordingToDataModelUpdate(assets) // only on demand
        await Deno.writeTextFile(this.pathToLearn2EarnAssets, JSON.stringify(assets))
    }

    public async readInvites(): Promise<any> {
        const invites: any = JSON.parse(await Deno.readTextFile(this.pathToInvites))
        return invites
    }

    public async writeInvites(invites: IInviteInfo): Promise<void> {
        await Deno.writeTextFile(this.pathToInvites, JSON.stringify(invites))
    }

    private updateDataAccordingToDataModelUpdate(assets: IAsset[]) {
        for (const asset of assets) {
            if (asset.ipfsContentIdentifierCID === undefined) {
                asset.ipfsContentIdentifierCID = "not-applicable-yet-for-external-links"
            }
        }
    }
}