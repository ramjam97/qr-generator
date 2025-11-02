export default function TableForm({ children }: { children: React.ReactNode }) {
    return <table className="form-table w-full">
        <tbody>{children}</tbody>
    </table>
}

export const TableFormRow = ({ label, children }: { label?: string, children: React.ReactNode }) => {
    return <tr>
        <td>{label}</td>
        <td>{children}</td>
    </tr>
}