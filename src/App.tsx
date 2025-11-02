import { AwesomeQR } from "awesome-qr";
import { useEffect, useState } from "react";
import Preview from "@/components/Preview";
import Footer from "@/components/Footer";
import AppContext from "@/Context/AppContext";
import FormGenerator from "./components/FormGenerator";

const defaultSize = 300;

const App = () => {

    const [qrDataUrl, setQrDataUrl] = useState<string>("");
    const [text, setText] = useState("https://ramjam97.github.io");
    const [size, setSize] = useState(defaultSize);
    const [margin, setMargin] = useState(10);
    const [color, setColor] = useState("#000000");

    const [logo, setLogo] = useState<string>(null);
    const [logoCornerRadius, setLogoCornerRadius] = useState<number>(8);
    const [logoMargin, setLogoMargin] = useState<number>(3);
    const [logoScale, setLogoScale] = useState<number>(0.2);

    const [isGenerating, setIsGenerating] = useState(false);

    const generateQR = async () => {
        try {
            const qr = new AwesomeQR({
                text: text,
                size: size,
                margin: margin,
                colorDark: color,
                logoImage: logo,
                logoCornerRadius: logoCornerRadius,
                logoMargin: logoMargin,
                logoScale: logoScale,
                // colorLight: "#ffffff",
            });
            const dataUrl = await qr.draw();
            setQrDataUrl(dataUrl as string);
        } catch (err) {
            alert("QR generation failed");
            console.error("QR generation failed:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    let timeout: any;
    useEffect(() => {

        setIsGenerating(true);
        timeout = setTimeout(() => generateQR(), 1_000);

        return () => clearTimeout(timeout);

    }, [text, size, margin, logo, logoMargin, logoScale, logoCornerRadius, color]);

    return <>
        <AppContext.Provider value={{
            qrDataUrl, setQrDataUrl,
            text, setText,
            size, setSize,
            margin, setMargin,
            logo, setLogo,
            logoCornerRadius, setLogoCornerRadius,
            logoMargin, setLogoMargin,
            logoScale, setLogoScale,
            color, setColor,
            isGenerating, setIsGenerating
        }}>
            <div className="bg-base-100 min-h-screen flex flex-col justify-between">
                <div className="max-w-3xl mx-auto flex flex-col gap-3 py-3">
                    <h5 className="text-3xl text-center text-primary font-bold mb-3">QR Generator</h5>
                    <div className="flex flex-row flex-wrap gap-3 justify-center items-start">
                        <FormGenerator />
                        <Preview />
                    </div>
                </div>
                <Footer />
            </div>
        </AppContext.Provider>
    </>
}

export default App