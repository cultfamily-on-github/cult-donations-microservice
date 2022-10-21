import { opine, serveStatic, json } from 'https://deno.land/x/opine@2.3.3/mod.ts';
import { opineCors } from 'https://deno.land/x/cors/mod.ts';


const app = opine();
app.use(json());
app.use(opineCors());

const pathToCertificates = '/etc/letsencrypt/live/cultdonations.org';

app.get('/', function (req, res) {
	const cid = "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
	// res.send(`example get use case: http://cultdonations.org:11443/api/v1/getAsset?cid=${cid}`);
	res.send(`example get use case: http://localhost:8047/api/v1/getAsset?cid=${cid}`);
});

app.get('/api/v1/getAsset', async function (req, res) {
	console.log(`delivering asset ${req.query.cid}`)
	res.send("coming")
})

app.get('/api/v1/getFile', async function (req, res) {
	console.log(`delivering asset ${req.query.cid}`)
	res.sendFile(await fetch(`http://127.0.0.1:8080/ipfs/${req.query.cid}`))
})

// http://cultdonations.org:11443/api/v1/getData?cid=QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j
app.get('/api/v1/getData', async function (req, res) {
	console.log(`delivering asset ${req.query.cid}`)
	res.send(await fetch(`http://127.0.0.1:8080/ipfs/${req.query.cid}`))
})
// https://cultdonations.org:11443/api/v1/getData2?cid=QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j
app.get('/api/v1/getData2', async function (req, res) {
	console.log(`delivering asset ${req.query.cid}`)
	res.send(await fetch(`http://127.0.0.1:5001/ipfs/${req.query.cid}`))
})

app.post('/api/v1/addAsset', async function (req, res) {
	try {

		const response = await fetch(`http://127.0.0.1:5001/api/v0/files/write?arg=a-team.png`, {
			method: "post",
			headers: {
				// Accept: "application/json",
				// "Content-Type": "application/json",
			},

			body: undefined,
		})
		console.log(response)
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

