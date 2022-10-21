import { opine, serveStatic, json } from 'https://deno.land/x/opine@2.3.3/mod.ts';
import { opineCors } from 'https://deno.land/x/cors/mod.ts';
import { IPFS } from 'https://deno.land/x/ipfs/mod.ts'

const app = opine();
app.use(json());
app.use(opineCors());

const pathToCertificates = '/etc/letsencrypt/live/cultdonations.org';

app.get('/', function (req, res) {
	const cid = "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
	// res.send(`example get use case: http://cultdonations.org:11443/api/v1/getAsset?cid=${cid}`);
	res.send(`example get use case: http://localhost:8047/api/v1/getAsset?cid=${cid}`);
});

// https://cultdonations.org:11443/api/v1/getBlob?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getBlob', async function (req, res) {
	console.log(`delivering asset ${req.query.cid}`)
	// res.sendFile(await fetch(`http://127.0.0.1:8080/ipfs/${req.query.cid}`))
	let outside
	const fetchResponse = await fetch(`http://127.0.0.1:5001/ipfs/${req.query.cid}`)
	const images = await fetchResponse.blob()
	outside = URL.createObjectURL(images)
	console.log(outside)
	res.send(outside)
})
// https://cultdonations.org:11443/api/v1/getBlob2?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getBlob2', async function (req, res) {
	console.log(`delivering asset ${req.query.cid}`)
	// res.sendFile(await fetch(`http://127.0.0.1:8080/ipfs/${req.query.cid}`))
	let outside
	const fetchResponse = await fetch(`http://127.0.0.1:5001/ipfs/${req.query.cid}`)
	const images = await fetchResponse.blob()
	outside = URL.createObjectURL(images)
	console.log(outside)
	res.sendFile(outside)
})
// https://cultdonations.org:11443/api/v1/getBlob3?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getBlob3', async function (req, res) {
	console.log(`delivering asset ${req.query.cid}`)
	// res.sendFile(await fetch(`http://127.0.0.1:8080/ipfs/${req.query.cid}`))
	let outside
	const fetchResponse = await fetch(`http://127.0.0.1:5001/ipfs/${req.query.cid}`)
	const theBlob = await fetchResponse.blob()
	res.sendFile(theBlob)
})
// https://cultdonations.org:11443/api/v1/getBlob4?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getBlob4', async function (req, res) {
	console.log(`delivering asset ${req.query.cid}`)
	// res.sendFile(await fetch(`http://127.0.0.1:8080/ipfs/${req.query.cid}`))
	let outside
	const fetchResponse = await fetch(`http://127.0.0.1:5001/ipfs/${req.query.cid}`)
	const theBlob = await fetchResponse.blob()
	res.send(theBlob)
})

// https://cultdonations.org:11443/api/v1/getBlob5?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getBlob5', async function (req, res) {
	console.log(`getBlob from ${req.query.cid}`)
	const ipfs = new IPFS({})
	const response = await ipfs.cat(req.query.cid)
	const theBlob = await response.blob()
	console.log(theBlob)
	res.send(theBlob)
})

// https://cultdonations.org:11443/api/v1/getBlob6?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getBlob6', async function (req, res) {
	console.log(`getBlob from ${req.query.cid}`)
	const ipfs = new IPFS({})
})
// https://cultdonations.org:11443/api/v1/getBlob7?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getBlob7', async function (req, res) {
	console.log(`getBlob from ${req.query.cid}`)
	const ipfs = new IPFS({})
	const ipfsCATResponse = ipfs.cat(req.query.cid)
	let url
	for await (const file of ipfsCATResponse) {
	  let blob = new Blob([file], {type:"image/png"})
	  url = URL.createObjectURL(blob)
	}

	res.sendFile(url)
})
// https://cultdonations.org:11443/api/v1/getBlob8?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getBlob8', async function (req, res) {
	console.log(`getBlob from ${req.query.cid}`)
	const ipfs = new IPFS({})
	const ipfsCATResponse = await ipfs.cat(req.query.cid)
	let blob = new Blob([ipfsCATResponse], {type:"image/png"})
	let url
	url = URL.createObjectURL(blob)
	console.log(url)
	res.send(url)
})
// https://cultdonations.org:11443/api/v1/getBlob9?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getBlob9', async function (req, res) {
	console.log(`getBlob from ${req.query.cid}`)
	const ipfs = new IPFS({})
	const ipfsCATResponse = await ipfs.cat(req.query.cid)
	let blob = new Blob([ipfsCATResponse], {type:"image/png"})
	res.send(blob)
})

// https://cultdonations.org:11443/api/v1/getText?cid=QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j
app.get('/api/v1/getText', async function (req, res) {
	console.log(`getText from ${req.query.cid}`)
	const ipfs = new IPFS({})
	const response = await ipfs.cat(req.query.cid)
	const text = await response.text()
	console.log(text)
	res.send(text)
})

app.post('/api/v1/addFile', async function (req, res) {
	try {
		const ipfs = new IPFS({})
		const body = new FormData()
		let fileName = req.query.fileName
		let pathToFileToBeAdded = `${Deno.cwd()}/backend/ipfs-upload/deno-based/${fileName}`		
		let fileType = req.query.fileType || 'image/png'
		let targetFileName = req.query.targetFileName
		if (fileName === undefined) {
			pathToFileToBeAdded = `${Deno.cwd()}/backend/ipfs-upload/deno-based/simple.md`
			fileType = 'text/plain'
			targetFileName = 'simple.md'
		}
		console.log(`uploading ${pathToFileToBeAdded} to ipfs`)
		const file = await Deno.readFile(pathToFileToBeAdded)
		body.append('file', new Blob([file], { type: fileType }), targetFileName)
		const json = await ipfs.add(body)
		console.log(json)
		res.send("thank you")
	} catch (error) {
		res.send(error.message)
	}
})

if (Deno.args[0] === undefined) {
	console.log("please specify a port by giving a parameter like 3000")
} else {


	const port = Number(Deno.args[0]);

	if (Deno.args[0].indexOf(443) === -1) {

		app.listen(port, () => console.log(`server has started on http://localhost:${port} 🚀`));

	} else {

		const pathToCertFile = `${pathToCertificates}/fullchain.pem`
		const pathToKeyFile = `${pathToCertificates}/privkey.pem`

		console.log(`reading cert file from ${pathToCertFile}`);
		console.log(`reading key file from ${pathToKeyFile}`);

		const cert = await Deno.readTextFile(pathToCertFile);
		const key = await Deno.readTextFile(pathToKeyFile);

		console.log(cert.length);
		console.log(key.length);

		const options = {
			port,
			certFile: pathToCertFile,
			keyFile: pathToKeyFile
		};

		try {
			await app.listen(options);
			console.log(`server has started on https://localhost:${port} 🚀`);
		} catch (error) {
			console.log(`shit happened: ${error}`);
		}
	}

}

