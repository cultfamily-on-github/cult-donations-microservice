<script>
    import { getInfoMessageToBeSigned } from "src/helpers";
    import { loadImage, upload } from "src/upload-helper-functions";
    export let web3;
    export let publicWalletAddress;

    const uploadFileToIPFS = async () => {
        let infoMessageToBeSigned = `This signature is used to validate that you are the owner of this wallet. This ensures only invited people can upload content to foster high quality content right from the start.`;
        let signature = "";

        try {
            signature = await web3.eth.sign(
                web3.utils.toHex(infoMessageToBeSigned),
                publicWalletAddress
            );
        } catch (error) {
            console.log(error);
        }
    };

    const clickUpload = () => {
        upload();
    };
</script>

<div class="uploadArea">
    <img src="" alt="" name="image" style="width: 100%;" />
    <canvas id="canvas" /><br />
    <input type="file" name="file" id="imgfile" on:change={loadImage} />
    <input type="button" id="btnLoad" value="Upload" on:click={clickUpload} />
</div>

<style>
    .uploadArea {
        max-width: 100vw;
    }
</style>
