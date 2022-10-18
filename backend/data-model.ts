
export interface ILearn2EarnAsset {
    signature: string
    assetURL: string
    previewURL: string
    description: string
}

export interface IInvite {
    signature: string
    invitee: string
    dateString: string
}

export interface IInviteBaseStructure {
    data: string,
    expanded: boolean,
    invitees: any[]
}

export interface IInviteInfo {
    host: string
    signature: string
    invitees: any[]
}