import { Badge, Button, Card, Flex } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";


function Remark() {
    return (
      <MyCard>
          <Flex justify="space-between">
            <span className='title font-16 font-w-600 color-242833'>备注</span>
            <span style={{color:"#1677ff",cursor:"pointer"}}>编辑</span>
          </Flex>
          <div>暂无备注</div>
      </MyCard>
    )
}

const MyCard = styled(Card)`
  background-color: #f7f8fb;
  .title{
    margin-bottom: 20px;
  }
  .search-input-warp{
    margin:20px 0;
  }
`

export default observer(Remark);