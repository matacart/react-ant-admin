import SuccessTag from "@/components/Tag/SuccessTag";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Tooltip } from "antd";
import styled from "styled-components";

export default function Employee() {
  return(
    <Scoped>
        <Card>
            <Flex justify="space-between">
                <div>
                    <div className="color-242833 font-w-600">员工</div>
                    <div className="color-7A8499">
                        已邀请0个，剩余可邀请10个
                        <Tooltip color={"#FFFFFF"} title={<div style={{color:"rgb(36 40 51)"}}>您可邀请的员工数量由您购买的套餐决定 。若需要增加数量，可点击 <a>升级套餐</a></div>}>
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </div>
                </div>
                <Button>添加员工</Button>
            </Flex>
            {/* no employee */}
            <div className="employee-data-box">
                <div className="color-7A8499">暂无数据</div>
            </div>
        </Card>
    </Scoped>
    
  );
}

const Scoped = styled.div`
   .employee-data-box{
        margin-top: 20px;
   }
`