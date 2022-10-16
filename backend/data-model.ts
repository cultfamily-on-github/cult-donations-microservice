export interface ILearn2EarnAsset {
    signature: string
    assetInfo: IAssetInfo[]
}

export interface IAssetInfo {
    assetURL: string
    previewURL: string
    description: string
}
