import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

export default function DangerButton(){
    
    return (
        <Scoped>
            {/* 回退 */}
            <Button type="primary" style={{height:36,backgroundColor:"#F86140",color:"#FFFFFF"}} className="btn">
                停用 货到付款
            </Button>
        </Scoped>
    )
}

const Scoped = styled.div`
    .btn{
    }
`