// QR Code Generator
const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "png",
    data: "",
    image: "",
    dotsOptions: {
        color: "#4267b2",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#ffffff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
    }
});

document.getElementById("generateBtn").addEventListener("click", () => {
    const qrText = document.getElementById("qrText").value;
    qrCode.update({
        data: qrText
    });
    qrCode.append(document.getElementById("qrCode"));
    document.getElementById("downloadBtn").style.display = "block";
});

document.getElementById("downloadBtn").addEventListener("click", () => {
    qrCode.download({
        name: "qr-code",
        extension: "png"
    });
});

// QR Code Reader with Camera
document.getElementById("startReaderBtn").addEventListener("click", () => {
    document.getElementById("fileInput").style.display = "none";
    document.getElementById("uploadBtn").style.display = "none";
    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" }, 
        {
            fps: 10,
            qrbox: 250
        },
        (decodedText, decodedResult) => {
            document.getElementById("result").innerText = `QR Code Result: ${decodedText}`;
            html5QrCode.stop();
        },
        (errorMessage) => {
            console.warn(`QR Code no match: ${errorMessage}`);
        }
    ).catch(err => {
        console.error(`Unable to start scanning, error: ${err}`);
    });
});

// Show upload button when file is selected
document.getElementById("fileInput").addEventListener("change", (event) => {
    if (event.target.files.length > 0) {
        document.getElementById("uploadBtn").style.display = "block";
    } else {
        document.getElementById("uploadBtn").style.display = "none";
    }
});

// QR Code Reader with File Upload
document.getElementById("uploadBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCode.scanFile(file, false)
            .then(decodedText => {
                document.getElementById("result").innerText = `QR Code Result: ${decodedText}`;
            })
            .catch(err => {
                document.getElementById("result").innerText = `Error: ${err}`;
            });
    }
});
