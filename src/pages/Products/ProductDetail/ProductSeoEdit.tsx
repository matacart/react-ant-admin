// import SEOEdit from "@/components/Select/SEOEdit"
// import globalStore from "@/store/globalStore"
// import oldStore from "@/store/oldStore"
// import { Card } from "antd"
// import { observer } from "mobx-react-lite"
// import { useEffect, useState } from "react"
// import styled from "styled-components"

// const ProductSeoEdit = ()=>{

//     // const [title,setTitle] = useState("333");
//     // const [description,setDescription] = useState("");
//     // const handleEditTitle = (value:string) => {
//     //     setTitle(value)
//     // }
//     // const handleEditDescription = (value:string) => {
//     //     setDescription(value)
//     // }
//     useEffect(()=>{
//         console.log(oldStore)
//     },[])
//     return (
//         <Scoped>
//             <Card className="gap">
//                 <div className="header">
//                     <span className="title">搜索引擎优化</span>
//                     <span className="more">
//                         {/* <SEOEdit /> */}
//                     </span>
//                 </div>
//                 <div className="webUrl">{globalStore.shop.domainName}</div>
//                 <div className="webTitle">{oldStore.title}</div>
//                 {/* 未填写标题 */}
//                 <div className="webDesc">{oldStore.metaDescription}</div>
//             </Card>
//         </Scoped>
//     )
// }

// export default observer(ProductSeoEdit);

// const Scoped = styled.div`
// .gap{
//     display: flex;
//     flex-direction: column;
// }
// .header{
//     display:flex;
//     justify-content: space-between;
//     margin-bottom: 8px;
//     .title{
//         color: #000;
//         font-size: 16px;
//         font-weight:600;
//     }
// }
// a{
//     font-weight: 400;
// }
// .webUrl{
//     font-size: 12px;
// }
// .webTitle{
//     margin-top: 4px;
//     margin-bottom: 0;
//     color: #101aa4;
//     font-size: 20px;
//     font-weight: 600;
//     line-height: 28px;
//     -webkit-line-clamp: 2;
// }
// .webDesc{
//     margin-top: 4px;
//     margin-bottom: 0;
//     color: #474f5e;
//     font-size: 12px;
//     -webkit-line-clamp: 3;
// }




// `

// import globalStore from "@/store/globalStore"
// import newStore from "@/store/newStore"
// import { Card } from "antd"
// import { observer } from "mobx-react"
// import styled from "styled-components"
import newStore from "@/store/newStore"
import { Card } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import SEOEdit from "../components/SEOEdit";
import oldStore from "@/store/product/oldStore";


 function productSeoEdit(){
    // const [title,setTitle] = useState("");
    // const [description,setDescription] = useState("");

    // useEffect(()=>{
    //     console.log(oldStore)
    // },[])
    // const handleEditTitle = (value:string) => {
    //     setTitle(value)
    // }
    // const handleEditDescription = (value:string) => {
    //     setDescription(value)
    // }

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">搜索引擎优化</span>
                    <span className="more">
                        <SEOEdit seo={oldStore} />
                    </span>
                </div>
                <div className="webUrl">{cookie.load("domain").domainName}</div>
                <div className="webTitle">{oldStore.metaTitle==""?(oldStore.title==""?"未填写标题":oldStore.title):oldStore.metaTitle}</div>
                {/* 未填写标题 */}
                <div className="webDesc">{oldStore.metaDescription==""?"未填写描述":oldStore.metaDescription}</div>
            </Card>
        </Scoped>
    )
}
export default observer(productSeoEdit)

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
a{
    font-weight: 400;
}
.webUrl{
    font-size: 12px;
}
.webTitle{
    margin-top: 4px;
    margin-bottom: 0;
    color: #101aa4;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    -webkit-line-clamp: 2;
}
.webDesc{
    margin-top: 4px;
    margin-bottom: 0;
    color: #474f5e;
    font-size: 12px;
    -webkit-line-clamp: 3;
}`

