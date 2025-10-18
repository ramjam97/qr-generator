import AppContext from "@/Context/AppContext";
import { useContext } from "react";

const Preview = () => {

    const { qrDataUrl, size, isGenerating } = useContext(AppContext);

    const handleDownload = () => {
        if (!qrDataUrl) return;

        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const actualSize = size >= 300 ? 300 : size;

    const skeletonClass = 'skeleton border border-base-300 rounded-none';
    const skeletonStyle = { height: actualSize, width: actualSize };

    return <>
        <div className="card bg-base-100 border border-base-300 shadow-lg flex flex-col items-center gap-2 p-4">

            <h5 className="font-bold text-secondary text-center py-2">OUTPUT</h5>

            {(qrDataUrl && !isGenerating) ? <>
                <img src={qrDataUrl} alt="QR code" className={skeletonClass} height={actualSize} width={actualSize} />
                <button className="btn btn-primary btn-sm mt-2" onClick={handleDownload}>Download QR</button>
            </> : <div className={skeletonClass} style={skeletonStyle} />}

        </div>
    </>
}

export default Preview