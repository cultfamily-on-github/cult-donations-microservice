import { opine, serveStatic, json } from 'https://deno.land/x/opine@2.3.3/mod.ts';
import { opineCors } from 'https://deno.land/x/cors/mod.ts';
import { PersistenceService } from './persistence-service.ts';
import { Learn2EarnService } from './learn-2-earn-service.ts';
import { InviteService } from './invite-service.ts';


const learn2EarnService: Learn2EarnService = Learn2EarnService.getInstance()
const inviteService: InviteService = InviteService.getInstance()
const persistenceService: PersistenceService = PersistenceService.getInstance()
const app = opine();

app.use(json());

app.use(serveStatic(persistenceService.pathToIndexHTML));
app.use(serveStatic(persistenceService.pathToAssets));

app.use(opineCors());


app.get('/', function (req, res) {
	console.log(`serving index html from ${PersistenceService.pathToIndexHTML}`);
	res.sendFile(`${persistenceService.pathToIndexHTML}/index.html`);
});

app.get('/api/v1/getLearn2EarnAssets', async function (req, res) {
 	const learn2EarnAssets = await learn2EarnService.getLearn2EarnAssets()
	res.send(learn2EarnAssets)
})

app.get('/api/v1/getInvites', async function (req, res) {
 	const invites = await inviteService.getInvites()
	res.send(invites)
})

app.get('/api/v1/getInvitesFormatted', async function (req, res) {
 	const invites = await inviteService.getInvites()

	const formattedForUITree = inviteService.getUITreeFormatFromInvites(invites)

	res.send(formattedForUITree)
})

app.post('/api/v1/addAsset', async function (req, res) {
	await learn2EarnService.addAsset(req.body)
	res.send("thank you")
})

app.post('/api/v1/inviteWallet', async function (req, res) {
	await inviteService.inviteWallet(req.body)
	res.send("thank you")
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

void learn2EarnService.ensureSystemConsistency()