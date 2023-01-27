const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
};

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        // 브라우저 캐시 상에 저장되는 URL
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    };
    recorder.start();
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    });
    // srcObject는 video가 가질 수 있는 무언가를 의미한다.
    // HTML 요소인 src와는 다르다.
    video.srcObject = stream;
    video.play();
}

init();

startBtn.addEventListener("click", handleStart);