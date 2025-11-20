import { useContext, useMemo, useState } from 'react'
import AppContext from '@/context/AppContext';
import QRCodeStyling from 'qr-code-styling';


export type QrExtension = "png" | "jpeg" | "svg" | "webp";

export default function DownloadBtn() {

    const { qrInstance, size } = useContext(AppContext);

    const [format, setFormat] = useState<QrExtension>("png");

    const isDisabled = useMemo(() => qrInstance._options?.data === '', [qrInstance._options]);

    const handleDownload = () => {
        const qr = new QRCodeStyling({ ...qrInstance._options, height: size, width: size });
        console.log('downloading');
        qr.download({ name: `${Date.now()}`, extension: format });
    }

    return <>
        <div className='flex align-center gap-2'>
            <button disabled={isDisabled} className="btn btn-primary text-primary-content btn-sm" onClick={handleDownload}>Download</button>
            <select className="select select-sm" value={format} onChange={(e) => setFormat(e.target.value as QrExtension)}>
                {["png", "jpg", "svg", "webp"].map((ext) => <option key={ext} value={ext}>{ext.toUpperCase()}</option>)}
            </select>
        </div>
    </>
}
