import { opine, serveStatic, json } from 'https://deno.land/x/opine@2.3.3/mod.ts';
import { opineCors } from 'https://deno.land/x/cors/mod.ts';
import { PersistenceService } from './persistence-service.ts';
import { DonationsService } from './cult-donations-service.ts';
import { InviteService } from './invite-service.ts';
import { IPFSService } from './ipfs-service.ts';
import { SignatureService } from './signature-service.ts';
import { EthereumService } from './ethereum-service.ts';

const donationsService: DonationsService = DonationsService.getInstance()
const inviteService: InviteService = InviteService.getInstance()
const ipfsService: IPFSService = IPFSService.getInstance()
const ethereumService: EthereumService = EthereumService.getInstance()
const persistenceService: PersistenceService = PersistenceService.getInstance()
const app = opine();

app.use(json());

app.use(serveStatic(persistenceService.pathToIndexHTML));
app.use(serveStatic(persistenceService.pathToAssets));

app.use(opineCors());

app.use('/api/v1/addFile', validateSignatureMiddleware)
app.use('/api/v1/addFileFromForm', validateSignatureMiddleware)
app.use('/api/v1/addAsset', validateSignatureMiddleware)
app.use('/api/v1/inviteWallet', validateSignatureMiddleware)

async function validateSignatureMiddleware(req, res, next) {
	try {
		const signatureService =  SignatureService.getInstance()
		const publicWalletFromSignature =  await signatureService.getPublicWalletAddressFromSignature(req.body.signature)
		const invites = await inviteService.getInvites()
		const stringifiedInvites = JSON.stringify(invites)
		if (stringifiedInvites.indexOf(publicWalletFromSignature.toLowerCase()) === -1) {
			console.log(`I could not derive an invited wallet address from signature ${req.body.signature}.`)
		} else {
			next()
		}
	} catch (error) {
		console.log(`an error occurred while executing validateSignatureMiddleware: ${error.message}`)
	}
}

app.get('/', function (req, res) {
	console.log(`serving index html from ${PersistenceService.pathToIndexHTML}`);
	res.sendFile(`${persistenceService.pathToIndexHTML}/index.html`);
});

app.get('/api/v1/getAssets', async function (req, res) {
	const assets = await donationsService.getAssets()
	res.send(assets)
})

app.get('/api/v1/getInvites', async function (req, res) {
	const invites = await inviteService.getInvites()
	res.send(invites)
})

app.post('/api/v1/addAsset', async function (req, res) {
	await donationsService.addAsset(req.body)
	res.send("thank you")
})

app.post('/api/v1/inviteWallet', async function (req, res) {
	try {
		await inviteService.inviteWallet(req.body)
		res.send({ message: "Invite Registered Successfully. Thank You. " })
	} catch (error) {
		res.send({ message: error.message })
	}
})


// https://cultdonations.org:11443/api/v1/getText?cid=QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j
app.get('/api/v1/getText', async function (req, res) {
	try {
		const textFromIPFS = await ipfsService.getText(req.query.cid)
		res.send({ textFromIPFS })
	} catch (error) {
		res.send({ message: error.message })
	}
})

// https://cultdonations.org/api/v1/getImageDataURL?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
app.get('/api/v1/getImageDataURL', async function (req, res) {
	try {
		const reader = await ipfsService.getImageDataURL(req.query.cid)
		reader.onloadend = function () {
            res.send (reader.result)
        }
	} catch (error) {
		res.send({ message: error.message })
	}
})

app.post('/api/v1/addFile', async function (req, res) {
	try {
		await ipfsService.addFile(req.body.fileName, req.body.fileType, req.body.targetFileName)
		res.send({ message: "ok" })
	} catch (error) {
		res.send({ message: error.message })
	}

})

app.post('/api/v1/addFileFromForm', async function (req, res) {
	console.log("under construction")
	try {
		await ipfsService.addFileFromForm()
		res.send({ message: "ok" })
	} catch (error) {
		res.send({ message: error.message })
	}
})

if (Deno.args[0] === undefined) {
	console.log("please specify a port by giving a parameter like 3000")
} else {


	const port = Number(Deno.args[0]);

	if (Deno.args[0].indexOf(443) === -1) {

		app.listen(port, () => console.log(`server has started on http://localhost:${port} 🚀`));

	} else {

		const pathToCertFile = `${persistenceService.pathToCertificates}/fullchain.pem`
		const pathToKeyFile = `${persistenceService.pathToCertificates}/privkey.pem`

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

void donationsService.ensureSystemConsistency()