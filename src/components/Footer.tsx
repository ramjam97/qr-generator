import packageJson from '@/../package.json';

const Footer = () => {
    const year = new Date().getFullYear();
    const version = packageJson?.version ?? '1.0.0';
    return <>
        <div className="py-3 px-2 text-base-content/60 text-center text-xs">
            © {year} by RamJam | Crafted with passion. (v.{version})
        </div>
    </>;
};

export default Footer