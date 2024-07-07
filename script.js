import QRCode from 'qrcode';

// QR Code Generator
document.getElementById("generateBtn").addEventListener("click", () => {
    const qrText = document.getElementById("qrText").value;
    const qrCodeContainer = document.getElementById("qrCode");
    qrCodeContainer.innerHTML = "";

    QRCode.toCanvas(qrText, { errorCorrectionLevel: 'H' }, (error, canvas) => {
        if (error) {
            console.error(error);
            return;
        }
        qrCodeContainer.appendChild(canvas);
        document.getElementById("downloadBtn").style.display = "block";
    });
});

document.getElementById("downloadBtn").addEventListener("click", () => {
    const canvas = document.querySelector("#qrCode canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
        html5QrCode.scanFile(file, true)
            .then(decodedText => {
                document.getElementById("result").innerText = `QR Code Result: ${decodedText}`;
            })
            .catch(err => {
                document.getElementById("result").innerText = `Error: ${err}`;
            });
    }
});
