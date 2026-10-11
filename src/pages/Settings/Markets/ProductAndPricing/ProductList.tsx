import { Card, Tabs } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import ProductSelect from "./ProductSelect"
import ProductTable from "./ProductTable"


const ProductCard = ()=>{
    return (
        <div>
            <ProductSelect/>
            <ProductTable />
        </div>
    )
}


function ProductList() {

    const items = [
        {
          label: <div>全部</div>,
          children: (<ProductCard/>),
          key: '1',
          closable: false,
        },
        {
          label: <div>已包含</div>,
          children:  (<ProductCard/>),
          key: '2',
          closable: false,
        },
        {
          label: <div>已排除</div>,
          children:  (<ProductCard/>),
          key: '3',
          closable: false,
        }
    ];


    return (
        <MyCard>
            <>
                <div className="font-12 desc">主要市场的商品价格，由商品的初始定价决定。若要修改，请前往<span className="color-356DFF cursor-pointer" onClick={()=>{
                    window.open(`/products/index`)
                }}>商品</span></div>
                <>
                    <Tabs
                        type="card"
                        items={items}
                    />
                </>
            </>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .desc{
        margin-bottom: 8px;
    }
`

export default observer(ProductList)