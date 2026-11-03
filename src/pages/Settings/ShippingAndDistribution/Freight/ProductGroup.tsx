import { useEffect } from "react"

function ProductGroup() {

    useEffect(()=>{
        console.log("ProductGroup")
    },[])

    return (
        <div>
            <div>商品分组</div>
        </div>
    )
}
export default ProductGroup