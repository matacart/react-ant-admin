import { Card } from "antd";
import styled from "styled-components";
import MyTextArea from "@/components/Input/MyTextArea";


function RemarkCard() {

    return (
        <Scoped>
            <Card className='remark-card' title={<div>备注</div>}>
                <MyTextArea
                    showCount
                    maxLength={500}
                    onChange={()=>{}}
                    placeholder="备注内容不会展示给客户"
                    style={{ height: 120, resize: 'none' }}
                />
            </Card>
        </Scoped>
        
    )
}

export default RemarkCard


const Scoped = styled.div`
    .remark-card{
        padding-bottom: 12px;
    }
`