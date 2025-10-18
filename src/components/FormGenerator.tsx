import AppContext from "@/Context/AppContext";
import { useContext } from "react"
import TableForm, { TableFormRow } from "@/components/TableForm";
import { strToFloatAbs, strToIntAbs } from "@/utils/my-utils";

const FormGenerator = () => {

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

    return <>
        <div className="card bg-base-300 p-4 flex flex-col gap-2 shadow-lg">

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

export default FormGenerator