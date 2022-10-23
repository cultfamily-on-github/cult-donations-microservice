
import { SignatureService } from './signature-service';
import express from "express";
import https from "https";
import formidableMiddleware from "express-formidable";
import { PersistenceService } from './persistence-service';

getReady()

async function getReady() {
	const persistenceService: PersistenceService = PersistenceService.getInstance()
	const app = express();
	
	const uploadsFolder = `${__dirname}/../../operational-data/cult-uploads`
	
	app.use(express.json())
	
	
	app.use("/api/v1/uploadImage", validateSignatureMiddleware)
	app.use("/api/v1/uploadImage", formidableMiddleware({
		uploadDir: uploadsFolder,
		multiples: false,
		maxFileSize: 20 * 1024 * 1024, // 20 MB
	}));
	
	async function validateSignatureMiddleware(req: any, res: any, next: any) {
		let signature
		if (req.headers.signature !== undefined) {
			signature = req.headers.signature
		} else if (req.body.signature !== undefined) {
			signature = req.body.signature
		} else if (req.query.signature !== undefined) {
			signature = req.query.signature
		} else {
			throw new Error(`the route you would like to go requires a signature`)
		}
	
		try {
			const signatureService = SignatureService.getInstance()
			console.log(`validating signature: ${signature}`)
			const publicWalletFromSignature = await signatureService.getPublicWalletAddressFromSignature(signature)
			console.log(`publicWalletFromSignature: ${publicWalletFromSignature}`)
			const invites = await persistenceService.readInvites()
			console.log(`invites: ${JSON.stringify(invites)}`)
			
			const stringifiedInvites = JSON.stringify(invites)
			if (stringifiedInvites.indexOf(publicWalletFromSignature.toLowerCase()) === -1) {
				console.log(`I could not derive an invited wallet address from signature ${signature}.`)
			} else {
				console.log(`signature check successful`)
				next()
			}
		} catch (error) {
			console.log(`an error occurred while executing validateSignatureMiddleware: ${error}`)
		}
	}
	
	
	
	// http://localhost:8048/api/v1/getImage?name=image-2022-10-22T12:10:36.216Z
	app.get("/api/v1/getImage", (req, res) => {
		console.log(`sending image ${req.query.name}`)
		const htmlToBeSent = `<img src="http://localhost:8048/api/v1/getFile?name=${req.query.name}" />`
		console.log(htmlToBeSent)
		res.send(htmlToBeSent);
		// res.send(`<img src="https://www.w3schools.com/images/w3schools_green.jpg" />`);
	});
	
	// http://localhost:8048/api/v1/getFile?name=image-2022-10-22T12:10:36.216Z
	app.get("/api/v1/getFile", (req, res) => {
		console.log(`sending image ${req.query.name}`)
		// res.set({'Content-Type': 'image/png'});
		res.sendFile(`${uploadsFolder}/${req.query.name}`);
	});
	
	app.post('/api/v1/uploadImage', async function (req, res) {
		try {
			const newPath = `${uploadsFolder}/image-${new Date().toISOString()}`
			console.log(req.files)
			await persistenceService.move((req.files as any).image.path, newPath)
			res.send("upload successful")
		} catch (error) {
			console.log(`error during upload ${error}`)
		}
		console.log(`guten tag`)
	})
	
	if (process.argv[2] === undefined) {
		console.log("please specify a port by giving a parameter like 3000")
	} else {
	
	
		const port = Number(process.argv[2]);
	
		if (process.argv[2].indexOf("443") === -1) {
	
			app.listen(port, () => console.log(`server has started on http://localhost:${port} 🚀`));
	
		} else {
	
			const pathToCertFile = `${persistenceService.pathToCertificates}/fullchain.pem`
			const pathToKeyFile = `${persistenceService.pathToCertificates}/privkey.pem`
	
			console.log(`reading cert file from ${pathToCertFile}`);
			console.log(`reading key file from ${pathToKeyFile}`);
	
			const cert = await persistenceService.readTextFile(pathToCertFile) 
			const key = await persistenceService.readTextFile(pathToKeyFile) 
			// const cert = await Deno.readTextFile(pathToCertFile);
			// const key = await Deno.readTextFile(pathToKeyFile);
	
			console.log(cert.length);
			console.log(key.length);
	
			const options = {
				port,
				certFile: pathToCertFile,
				keyFile: pathToKeyFile
			};
	
			try {
				https.createServer({
					cert,
					key
				}, app).listen(port, () => {
					console.log(`server has started on https://localhost:${port} 🚀`);
				})
			} catch (error) {
				console.log(`shit happened: ${error}`);
			}
	
		}
	
	}
}
