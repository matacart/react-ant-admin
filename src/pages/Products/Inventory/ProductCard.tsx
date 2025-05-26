import ProductListAjax from "./ProductListAjax"
import ProductsSelectCard from "./ProductsSelectCard"

function ProductCard(){
    return(
        // 筛选
        <>
            <ProductsSelectCard />
            <ProductListAjax />
        </>
        // 表格
    )
}

export default ProductCard