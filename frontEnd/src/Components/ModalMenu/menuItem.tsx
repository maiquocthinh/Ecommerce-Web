interface MenuItemProps {
    data: {
        heading: string
        listItem: string[]
    }
}
const MenuItem: React.FC<MenuItemProps> = ({ data }) => {
    return (
        <div className="w-1/6">
            <h1 className="text-sm font-semibold">{data.heading}</h1>
            <ul>
                {data?.listItem && data.listItem.map((item, index) => (
                    <li key={index} className="py-1 text-xs hover:text-custom-primary cursor-pointer">{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default MenuItem;