export interface ILearn2EarnAsset {
    valueCreatorKey: string
    assetLinks: IAssetInfo[]
}

export interface IAssetInfo {
    assetURL: string
    previewURL: string
    publicWalletAddress: string
    linkToSocialMediaProfile: string
}
