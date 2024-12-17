import newCategories from "@/store/categories/newCategories"
import { Card, Checkbox, Flex, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"


 function Recommendation(){
    
    // const onChange = (checked: boolean) => {
    //     console.log(`switch to ${checked}`);
    //     newStore.setAllianceStatus(checked?'1':'0')
    // };

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">显示位置
                        {/* <Tooltip title="客户可以把商品添加到精选联盟商品库，供达人选品推广">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip> */}
                    </span>
                </div>
                <div className="item between">
                    <Flex gap="8px 8px" wrap>
                        <span><Checkbox defaultChecked={newCategories.isHome} onChange={(e)=>{newCategories.setIsHome(e.target.checked)}}>首页</Checkbox></span>
                        <span><Checkbox defaultChecked={newCategories.isHot} onChange={(e)=>{newCategories.setIsHot(e.target.checked)}}>热销</Checkbox></span>
                        <span><Checkbox defaultChecked={newCategories.isBest} onChange={(e)=>{newCategories.setIsBest(e.target.checked)}}>精品</Checkbox></span>
                        <span><Checkbox defaultChecked={newCategories.isNew} onChange={(e)=>{newCategories.setIsNew(e.target.checked)}}>新品</Checkbox></span>
                    </Flex>
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(Recommendation)

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}
.item{
        /* margin-bottom: 10px; */
        margin-top: 12px;
}
.between{
    display: flex;
    justify-content: space-between;
}
a{
    font-weight: 400;
}
`
