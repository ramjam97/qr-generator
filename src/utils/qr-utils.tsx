import type QRCodeStyling from "qr-code-styling";

export const getQrDataUrl = (qrInstance: QRCodeStyling) => {
    return new Promise<string>((resolve, reject) => {
        if (qrInstance._options.data === '') return reject('QR code is empty');
        qrInstance.getRawData('webp')
            .then((blob) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob as Blob);
            })
            .catch(reject);
    });
}