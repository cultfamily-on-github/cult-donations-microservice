
import { backendBaseURL } from "./stores";

async function post(canvas, name, signature) {
  canvas.toBlob(async function (blob) {
    const formData = new FormData();
    formData.append('image', blob, name);
    // formData.append('signature', signature);

    let uploadFileURL

    // @ts-ignore
    if (backendBaseURL === 'http://localhost:8046') { // dynamically replaced see package.json script
      uploadFileURL = `http://localhost:8047/api/v1/uploadImage?signature=${signature}`
    } else if (backendBaseURL === 'https://cultdonations.org') {
      uploadFileURL = `https://cultdonations.org:11443/api/v1/uploadImage?signature=${signature}`
    }
    // const uploadFileURL = `http://localhost:8047/api/v1/uploadImage?signature=${signature}`
    const response = await fetch(uploadFileURL, {
      body: formData,
      method: "POST",
    });

    // const res = await fetch('http://localhost:8086/api/v1/addFileFromForm', {

    // const fileToBeSent = {
    //   signature,
    //   fileName: "waking-up-checking-my-cult.png",
    //   fileType: "image/png",
    //   targetFileName: "waking-up-checking-my-cult.png"
    // };

    // const addAssetURL = `${backendBaseURL}/api/v1/addFile`;

    // await fetch(addAssetURL, {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },

    //   body: JSON.stringify(fileToBeSent),
    // });

    // const res = await fetch('http://localhost:8086/api/v1/addFile', {
    //   mode: 'no-cors',
    //   method: 'POST',
    //   body: formData
  });
}



export async function upload(signature) {
  const canvas = document.getElementById("canvas")
  // const input = document.getElementById('imgfile');
  // await post(canvas, input.files[0].name, signature);
  await post(canvas, 'file1', signature);
  write('File uploaded')
}

export function write(msg) {
  const p = document.createElement('p');
  p.innerHTML = msg;
  document.body.appendChild(p);
}