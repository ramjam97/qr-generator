import { useState } from 'react'
import AppContext from './context/AppContext'
import QRCodeStyling from 'qr-code-styling';
import { defaultSize } from './App';

export default function AppContextProvider({ children }: { children: React.ReactNode }) {

    const [isGenerating, setIsGenerating] = useState(true);
    const [qrInstance] = useState(() => new QRCodeStyling({}));
    const [qrDataUrl, setQrDataUrl] = useState<string>(null);
    const [size, setSize] = useState(defaultSize);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return <>
        <AppContext.Provider value={{
            size, setSize,
            isGenerating, setIsGenerating,
            qrDataUrl, setQrDataUrl,
            qrInstance,
            errorMessage, setErrorMessage
        }}>{children}</AppContext.Provider>
    </>
}
