import { AwesomeQR } from "awesome-qr";
import { useEffect, useState } from "react";
import Preview from "@/components/Preview";

const App = () => {

    const [qrDataUrl, setQrDataUrl] = useState<string>("");
    const [text, setText] = useState("sample");
    const [size, setSize] = useState(250);
    const [margin, setMargin] = useState(10);

    const [backgroundImage, setBackgroundImage] = useState<string>(null);

    const [logo, setLogo] = useState<string>(null);
    const [logoCornerRadius, setLogoCornerRadius] = useState<number>(8);
    const [logoMargin, setLogoMargin] = useState<number>(6);
    const [logoScale, setLogoScale] = useState<number>(0.2);

    const [colorForeground, setColorForeground] = useState("#000000");
    const [colorBackground, setColorBackground] = useState("#ffffff");


    const generateQR = async () => {
        try {
            const qr = new AwesomeQR({
                text: text,
                size: size > 0 ? size : 250,
                backgroundImage: backgroundImage,
                logoImage: logo,
                logoCornerRadius: logoCornerRadius,
                logoMargin: logoMargin,
                logoScale: logoScale,
                colorDark: colorForeground,
                colorLight: colorBackground,
                margin: margin > 0 ? margin : 0,
            });
            const dataUrl = await qr.draw();
            setQrDataUrl(dataUrl as string);
        } catch (err) {
            console.error("QR generation failed:", err);
        }
    };

    const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setLogo(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => setLogo(reader.result as string);
        reader.readAsDataURL(file);
    }

    const handleBgImgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setBackgroundImage(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => setBackgroundImage(reader.result as string);
        reader.readAsDataURL(file);
    }

    function stringToInt(str: any) {
        const num = parseInt(str, 10);
        return isNaN(num) ? 0 : num;
    }

    function stringToFloat(str: any) {
        const num = parseFloat(str);
        return isNaN(num) ? 0 : num;
    }

    let timeout: any;
    useEffect(() => {
        timeout = setTimeout(() => {
            console.log('generating qr..');
            generateQR();
        }, 1_000);
        return () => clearTimeout(timeout);
    }, [text, size, margin, backgroundImage, logo, logoMargin, logoScale, logoCornerRadius, colorForeground, colorBackground]);

    return <>
        <div className="bg-base-100 min-h-screen py-8">
            <div className="max-w-3xl mx-auto flex flex-col gap-3">

                <h5 className="text-2xl text-center font-bold mb-3">QR Generator</h5>

                <div className="flex flex-row flex-wrap gap-3 justify-center items-start">

                    <div className="card bg-base-300 p-4 flex flex-col gap-2 shadow-lg">

                        <h5 className="font-bold text-primary text-center py-2">INPUT</h5>

                        <table className="form-table">
                            <tbody>
                                <tr>
                                    <td>Content:</td>
                                    <td>
                                        <input type="text" className="input" placeholder="Type here"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Color Foreground:</td>
                                    <td>
                                        <input type="color" className="input"
                                            value={colorForeground}
                                            onChange={(e) => setColorForeground(e.target.value)} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Color Background:</td>
                                    <td>
                                        <input type="color" className="input"
                                            value={colorBackground}
                                            onChange={(e) => setColorBackground(e.target.value)} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Size:</td>
                                    <td>
                                        <input type="number" className="input" placeholder="size"
                                            value={size} min={50} max={1000}
                                            onChange={(e) => setSize(stringToInt(e.target.value))} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Margin:</td>
                                    <td>
                                        <input type="number" className="input" placeholder="margin"
                                            value={margin} min={0} max={100}
                                            onChange={(e) => setMargin(stringToInt(e.target.value))} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Background Image:</td>
                                    <td>
                                        <input type="file" className="file-input" accept="image/*" onChange={handleBgImgFileUpload} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Logo:</td>
                                    <td>
                                        <input type="file" className="file-input" accept="image/*" onChange={handleLogoFileUpload} />
                                    </td>
                                </tr>

                                {logo && <>
                                    <tr>
                                        <td>Logo Margin:</td>
                                        <td>
                                            <input type="number" className="input" placeholder="margin"
                                                value={logoMargin} min={0} max={100}
                                                onChange={(e) => setLogoMargin(stringToInt(e.target.value))} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Logo Scale:</td>
                                        <td>
                                            <input type="number" className="input" placeholder="scale"
                                                value={logoScale} min={0} max={1} step="0.1"
                                                onChange={(e) => setLogoScale(stringToFloat(e.target.value))} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Logo Radius:</td>
                                        <td>
                                            <input type="number" className="input" placeholder="scale"
                                                value={logoCornerRadius} min={0} max={100}
                                                onChange={(e) => setLogoCornerRadius(stringToInt(e.target.value))} />
                                        </td>
                                    </tr>
                                </>}

                            </tbody>
                        </table>

                    </div>

                    <Preview qrDataUrl={qrDataUrl} size={size} />

                </div>

            </div>
        </div>
    </>
}

export default App