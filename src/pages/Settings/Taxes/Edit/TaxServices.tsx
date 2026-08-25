import { DollarOutlined, ExportOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import styled from "styled-components";

function TaxServices(){
    return <MyCard>
        <div>
            <div className="font-w-500">当前税务服务</div>
            <div className="font-12">使用税费服务自动计算税费或者手动设定基本销售税及关税。<a>了解更多<ExportOutlined style={{position:"relative",left:"2px"}} /></a></div>
        </div>
        <Flex className="content-warp">
            <Flex className="logo-box" align="center" justify="center">
                <DollarOutlined style={{fontSize:"24px"}} />
            </Flex>
            <div style={{marginLeft:"12px"}}>
                <div className="font-w-500">基本销售税及关税</div>
                <div className="font-12 color-62708D">基本销售税是指在商品销售过程中，根据商品的销售价格和销售数量，计算出的税费。</div>
            </div>
        </Flex>
    </MyCard>
}

const MyCard = styled(Card)`
    .ant-card-body{
        padding:20px;
    }
    .content-warp{
        margin-top:12px;
        .logo-box{
            background-color: #fff;
            height: 40px;
            min-width: 40px;
            border-radius: 4px;
            border: 1px solid #e5e5e5;
        }
    }
`

export default TaxServices