import { IPFS } from 'https://deno.land/x/ipfs/mod.ts'

const ipfs = new IPFS({})

const body = new FormData()

const file = await Deno.readFile('simple.md')

body.append('file', new Blob([file], { type: 'text/plain' }), 'simple.md')

const json = await ipfs.add(body)

console.log(json)