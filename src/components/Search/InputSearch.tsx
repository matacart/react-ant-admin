import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";


export default function InputSearch(props:any) {

    const handleOnChange = (e:any) => {
        // props.setSearch(e.target.value)
    }

    return (
        <div>
            <Input prefix={<SearchOutlined />} onChange={handleOnChange} placeholder={props.placeholder} />
        </div>
    )
}