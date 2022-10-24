<script>
    import { upload } from "./../upload-helper-functions";
    export let web3;
    export let publicWalletAddress;

    let isImageLoaded = false;

    const uploadFileToIPFS = async () => {
        let infoMessageToBeSigned = `This signature ensures that only invited wallets can upload content, invite friends etc. in order to foster high quality content right from the start.`;

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

    function loadImage() {
        let img;

        const input = document.getElementById("imgfile");
        if (!input.files[0]) {
            write("Please select a file before clicking 'Load'");
            return;
        }

        const file = input.files[0];
        const fr = new FileReader();
        fr.onload = createImage;
        fr.readAsDataURL(file);

        function createImage() {
            img = new Image();
            img.onload = imageLoaded;
            img.src = fr.result;
        }

        function imageLoaded() {
            const canvas = document.getElementById("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
        }

        isImageLoaded = true;
    }
    const clickUpload = () => {
        uploadFileToIPFS();
    };
</script>

<div class="uploadArea">
    <img src="" alt="" name="image" style="width: 100%;" />
    {#if isImageLoaded}
        <canvas id="canvas" /><br />
    {/if}
    <input type="file" name="file" id="imgfile" on:change={loadImage} />
    <!-- <input type="file" name="file1" id="imgfile" on:change={loadImage} /> -->
    <input type="button" id="btnLoad" value="Upload" on:click={clickUpload} />
</div>

<style>
    canvas {
        width: 80vw;
        margin-bottom: 1vh;
    }
    .uploadArea {
        margin-top: 4vh;
        margin-bottom: 4vh;
    }

    input {
        width: 40%
    }

    @media screen and (min-width: 480px) {
        canvas {
            width: 30vw;
        }
    }
</style>
