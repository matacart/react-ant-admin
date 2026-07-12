import styled from "styled-components";
import FilterGroup from "./FilterGroup";

function TableCard() {
  return (
    <Scoped>
      <div className="title">数据</div>
      <FilterGroup />
    </Scoped>
  )
}

export default TableCard;

const Scoped = styled.div`
    .title{
        margin:20px 0;
    }
`
