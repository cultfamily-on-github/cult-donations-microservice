// // https://cultdonations.org:11443/api/v1/getArrayBuffer?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
// app.get('/api/v1/getArrayBuffer', async function (req, res) {
// 	console.log(`delivering Image ${req.query.cid}`)
// 	const ipfs = new IPFS({})
// 	const response = await ipfs.cat(req.query.cid)
// 	const blob = await response.blob()
// 	const reader = new FileReader();
// 	reader.readAsArrayBuffer(blob);
// 	reader.onloadend = function () {
// 		res.send(reader.result)
// 	}
// })
// // https://cultdonations.org:11443/api/v1/getBinaryString?cid=QmdtkARoTA9h3Uqaf3ZAdEq1LrBUaXXfPLP2KKEm2zLWBT
// app.get('/api/v1/getBinaryString', async function (req, res) {
// 	console.log(`delivering Image ${req.query.cid}`)
// 	const ipfs = new IPFS({})
// 	const response = await ipfs.cat(req.query.cid)
// 	const blob = await response.blob()
// 	const reader = new FileReader();
// 	reader.readAsBinaryString(blob);
// 	reader.onloadend = function () {
// 		res.send(reader.result)
// 	}
// })

// const blobToImage = async (blob: any) => {
// 	return new Promise(resolve => {
// 		const url = URL.createObjectURL(blob)
// 		let img = new Image()
// 		img.onload = () => {
// 			URL.revokeObjectURL(url)
// 			resolve(img)
// 		}
// 		img.src = url
// 	})
// }