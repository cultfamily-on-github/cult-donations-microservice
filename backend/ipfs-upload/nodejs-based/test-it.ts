import * as IPFS from 'ipfs-core'

setTimeout(async() => {

    const ipfs = await IPFS.create()
    const { cid } = await ipfs.add('Hello world')
    console.info(cid)
}, 1000 * 1)
// QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf