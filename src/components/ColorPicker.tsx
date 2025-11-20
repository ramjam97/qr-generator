import React, { useRef } from 'react'
import { useDebounce } from '@/hooks/useDebounce';

interface ColorPickerProps {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
}


export default function ColorPicker({ color, setColor }: ColorPickerProps) {

    const debounce = useDebounce();

    const tempColorRef = useRef<string>('');
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, dispath: React.Dispatch<React.SetStateAction<string>>) => {
        tempColorRef.current = e.target.value;
        debounce(() => dispath(tempColorRef.current), 200);
    };

    return <input type="color" className="input" value={color} onChange={(e) => handleColorChange(e, setColor)} />
}
