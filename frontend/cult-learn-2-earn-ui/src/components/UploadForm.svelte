<script>
    import { backendBaseURL } from "../stores";

    export let web3;
    export let publicWalletAddress;

    let isImageLoadedForCanvas = false;
    let isImageUpLoaded = false;

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
        const canvas = document.getElementById("canvas");
        await post(canvas, "file1", signature);
    };

    async function post(canvas, name, signature) {
        canvas.toBlob(async function (blob) {
            try {
                const formData = new FormData();
                formData.append("image", blob, name);
                // formData.append('signature', signature);

                let uploadFileURL;

                // @ts-ignore
                if (backendBaseURL === "http://localhost:8046") {
                    // dynamically replaced see package.json script
                    uploadFileURL = `http://localhost:8047/api/v1/uploadImage?signature=${signature}`;
                } else if (backendBaseURL === "https://cultdonations.org") {
                    uploadFileURL = `https://cultdonations.org:11443/api/v1/uploadImage?signature=${signature}`;
                }
                // const uploadFileURL = `http://localhost:8047/api/v1/uploadImage?signature=${signature}`

                await fetch(uploadFileURL, {
                    body: formData,
                    method: "POST",
                });
                isImageUpLoaded = true;
            } catch (error) {
                alert(
                    `error during image upload: ${error.message}. If this problem persists, you might consider raising an issue: https://github.com/cultfamily-on-github/cult-donations-microservice/issues/new`
                );
            }
        });
    }

    function loadImage() {
        isImageUpLoaded = false;
        let img;

        const input = document.getElementById("imgfile");
        if (!input.files[0]) {
            alert("Please choose a file before clicking 'Load'");
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

        isImageLoadedForCanvas = true;
    }

    const clickUpload = () => {
        uploadFileToIPFS();
    };

    const clickRefresh = () => {
        window.location.reload();
    };
</script>

{#if isImageUpLoaded}
    Thank you for uploading this image. <br /> It shall be listed above after
    you
    <a class="linkChampagne" href="https://cultdonations.org">
        reload the page</a
    >.
    <br />
{:else}
    The content of the target folder is also uploaded to the
    <a class="linkChampagne" href="https://ipfs.tech" target="_blank">IPFS</a>
    to further decentralization. <br />
    After that each file is also accessible via its IPFS content identifier (aka
    CID).

    <div class="uploadArea">
        <img src="" alt="" name="image" style="width: 100%;" />
        {#if isImageLoadedForCanvas}
            <canvas id="canvas" /><br />
        {/if}
        <input type="file" name="file" id="imgfile" on:change={loadImage} />
        <!-- <input type="file" name="file1" id="imgfile" on:change={loadImage} /> -->
        <input
            type="button"
            id="btnLoad"
            value="Upload"
            on:click={clickUpload}
        />
    </div>
{/if}

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
        width: 40%;
    }

    @media screen and (min-width: 480px) {
        canvas {
            width: 30vw;
        }
    }
</style>
