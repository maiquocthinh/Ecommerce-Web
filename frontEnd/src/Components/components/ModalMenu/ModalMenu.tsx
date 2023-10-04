import MenuItem from "./menuItem";

const ModalMenu = () => {
    const data = [
        {
            heading: "Thương hiệu điện thoại",
            listItem: [
                "Samsung",
                "iPhone",
                "Xiaomi",
                'OPPO',
                "realme",
                "vivo",
                "Nokia",
                "ASUS",
                "Nubia",
                "TECNO",
                "Infinix",
                "OnePlus",
                "Itel",
                "TCL",
                "Điện thoại phổ thông"
            ]
        },
        {
            heading: "Thương hiệu điện thoại",
            listItem: [
                "Samsung",
                "iPhone",
                "Xiaomi",
                'OPPO',
                "realme",
                "vivo",
                "Nokia",
                "ASUS",
                "Nubia",
                "TECNO",
                "Infinix",
                "OnePlus",
                "Itel",
                "TCL",
                "Điện thoại phổ thông"
            ]
        },
        {
            heading: "Thương hiệu điện thoại",
            listItem: [
                "Samsung",
                "iPhone",
                "Xiaomi",
                'OPPO',
                "realme",
                "vivo",
                "Nokia",
                "ASUS",
                "Nubia",
                "TECNO",
                "Infinix",
                "OnePlus",
                "Itel",
                "TCL",
                "Điện thoại phổ thông"
            ]
        },
        {
            heading: "Thương hiệu điện thoại",
            listItem: [
                "Samsung",
                "iPhone",
                "Xiaomi",
                'OPPO',
                "realme",
                "vivo",
                "Nokia",
                "ASUS",
                "Nubia",
                "TECNO",
                "Infinix",
                "OnePlus",
                "Itel",
                "TCL",
                "Điện thoại phổ thông"
            ]
        },
        {
            heading: "Thương hiệu điện thoại",
            listItem: [
                "Samsung",
                "iPhone",
                "Xiaomi",
                'OPPO',
                "realme",
                "vivo",
                "Nokia",
                "ASUS",
                "Nubia",
                "TECNO",
                "Infinix",
                "OnePlus",
                "Itel",
                "TCL",
                "Điện thoại phổ thông"
            ]
        },
    ]
    return (
        <div className="shadow-custom w-full flex gap-4 p-3 justify-between flex-wrap rounded-borderContnet">
            {data?.length > 0 && data.map((item, index) => (
                <MenuItem data={item} key={index} />
            ))}
        </div>
    );
}

export default ModalMenu;