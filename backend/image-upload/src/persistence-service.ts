import { IAsset } from "../../data-model";

const fse = require('fs-extra');
const path = require('path');


// import { SortService, Direction } from "https://deno.land/x/sort@v1.1.1/mod.ts"

export class PersistenceService {

    private static instance: PersistenceService

    public static getInstance() { 
        if (PersistenceService.instance === undefined) {
            PersistenceService.instance = new PersistenceService()
        }
        return PersistenceService.instance
    }
    public readonly pathToCertificates = '/etc/letsencrypt/live/cultdonations-org';
    public readonly pathToInvites = `${__dirname}/../../../operational-data/invites.json`;
    public readonly pathToLearn2EarnAssets = `${__dirname}/../../../operational-data/assets.json`;

    private constructor() { } // private to adhere to singleton pattern
    
    public async readInvites(): Promise<any> {
        console.log(`reading invites from ${this.pathToInvites}`)
        const invites: any = await fse.readJsonSync(this.pathToInvites)
        return invites
    }

    public async readAssets(): Promise<IAsset[]> {
        const assets: IAsset[] = await fse.readJSONSync(this.pathToLearn2EarnAssets)
        return assets
    }

    public async writeAssets(assets: IAsset[]): Promise<void> {
        await fse.writeJSONSync(this.pathToLearn2EarnAssets, assets)
    }

    public async readTextFile(path: string): Promise<any> {
        const fileExists = await (path as any).exists(path)
        console.log(`this is wild: ${path} ${fileExists}`)
        let textFile = await fse.readFile(path, "utf-8")
        if (textFile === undefined) {
            console.log(`what for?`)
            textFile = (await fse.readFile(path)).toString()
        }
    }

    public async readFileNames(path: string): Promise<any> {
        return fse.readdir(path)
    }

    public async move(from:string, to:string) {
        await fse.move(from, to)
    }

}