export default function TableForm({ children }: { children: React.ReactNode }) {
    return <table className="form-table w-full">
        <tbody>{children}</tbody>
    </table>
}

interface TableFormRowProps {
    labelFor?: string;
    label?: string;
    verticalAlign?: 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom';
    children: React.ReactNode;
    customStyle?: React.CSSProperties;
}

export const TableFormRow = ({ label, labelFor, verticalAlign = 'top', customStyle, children }: TableFormRowProps) => {

    return <tr>
        <td style={{ ...customStyle, verticalAlign }}>{label?.trim().length > 0 && <label htmlFor={labelFor}>{label}</label>}</td>
        <td>{children}</td>
    </tr>
}