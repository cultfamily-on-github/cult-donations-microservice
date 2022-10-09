export interface ILearn2EarnAsset {
    valueCreatorKey: string
    assetLinks: IAssetLink[]
}

export interface IAssetLink {
    url: string
    publicWalletAddress: string
    socialMediaHandle: string
}
