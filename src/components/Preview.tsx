
interface PreviewProps {
    qrDataUrl: string;
    size: number;
    isGenerating: boolean
}

const Preview = ({ qrDataUrl, size, isGenerating }: PreviewProps) => {

    const handleDownload = () => {
        if (!qrDataUrl) return;

        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const skeletonClass = 'skeleton border border-base-300 rounded-none';
    const skeletonStyle = { height: size, width: size };

    return <>
        <div className="card bg-base-100 border border-base-300 shadow-lg flex flex-col items-center gap-2 p-4">

            <h5 className="font-bold text-secondary text-center py-2">OUTPUT</h5>

            {(qrDataUrl && !isGenerating) ? <>
                <img src={qrDataUrl} alt="QR code" className={skeletonClass} height={size} width={size} />
                <button className="btn btn-primary btn-sm mt-2" onClick={handleDownload}>Download QR</button>
            </> : <div className={skeletonClass} style={skeletonStyle} />}

        </div>
    </>
}

export default Preview