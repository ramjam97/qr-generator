import { AwesomeQR } from "awesome-qr";
import { useEffect, useState } from "react";
import Preview from "@/components/Preview";
import TableForm, { TableFormRow } from "./components/TableForm";
import { stringToFloat, stringToInt } from "./utils/my-utils";

const App = () => {

    const [qrDataUrl, setQrDataUrl] = useState<string>("");
    const [text, setText] = useState("sample");
    const [size, setSize] = useState(250);
    const [margin, setMargin] = useState(10);

    const [logo, setLogo] = useState<string>(null);
    const [logoCornerRadius, setLogoCornerRadius] = useState<number>(8);
    const [logoMargin, setLogoMargin] = useState<number>(6);
    const [logoScale, setLogoScale] = useState<number>(0.2);

    const [color, setColor] = useState("#000000");

    const [isGenerating, setIsGenerating] = useState(false);

    const generateQR = async () => {
        try {
            const qr = new AwesomeQR({
                text: text,
                size: size > 0 ? size : 250,
                logoImage: logo,
                logoCornerRadius: logoCornerRadius,
                logoMargin: logoMargin,
                logoScale: logoScale,
                colorDark: color,
                margin: margin > 0 ? margin : 0,
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

    let timeout: any;
    useEffect(() => {
        setIsGenerating(true);
        timeout = setTimeout(() => generateQR(), 1_000);
        return () => clearTimeout(timeout);
    }, [text, size, margin, logo, logoMargin, logoScale, logoCornerRadius, color]);

    return <>
        <div className="bg-base-100 min-h-screen py-8">
            <div className="max-w-3xl mx-auto flex flex-col gap-3">

                <h5 className="text-3xl text-center text-primary font-bold mb-3">QR Generator</h5>

                <div className="flex flex-row flex-wrap gap-3 justify-center items-start">

                    <div className="card bg-base-300 p-4 flex flex-col gap-2 shadow-lg">

                        <h5 className="font-bold text-secondary text-center py-2">INPUT</h5>

                        <TableForm>

                            <TableFormRow label="Content:">
                                <input type="text" className="input" placeholder="Type here"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)} />
                            </TableFormRow>

                            <TableFormRow label="Color:">
                                <input type="color" className="input"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)} />
                            </TableFormRow>

                            <TableFormRow label="Size:">
                                <input type="number" className="input" placeholder="size"
                                    value={size} min={50} max={1000}
                                    onChange={(e) => setSize(stringToInt(e.target.value))} />
                            </TableFormRow>

                            <TableFormRow label="Margin:">
                                <input type="number" className="input" placeholder="margin"
                                    value={margin} min={0} max={100}
                                    onChange={(e) => setMargin(stringToInt(e.target.value))} />
                            </TableFormRow>

                            <TableFormRow label="Logo:">
                                <input type="file" className="file-input" accept="image/*" onChange={handleLogoFileUpload} />
                            </TableFormRow>

                        </TableForm>


                        {logo && <>
                            <div className="border border-base-100 p-4 rounded shadow-lg">
                                <h5 className="font-bold text-secondary text-center py-2 pb-4">Logo Settings</h5>
                                <TableForm>

                                    <TableFormRow label="Margin:">
                                        <input type="number" className="input" placeholder="margin"
                                            value={logoMargin} min={0} max={100}
                                            onChange={(e) => setLogoMargin(stringToInt(e.target.value))} />
                                    </TableFormRow>

                                    <TableFormRow label="Scale:">
                                        <input type="number" className="input" placeholder="scale"
                                            value={logoScale} min={0} max={1} step="0.1"
                                            onChange={(e) => setLogoScale(stringToFloat(e.target.value))} />
                                    </TableFormRow>

                                    <TableFormRow label="Radius:">
                                        <input type="number" className="input" placeholder="scale"
                                            value={logoCornerRadius} min={0} max={100}
                                            onChange={(e) => setLogoCornerRadius(stringToInt(e.target.value))} />
                                    </TableFormRow>

                                </TableForm>
                            </div>
                        </>}

                    </div>

                    <Preview qrDataUrl={qrDataUrl} size={size} isGenerating={isGenerating} />

                </div>

            </div>
        </div>
    </>
}

export default App