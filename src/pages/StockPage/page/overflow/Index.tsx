import styled from "styled-components";
import TableCard from "./TableCard";
import CountCard from "./CountCard";
import MyAlert from "@/components/Alert/MyAlert";

function Index() {
  return (
    <Scoped>
      {/* 库存预警提示 */}
      <MyAlert message="请至少保留一种联系信息" showIcon closable type="warning" style={{
        height:"38px",
        width:"100%",
        backgroundColor:"#FFEDC9"
      }} />
      {/* 溢出处理 */}
      <CountCard />
      {/* 溢出处理示例 */}
      <TableCard />
    </Scoped>
  )
}

export default Index;


const Scoped = styled.div`
  padding: 24px;
  width: 100%;
`
