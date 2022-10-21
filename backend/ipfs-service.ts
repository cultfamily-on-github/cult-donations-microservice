
import { IPFS } from 'https://deno.land/x/ipfs/mod.ts'

export class IPFSService {

    private static instance: IPFSService

    public static getInstance() {
        if (IPFSService.instance === undefined) {
            IPFSService.instance = new IPFSService()
        }
        return IPFSService.instance
    }

    private constructor() { // private to ensure programmers adhere to singleton pattern for services
    }

    public async getText(cid: string): Promise<string> {
        console.log(`getting Text from ${cid}`)
        const ipfs = new IPFS({})
        const response = await ipfs.cat(cid)
        const text = await response.text()
        return text
    }
    
    public async getList(cid: string): Promise<any> {
        console.log(`getting List`)
        const ipfs = new IPFS({})
        const response = await ipfs.ls(cid)
        // const text = await response.text()
        return response
    }

    public async getImageDataURL(cid: string) {
        console.log(`delivering ImageDataURL ${cid}`)
        const ipfs = new IPFS({})
        const response = await ipfs.cat(cid)
        const blob = await response.blob()
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return reader
    }

    public async addFile(fileName: string, fileType: string, targetFileName: string) {
        const ipfs = new IPFS({})
        const body = new FormData()
        let pathToFileToBeAdded = `${Deno.cwd()}/backend/ipfs-upload/deno-based/${fileName}`

        console.log(`uploading ${pathToFileToBeAdded} to ipfs`)
        const file = await Deno.readFile(pathToFileToBeAdded)
        body.append('file', new Blob([file], { type: fileType }), targetFileName)
        const fileInfo = await ipfs.add(body)
        console.log(fileInfo)
    }

    public async addFileFromForm(fileName: string, fileType: string = 'image/png', targetFileName) {
		const ipfs = new IPFS({})
		const body = new FormData()
		// body.append('file', new Blob([file], { type: fileType }), targetFileName)
		const fileInfo = await ipfs.add(body)
		console.log(fileInfo)
    }
}