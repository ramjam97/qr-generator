interface AccordionProps {
    title: string;
    open?: boolean;
    children: React.ReactNode;
}

export default function Accordion(props: AccordionProps) {

    const { title, children, open = false } = props;

    const name = 'accordion-' + title.toLowerCase().replace(/\s+/g, '-');

    return <>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="checkbox" name={name} defaultChecked={open} />
            <div className="collapse-title font-semibold">{title}</div>
            <div className="collapse-content text-sm">{children}</div>
        </div>
    </>
}
