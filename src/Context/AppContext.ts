import { createContext } from "react";

export interface AppContextProps {
    qrDataUrl: string;
    setQrDataUrl: React.Dispatch<React.SetStateAction<string>>;

    text: string
    setText: React.Dispatch<React.SetStateAction<string>>

    size: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;

    margin: number;
    setMargin: React.Dispatch<React.SetStateAction<number>>;

    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;

    logo: string
    setLogo: React.Dispatch<React.SetStateAction<string>>

    logoCornerRadius: number;
    setLogoCornerRadius: React.Dispatch<React.SetStateAction<number>>;

    logoMargin: number;
    setLogoMargin: React.Dispatch<React.SetStateAction<number>>;

    logoScale: number;
    setLogoScale: React.Dispatch<React.SetStateAction<number>>;

    isGenerating: boolean;
    setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>(null);

export default AppContext