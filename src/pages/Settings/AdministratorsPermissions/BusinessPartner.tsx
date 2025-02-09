import SuccessTag from "@/components/Tag/SuccessTag";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Tooltip } from "antd";
import styled from "styled-components";

export default function BusinessPartner() {
  return(
    <Scoped>
        <Card>
            <div>
                <div className="color-242833 font-w-600">合作伙伴</div>
                <div className="color-7A8499">
                    允许开发者、代运营、设计师进入店铺辅助经营，合作伙伴人数不计入员工数量限制。
                </div>
            </div>
            {/* no BusinessPartner */}
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