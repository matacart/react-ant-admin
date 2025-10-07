import { Input } from "antd";

const { TextArea } = Input;

function ItemTextArea(){

    return (
        <TextArea
            placeholder="输入文案"
            autoSize={{ minRows: 5, maxRows: 5 }}
        />
    )
}

export default ItemTextArea