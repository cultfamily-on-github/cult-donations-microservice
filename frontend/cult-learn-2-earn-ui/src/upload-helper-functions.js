import { backendBaseURL } from "./stores";

async function post(canvas, name, signature) {
  canvas.toBlob(async function (blob) {
    // const formData = new FormData();
    // formData.append('image', blob, name);
    // const res = await fetch('http://localhost:8086/api/v1/addFileFromForm', {

    const fileToBeSent = {
      signature,
      fileName: "waking-up-checking-my-cult.png",
      fileType: "image/png",
      targetFileName: "waking-up-checking-my-cult.png"
    };

    const addAssetURL = `${backendBaseURL}/api/v1/addFile`;

    await fetch(addAssetURL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(fileToBeSent),
    });

    // const res = await fetch('http://localhost:8086/api/v1/addFile', {
    //   mode: 'no-cors',
    //   method: 'POST',
    //   body: formData
    // });
  });
}

export function loadImage() {
  let img;

  const input = document.getElementById('imgfile');
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
    const canvas = document.getElementById("canvas")
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  }

}

export async function upload(signature) {
  const canvas = document.getElementById("canvas")
  const input = document.getElementById('imgfile');
  await post(canvas, input.files[0].name, signature);
  write('File uploaded')
}

export function write(msg) {
  const p = document.createElement('p');
  p.innerHTML = msg;
  document.body.appendChild(p);
}