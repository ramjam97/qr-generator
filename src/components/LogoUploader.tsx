import { useRef } from "react";

export default function LogoUploader({ setLogo }: { setLogo: (value: React.SetStateAction<string>) => void }) {

    const logoRef = useRef<HTMLInputElement>(null);

    const handleLogoFileUpload = () => {
        if (!logoRef.current) return;
        const file = logoRef.current.files?.[0];
        if (!file) {
            setLogo(null);
            logoRef.current.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => setLogo(reader.result as string);
        reader.readAsDataURL(file);
    }

    return <input type="file" className="file-input" accept="image/*" ref={logoRef} onChange={handleLogoFileUpload} />
}
