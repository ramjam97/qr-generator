import { useContext, useEffect, useState } from "react";
import type { Options } from "qr-code-styling/lib/types";
import AppContext from "@/context/AppContext";
import { defaultSize } from "@/App";
import TableForm, { TableFormRow } from "@/components/TableForm";
import { strToFloatAbs, strToIntAbs } from "@/utils/my-utils";
import { getQrDataUrl } from "@/utils/qr-utils";
import Accordion from "@/components/Accordion";
import ColorPicker from "@/components/ColorPicker";
import LogoUploader from "@/components/LogoUploader";
import SelectOptions from "@/components/SelectOptions";


export default function FormGenerator() {

    const { size, setSize, qrInstance, setIsGenerating, setQrDataUrl, setErrorMessage } = useContext(AppContext);

    const [text, setText] = useState("https://ramjam97.github.io");
    const [margin, setMargin] = useState(0);

    const [bgColor, setBgColor] = useState("#ffffff");

    const [dotsColor, setDotsColor] = useState("#000000");
    const [dotsType, setDotsType] = useState<Options["dotsOptions"]["type"]>("rounded");

    const [cornerSqrColor, setCornerSqrColor] = useState("#000000");
    const [cornerSqrType, setCornerSqrType] = useState<Options["cornersSquareOptions"]["type"]>("rounded");

    const [cornerDotsColor, setCornerDotsColor] = useState("#000000");
    const [cornerDotsType, setCornerDotsType] = useState<Options["cornersDotOptions"]["type"]>("rounded");

    const [logo, setLogo] = useState<string>(null);
    const [logoHideDots, setLogoHideDots] = useState<boolean>(true);
    const [logoMargin, setLogoMargin] = useState<number>(3);
    const [logoScale, setLogoScale] = useState<number>(0.2);

    const setDataUrl = async (opt: Partial<Options>) => {
        try {
            if (logo && !logo.startsWith('data:image/')) {
                throw 'Invalid logo image file';
            }
            qrInstance.update(opt);
            const dataUrl = await getQrDataUrl(qrInstance);

            setQrDataUrl(dataUrl);
            setErrorMessage(null);
        } catch (error: any) {
            setQrDataUrl(null);
            setErrorMessage(typeof error === 'string' ? error : 'Something went wrong while generating QR code');
            console.log('error:', error);
        } finally {
            setIsGenerating(false);
        }
    }

    useEffect(() => {

        setIsGenerating(true);
        const actualSize = Math.min(defaultSize, size);

        const timeout = setTimeout(() => {
            setDataUrl({
                width: actualSize,
                height: actualSize,
                data: text,
                image: logo,
                margin: margin,
                dotsOptions: {
                    color: dotsColor,
                    type: dotsType,
                },
                cornersSquareOptions: {
                    color: cornerSqrColor,
                    type: cornerSqrType,
                },
                cornersDotOptions: {
                    color: cornerDotsColor,
                    type: cornerDotsType,
                },
                backgroundOptions: {
                    color: bgColor,
                },
                imageOptions: {
                    hideBackgroundDots: logoHideDots,
                    crossOrigin: "anonymous",
                    margin: logoMargin,
                    imageSize: logoScale,
                },
            });
        }, 1_000);

        return () => clearTimeout(timeout);

    }, [
        text, size, margin, logo,
        logoMargin, logoScale, dotsType,
        cornerSqrType, cornerDotsType, dotsColor,
        cornerSqrColor, cornerDotsColor, bgColor,
        logoHideDots
    ]);

    return <>
        <div className="card bg-base-300 border border-base-300 p-4 flex flex-col gap-3 shadow">

            <h5 className="font-bold text-secondary text-center py-2">INPUT</h5>

            <Accordion title="Main" open={true}>
                <TableForm>

                    <TableFormRow label="Content:">
                        <textarea placeholder="Type here"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            className="textarea"></textarea>
                    </TableFormRow>

                    <TableFormRow label="Size:" verticalAlign="middle">
                        <input type="number" className="input" placeholder="size" value={size}
                            onChange={(e) => setSize(strToIntAbs(e.target.value))} />
                    </TableFormRow>

                    <TableFormRow label="Margin:" verticalAlign="middle">
                        <input type="number" className="input" placeholder="margin" value={margin}
                            onChange={(e) => setMargin(strToIntAbs(e.target.value))} />
                    </TableFormRow>

                </TableForm>
            </Accordion>

            <Accordion title="Logo">
                <TableForm>

                    <TableFormRow label="Image:" verticalAlign="middle">
                        <LogoUploader setLogo={setLogo} />
                    </TableFormRow>

                    <TableFormRow label="Hide Dots:" labelFor="hideDotsCB" verticalAlign="middle" customStyle={{ textWrap: 'nowrap' }}>
                        <input type="checkbox" id="hideDotsCB" className="checkbox" checked={logoHideDots} onChange={(e) => setLogoHideDots(e.target.checked)} />
                    </TableFormRow>

                    <TableFormRow label="Margin:" verticalAlign="middle">
                        <input type="number" className="input" placeholder="margin"
                            value={logoMargin} min={0} max={100}
                            onChange={(e) => setLogoMargin(strToIntAbs(e.target.value))} />
                    </TableFormRow>

                    <TableFormRow label="Scale:" verticalAlign="middle">
                        <input type="number" className="input" placeholder="scale"
                            value={logoScale} min={0} max={1} step="0.1"
                            onChange={(e) => setLogoScale(strToFloatAbs(e.target.value))} />
                    </TableFormRow>

                </TableForm>
            </Accordion>

            <Accordion title="Dots">
                <TableForm>

                    <TableFormRow label="Color:" verticalAlign="middle">
                        <ColorPicker color={dotsColor} setColor={setDotsColor} />
                    </TableFormRow>

                    <TableFormRow label="Type:" verticalAlign="middle">
                        <select className="select" value={dotsType} onChange={(e) => setDotsType(e.target.value as Options["dotsOptions"]["type"])}>
                            <SelectOptions list={["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"]} />
                        </select>
                    </TableFormRow>

                </TableForm>
            </Accordion>

            <Accordion title="Corner Square">
                <TableForm>

                    <TableFormRow label="Color:" verticalAlign="middle">
                        <ColorPicker color={cornerSqrColor} setColor={setCornerSqrColor} />
                    </TableFormRow>

                    <TableFormRow label="Type:" verticalAlign="middle">
                        <select className="select" value={cornerSqrType} onChange={(e) => setCornerSqrType(e.target.value as Options["cornersSquareOptions"]["type"])}>
                            <SelectOptions list={["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded", "dot"]} />
                        </select>
                    </TableFormRow>

                </TableForm>
            </Accordion>

            <Accordion title="Corner Square Dots">
                <TableForm>

                    <TableFormRow label="Color:" verticalAlign="middle">
                        <ColorPicker color={cornerDotsColor} setColor={setCornerDotsColor} />
                    </TableFormRow>

                    <TableFormRow label="Type:" verticalAlign="middle">
                        <select className="select" value={cornerDotsType} onChange={(e) => setCornerDotsType(e.target.value as Options["cornersDotOptions"]["type"])}>
                            <SelectOptions list={["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded", "dot"]} />
                        </select>
                    </TableFormRow>

                </TableForm>
            </Accordion>

            <Accordion title="Background">
                <TableForm>

                    <TableFormRow label="Color:" verticalAlign="middle">
                        <ColorPicker color={bgColor} setColor={setBgColor} />
                    </TableFormRow>

                </TableForm>
            </Accordion>

        </div>

    </>
}