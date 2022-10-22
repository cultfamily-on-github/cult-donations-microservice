<script>
    import { backendBaseURL } from "src/stores";


    export let web3;
    export let publicWalletAddress;
    const uploadFile = async () => {
        let infoMessageToBeSigned =
            "This signature is used to validate that you are the owner of this wallet.";

        let signature = "";

        // alert(publicWalletAddress);
        try {
            signature = await web3.eth.sign(
                web3.utils.toHex(infoMessageToBeSigned),
                publicWalletAddress
            );
        } catch (error) {
            console.log(error);
        }

        console.log(signature);

        const formData = new FormData()

        const uploadFileURL = `${backendBaseURL}/api/v1/uploadImage`
        const response = await fetch(uploadFileURL, {
            body: formData,
            method: "POST",
        });
    };
</script>

<p><br /></p>
<input type="file" name="file1" multiple /><br />
<input type="submit" value="Submit" on:click={uploadFile} />

<!-- <form
    id="yourFormId"
    enctype="multipart/form-data"
    action="/api/v1/uploadImage?signature=123"
    method="post"
>
    <input type="file" name="file1" multiple /><br />
    <input type="submit" value="Submit" />
</form> -->
