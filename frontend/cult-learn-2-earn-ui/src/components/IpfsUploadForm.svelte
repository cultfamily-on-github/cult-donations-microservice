<script>
    import { getInfoMessageToBeSigned } from "./../helpers";
    import { loadImage, upload } from "./../upload-helper-functions";
    export let web3;
    export let publicWalletAddress;

    const uploadFileToIPFS = async () => {
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
        upload(signature);
    };

    const clickUpload = () => {
        uploadFileToIPFS();
    };
</script>

<div class="uploadArea">
    <img src="" alt="" name="image" style="width: 100%;" />
    <canvas id="canvas" /><br />
    <input type="file" name="file" id="imgfile" on:change={loadImage} />
    <!-- <input type="file" name="file1" id="imgfile" on:change={loadImage} /> -->
    <input type="button" id="btnLoad" value="Upload" on:click={clickUpload} />
</div>

<style>
    canvas {
        width: 45vw;
        margin-bottom: 1vh;
    }
    .uploadArea {
        margin-top: 4vh;
        margin-bottom: 4vh;
    }
</style>
