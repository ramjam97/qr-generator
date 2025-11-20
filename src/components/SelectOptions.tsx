export default function SelectOptions({ list }: { list: string[] }) {
    return list.map(item => <option key={item.toLowerCase().replace(/\s+/g, '-')} value={item}>{item}</option>);
}