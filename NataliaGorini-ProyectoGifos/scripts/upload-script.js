const giphyKey = 'e5StqUk5aqX4j4POSwzm2IEBOMj9LeDI';

window.onload = (e)=> {
    document.getElementById("only").style.display="flex";
    getMyGifs();
}
function changeThemes () {
    if(sessionStorage.getItem("theme") == "dark"){
        document.querySelector("body").setAttribute('theme', 'dark') 
        document.querySelector(".logo").setAttribute("src","assets/gifOFLogoDark.png");   
    }else{
        document.querySelector("body").setAttribute('theme', 'light')    
    }
}
changeThemes();
document.getElementById("start").addEventListener("click", () => {
    document.querySelector(".own--gifos").style.display = "none"
    captureLayout(document.querySelector("#only"), document.querySelector(".step1--precapture"));
    onCamera()
});
let constraintObj = { 
    audio: false, 
    video: { 
        audio: false,
        video:{
            height: 434,
            width: 832,
        }
    }
};
// step 1 preCapture --------------------------------
function onCamera (){
    const video = document.getElementById("video");
    stream = navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function (stream) {
            video.srcObject = stream;
            video.play()
        })
        .catch((err)=> {
            console.log('Ha ocurrido un error' + err)
        });
};
// counter timecode ---------------------------------
let date = new Date()
date.setHours(00, 00, 00);
let seconds;

// step 2 capture ------------------------------------
function captureLayout(x, y){
    x.style.display= "none";
    y.style.display = "flex";
};
document.querySelector("#btn--start").addEventListener ("click", async () => {
    stream = await navigator.mediaDevices.getUserMedia(constraintObj)
    startRecord(stream) 
    captureLayout(document.querySelector(".step1--precapture"), document.querySelector(".step2--capture"));
    let countSeconds = setInterval(function() {
        seconds = date.getSeconds()
        seconds++
        date.setSeconds(seconds)
    
        document.querySelector(".timer").innerHTML = `0${date.getHours()}:0${date.getMinutes()}:0${date.getSeconds()}`;
        document.querySelector("#btn--repeat").onclick = () => {
            clearInterval(countSeconds)
        }
    }, 1000);
});
// startCapture----------------------------------------
function startRecord(stream){
    const video = document.getElementById("videoCapture");
    video.srcObject = stream;
	recorder = new RecordRTCPromisesHandler(stream, {
        type: 'gif',
    });
    recorder.startRecording()
        .catch(err => console.log(err))
};
document.querySelector("#btn--stop").addEventListener ("click", () => {
    stopRecord();
    captureLayout(document.querySelector(".step2--capture"), document.querySelector(".step3--preview"));
    document.querySelector(".timer2").innerHTML = `0${date.getHours()}:0${date.getMinutes()}:0${date.getSeconds()}`;
    document.querySelector(".progress--less").classList.toggle("fill--bar")
});
// turnOffCamara -------------------------------------------
function cameraOff (){
    video.stop();
}
// stopCapture----------------------------------------------
let blob = null
let url = ""
async function stopRecord(){
    await recorder.stopRecording();
    blob = await recorder.getBlob();
    let url = URL.createObjectURL(blob);
    const videoSave = document.querySelector("#videoSave");
    videoSave.src = url
    const img = document.getElementById("uploadedGif");
    img.src = url;
};
document.querySelector("#btn--repeat").addEventListener ("click", () => {
    captureLayout(document.querySelector(".step3--preview"), document.querySelector(".step1--precapture"));
})

// upload gif ---------------------------

const uploadURL = `https://upload.giphy.com/v1/gifs?api_key=${giphyKey}`;
const controller = new AbortController();

function upload(){
    let form = new FormData ();
        form.append("file", blob, "myGif.gif");
        console.log(form.get("file"))
        const options = {
            method: 'POST',
            body: form,
            signal: controller.signal
        }
    fetch(uploadURL, options)
        .then(res => res.json())
        .then(json => {
            let gifUpload = json;
            saveOwnGyfs(gifUpload.data.id)
            success();
        })
        .then(captureLayout(document.querySelector(".step3--preview"), document.querySelector(".step4--upload"))
        )
        .catch (err => err)
}
document.querySelector("#btn--upload").addEventListener ("click", () =>{
    upload();
})
document.querySelector("#btn--cancel").addEventListener ("click", () =>{
    controller.abort();
    console.log("ha cancelado subir gif")
    captureLayout(document.querySelector(".step4--upload"), document.querySelector(".steps--gifos"))
    
})

// My gifs on local storage---------------------------
let arrayOwnGifs = []

function saveOwnGyfs (gifID) {
    if (localStorage.getItem('arrayOwnGifs') == null) {
        arrayOwnGifs.push(gifID)
    }
    else {
        arrayOwnGifs = localStorage.getItem('arrayOwnGifs').split(',')
        arrayOwnGifs.push(gifID)
    }
    localStorage.setItem('arrayOwnGifs', arrayOwnGifs.join())
    console.log(localStorage.getItem('arrayOwnGifs'))
};
function success () {
    captureLayout(document.querySelector(".step4--upload"), document.querySelector(".step5--success"))
    getMyGifs();
}
// show my gifos ----------------------------
async function getMyGifs (){
    document.querySelector(".own--gifos").style.display = "flex";
    const myGifsId = localStorage.getItem("arrayOwnGifs");
    const gifUrlById = `https://api.giphy.com/v1/gifs?api_key=${giphyKey}&ids=${myGifsId}`
    const res = await fetch (gifUrlById);
    const data = await res.json();
    console.log(data)
    data.data.forEach (gif => {
        const container = document.querySelector(".my--gifos")
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        container.appendChild(div);
        div.appendChild(img);
    })
}
// copy url -----------------------------------
function copyUrlMygif (text) {
    var hiddentextarea = document.createElement("textarea");
    document.body.appendChild(hiddentextarea);
    hiddentextarea.value = text;
    hiddentextarea.select();
    document.execCommand("copy");
    document.body.removeChild(hiddentextarea);
};
document.getElementById("copyUrlBtn").addEventListener("click", () => {
        copyUrlMygif(url)
        alert('Enlace copiado con éxito!')
    
});
// download my gif--------------------------------------
document.getElementById("downloadGifBtn").addEventListener('click', () => {
        invokeSaveAsDialog(blob);
});
// finalizacion -------------------------------------
document.getElementById("finishAllBtn").addEventListener ('click',() => {
    captureLayout (document.querySelector(".step5--success"), document.querySelector(".steps--gifos"));
    getMyGifs();
});
