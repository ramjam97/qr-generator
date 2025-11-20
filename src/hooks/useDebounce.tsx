import { useCallback, useRef } from "react";

export function useDebounce() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return useCallback((callback: () => void, delay: number) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(callback, delay);
    }, []);
}