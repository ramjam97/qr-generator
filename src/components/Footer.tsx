import packageJson from '@/../package.json';

export default function Footer() {
    const year = new Date().getFullYear();
    const version = packageJson?.version ?? '1.0.0';
    return (
        <div className="py-3 px-2 text-center flex flex-col gap-2">
            <span>
                <a href="https://github.com/ramjam97/qr-generator" target="_blank" rel="noopener noreferrer">
                    <i className="pi pi-github text-2xl"></i>
                </a>
            </span>
            <span className='text-base-content/60 text-xs'>© {year} by RamJam | Crafted with passion. (v.{version})</span>
        </div>
    )
}