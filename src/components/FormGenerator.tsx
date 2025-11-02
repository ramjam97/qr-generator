import AppContext from "@/Context/AppContext";
import { useContext, useRef } from "react"
import TableForm, { TableFormRow } from "@/components/TableForm";
import { strToFloatAbs, strToIntAbs } from "@/utils/my-utils";

export default function FormGenerator() {

    const {
        text, setText,
        size, setSize,
        margin, setMargin,
        logo, setLogo,
        logoCornerRadius, setLogoCornerRadius,
        logoMargin, setLogoMargin,
        logoScale, setLogoScale,
        color, setColor
    } = useContext(AppContext);

    const logoRef = useRef<HTMLInputElement>(null);

    const handleLogoFileUpload = () => {
        if (!logoRef.current) return;
        const file = logoRef.current.files?.[0];
        if (!file) {
            setLogo(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => setLogo(reader.result as string);
        reader.readAsDataURL(file);
    }

    const removeLogo = () => {
        setLogo(null);
        if (logoRef.current) logoRef.current.value = '';
    }

    return <>
        <div className="card bg-base-300 p-4 flex flex-col gap-3 shadow-lg">

            <h5 className="font-bold text-secondary text-center py-2">INPUT</h5>

            <TableForm>

                <TableFormRow label="Content:">
                    <input type="text" className="input" placeholder="Type here" value={text}
                        onChange={(e) => setText(e.target.value)} />
                </TableFormRow>

                <TableFormRow label="Color:">
                    <input type="color" className="input" value={color}
                        onChange={(e) => setColor(e.target.value)} />
                </TableFormRow>

                <TableFormRow label="Size:">
                    <input type="number" className="input" placeholder="size" value={size}
                        onChange={(e) => setSize(strToIntAbs(e.target.value))} />
                </TableFormRow>

                <TableFormRow label="Margin:">
                    <input type="number" className="input" placeholder="margin" value={margin}
                        onChange={(e) => setMargin(strToIntAbs(e.target.value))} />
                </TableFormRow>

                <TableFormRow label="Logo:">
                    <input type="file" className="file-input" accept="image/*" ref={logoRef} onChange={handleLogoFileUpload} />
                </TableFormRow>

            </TableForm>

            {logo && <>
                <div className="border border-base-100 p-4 rounded">
                    <h5 className="font-bold text-secondary text-center py-2 pb-4">Logo Settings</h5>
                    <TableForm>

                        <TableFormRow label="Margin:">
                            <div className="flex flex-row justify-center items-center border border-base-100 shadow-lg rounded relative">
                                <span className="absolute top-1 right-1">
                                    <button className="btn btn-circle btn-neutral btn-xs" onClick={removeLogo}>
                                        <i className="pi pi-times"></i>
                                    </button>
                                </span>
                                <div className="max-w-[180px]">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                        </TableFormRow>

                        <TableFormRow label="Margin:">
                            <input type="number" className="input" placeholder="margin"
                                value={logoMargin} min={0} max={100}
                                onChange={(e) => setLogoMargin(strToIntAbs(e.target.value))} />
                        </TableFormRow>

                        <TableFormRow label="Scale:">
                            <input type="number" className="input" placeholder="scale"
                                value={logoScale} min={0} max={1} step="0.1"
                                onChange={(e) => setLogoScale(strToFloatAbs(e.target.value))} />
                        </TableFormRow>

                        <TableFormRow label="Radius:">
                            <input type="number" className="input" placeholder="scale"
                                value={logoCornerRadius} min={0} max={100}
                                onChange={(e) => setLogoCornerRadius(strToIntAbs(e.target.value))} />
                        </TableFormRow>

                    </TableForm>
                </div>
            </>}

        </div>

    </>
}