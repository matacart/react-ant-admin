import { Card, Checkbox } from "antd"
import styled from "styled-components"


export default function MultipleStylesCard() {
  return (
    <Scoped>
        <Card title='多款式'>
            <Checkbox value={'1'}>此商品有多个款式</Checkbox>
        </Card>
    </Scoped>
  )
}


const Scoped = styled.div`
.ant{
    &-card{
        &-head-title{
            font-weight: 400;
        }
        label{
            font-weight: 600;
        }
    }
    &-checkbox-wrapper{
        span{
            font-weight: 400;
        }
    }
    &-input{
            width: 100%;
            height: 36px;
    } 
}
`