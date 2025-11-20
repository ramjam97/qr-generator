import { useContext, useEffect, useRef } from "react";
import AppContext from "@/context/AppContext";
import DownloadBtn from "@/components/DownloadBtn";
import { defaultSize } from "@/App";

export default function Preview() {

    const { isGenerating, qrDataUrl, qrInstance, errorMessage } = useContext(AppContext);

    const qrPreview = useRef(null);

    const previewStyle = {
        height: Math.max(qrInstance._options.height, 50),
        width: Math.max(qrInstance._options.width, 50)
    };

    useEffect(() => {
        if (qrPreview.current) qrInstance.append(qrPreview.current);
    }, []);

    return <div className={`card bg-base-100 border border-base-300 shadow flex flex-col items-center gap-3 p-4 min-w-[250px] w-[${defaultSize + 50}px]`}>

        <h5 className="font-bold text-secondary text-center py-2">OUTPUT</h5>

        {isGenerating ? <>
            <div className="skeleton rounded-none flex justify-center items-center text-base-content/60" style={previewStyle} />
        </> : <>
            {errorMessage == null ? <>
                <img src={qrDataUrl} alt="QR code" className="skeleton border border-base-300 rounded-none text-opacity-0" height={previewStyle.height} width={previewStyle.width} />
            </> : <>
                <div className="bg-base-300 rounded-none flex justify-center items-center text-base-content/60" style={previewStyle}>
                    <i className="pi pi-exclamation-triangle text-2xl text-error"></i>
                </div>
            </>}
        </>}

        {errorMessage === null ? <DownloadBtn /> : <>
            <div role="alert" className="alert alert-error alert-soft"><span>Error! {errorMessage}</span></div>
        </>}

    </div >
}