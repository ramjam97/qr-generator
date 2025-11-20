import { createContext } from "react";
import type QRCodeStyling from "qr-code-styling";

export interface AppContextProps {

    isGenerating: boolean;
    setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;

    qrDataUrl: string;
    setQrDataUrl: React.Dispatch<React.SetStateAction<string>>

    qrInstance: QRCodeStyling;

    size: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;

    errorMessage: string | null;
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextProps>(null);

export default AppContext