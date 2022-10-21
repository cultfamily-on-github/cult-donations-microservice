import { opine, serveStatic, json } from 'https://deno.land/x/opine@2.3.3/mod.ts';
import { opineCors } from 'https://deno.land/x/cors/mod.ts';
import { IPFS } from 'https://deno.land/x/ipfs/mod.ts'
import request from 'npm:request';


const app = opine();
app.use(json());
app.use(opineCors());

const pathToCertificates = '/etc/letsencrypt/live/cultdonations.org';

app.get('/', function (req, res) {
	const cid = "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
	// res.send(`example get use case: http://cultdonations.org:11443/api/v1/getAsset?cid=${cid}`);
	res.send(`example get use case: http://localhost:8047/api/v1/getAsset?cid=${cid}`);
});

// https://cultdonations.org:11443/api/v1/getImage?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getImage', async function (req, res) {
	console.log(`delivering Image ${req.query.cid}`)
	const ipfs = new IPFS({})
	const response = await ipfs.cat(req.query.cid)
	const blob = await response.blob()
	const reader = new FileReader();
	reader.readAsDataURL(blob);
	reader.onloadend = function () {
		// result includes identifier 'data:image/png;base64,' plus the base64 data
		const mySrc = reader.result;
		// res.send(mySrc)

		request({
			url: mySrc,
			encoding: null
		},
			(err, resp, buffer) => {
				if (!err && resp.statusCode === 200) {
					res.set("Content-Type", "image/png");
					res.send(resp.body);
				} else {
					res.send(`${err} - ${resp.statusCode}`)
				}
			});
	}

})
// https://cultdonations.org:11443/api/v1/getImage2?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getImage2', async function (req, res) {
	console.log(`delivering Image ${req.query.cid}`)
	res.setHeader("content-disposition", "attachment; filename=waking-up-checking-my-cult.png");
    request('http://google.com/images/srpr/logo11w.png').pipe(res);
})

// https://cultdonations.org:11443/api/v1/getImage3?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getImage3', async function (req, res) {
	console.log(`delivering Image ${req.query.cid}`)
	res.setHeader("content-disposition", "attachment; filename=waking-up-checking-my-cult.png");
    request(`http://127.0.0.1:8080/ipfs/${req.query.cid}`).pipe(res);
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
		const fileInfo = await ipfs.add(body)
		console.log(fileInfo)
		res.send(`thank you for adding: ${fileInfo}`)
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

const blobToImage = async (blob: any) => {
	return new Promise(resolve => {
		const url = URL.createObjectURL(blob)
		let img = new Image()
		img.onload = () => {
			URL.revokeObjectURL(url)
			resolve(img)
		}
		img.src = url
	})
}