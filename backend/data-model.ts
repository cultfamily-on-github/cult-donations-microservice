
export interface IAsset {
    signature: string
    assetURL: string
    previewURL: string
    donationsReceivedCULT: number
    donationsReceivedRVLT: number
    description: string
    ipfsContentIdentifierCID: string
}

// export interface IInvite {
//     signature: string
//     invitee: string
//     dateString: string
// }

// export interface IInviteBaseStructure {
//     data: string,
//     expanded: boolean,
//     invitees: any[]
// }

export interface IInviteInfo {
    host: string
    inviteValidatedViaSignature: string
    invitees: IInviteInfo[]
}