import { AwesomeQR } from "awesome-qr";
import { useEffect, useState } from "react";

const App = () => {

    const [text, setText] = useState("");

    const [qrDataUrl, setQrDataUrl] = useState("");

    const generateQR = async () => {
        try {
            const qr = new AwesomeQR({
                text: text,
                size: 250,
                // You can use an imported or public image here:
                // backgroundImage: "/background.png",
                colorDark: "#000000",
                colorLight: "#ffffff",
                margin: 10,
            });
            const dataUrl = await qr.draw();
            setQrDataUrl(dataUrl);
        } catch (err) {
            console.error("QR generation failed:", err);
        }
    };


    const handleDownload = () => {
        if (!qrDataUrl) return;

        const link = document.createElement("a");
        link.href = qrDataUrl;
        link.download = "ramjam-qr.png"; // filename
        link.click();
    };

    let timeout: any;
    useEffect(() => {
        timeout = setTimeout(() => generateQR(), 500);
        return () => clearTimeout(timeout);
    }, [text]);

    return <>
        <div className="min-h-screen py-8">
            <div className="bg-red-200 max-w-3xl mx-auto">

                <h5 className="text-xl">QR Generator</h5>


                <div className="flex flex-col gap-2">
                    {qrDataUrl ? <>
                        <span className="">
                            <img src={qrDataUrl} alt="QR Code" className="shadow-lg" />
                        </span>
                        <span>
                            <button className="btn btn-primary btn-sm" onClick={handleDownload}>Download QR</button>
                        </span>
                    </> : (
                        <p>Generating QR...</p>
                    )}
                    <input type="text" className="input" placeholder="Type here" onChange={(e) => setText(e.target.value)} />
                </div>

            </div>
        </div>
    </>
}

export default App