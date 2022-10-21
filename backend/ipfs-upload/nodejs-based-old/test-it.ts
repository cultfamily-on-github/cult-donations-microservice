const IPFS = require('ipfs-mini');

const host = process.argv[2]
const port = process.argv[3]
const protocol = process.argv[4]

console.log("host:", host)
console.log("port:", port)
console.log("protocol:", protocol)

const ipfs = new IPFS({ host, port, protocol });

ipfs.add('hello world!').then(console.log).catch(console.log);

// result null 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j'

// ipfs.cat('QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j', (err: any, result: any) => {
//   console.log(err, result);
// });

// result null 'hello world!'

// ipfs.addJSON({ somevalue: 2, name: 'Nick' }, (err: any, result: any) => {
//   console.log(err, result);
// });

// result null 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j'

// ipfs.catJSON('QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j').then(console.log).catch(console.log);

// result null { somevalue: 2, name: 'Nick' }