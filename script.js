// QR Code Generator
const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
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
});

// QR Code Reader
document.getElementById("startReaderBtn").addEventListener("click", () => {
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
