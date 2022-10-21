import { IPFS } from 'https://deno.land/x/ipfs/mod.ts'

const ipfs = new IPFS({})

const res = await ipfs.cat('QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx')

console.log(await res.text()) // hello worlds