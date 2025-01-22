import SuccessTag from "@/components/Tag/SuccessTag";
import { ArrowLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "@umijs/max";
import { Button, Card, Col, Flex, message, Row, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";

// 信息
interface ProductDetail {
    title:string;
    content: string;
    content1: string;
    // 商品图片/视频
    // selectedImgList: UploadFile[];
    // price:valueType;
    // originPrice:valueType;
    // specialprice:valueType;
    // sku:string;
    // ISBN:string;
    // quantity:number;
    // inventoryTracking:boolean;
    // continueSell:boolean;
    // status:string;
    // weight:string;
    // tag:string;
}

// export const MyContext = createContext({});

function Index() {
    // 获取商品详情
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
    const navigate = useNavigate(); // 使用 useNavigate 钩子
    const params = new URL(location.href).searchParams

    const {variantsId} = useParams()
    // 提示
    const [style, setStyle] = useState([]);
    // 商品存档
    const [productStatus,setProductStatus] = useState("");

    const [onFile,setOnFile] = useState(false);
    
    const [isLoading,setIsLoading] = useState(false);
    const [saveLoading,setSaveLoading] = useState(false);
    const [language,setLanguage] = useState("");

    
    // 变体---控制变体组合
    const [onVariant,setOnVariant] = useState(false);

    // 删除
    
    
    

    
    const fetchProductDetail = async (language?:string) => {
        setIsLoading(true)
        try {
            setProductDetail(response.data);
            if(response.data){
                setProductStatus(response.data.status);
            } else {
                console.error('Invalid data format:', response);
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
        setIsLoading(false)
    };

    // 在组件加载时调用 fetchProductDetail
    useEffect(() => {
    },[]);
    
    const prevProduct=(id:string)=>{
        if(id==="" || id===null){
            message.error("这是第一个商品")
        }else{
            history.push(`/products/edit/${id}/${oldStore.language}`)
        }
    }
    const nextProduct=(id:string)=>{
        if(id==="" || id===null){
            message.error("这是最后一个商品")
        }else{
            history.push(`/products/edit/${id}/${oldStore.language}`)
        }
    }
    return (
        <div>
            {/* 弹窗 */}
            <Scoped>
                <Spin spinning={isLoading}>
                    <div className='mc-layout-wrap'>
                        <div className="mc-layout">
                            <div className="mc-header">
                                <div className="mc-header-left">
                                    <div className="mc-header-left-secondary" onClick={() => {
                                        navigate('/products/index')
                                    }}>
                                    <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                    </div>
                                    <div className="mc-header-left-content">{123}</div>
                                </div>
                                <div className='mc-header-right'>
                                    <Button size="large" onClick={()=>{
                                        // prevProduct(oldStore.prevProductId)
                                    }} autoInsertSpace={false}>
                                        <LeftOutlined />
                                    </Button>
                                    <Button size="large" onClick={()=>{
                                        // nextProduct(oldStore.nextProductId)
                                    }} autoInsertSpace={false}>
                                        <RightOutlined />
                                    </Button>
                                    {/* 分 */}
                                    <div style={{borderRight:"1px solid #d7dbe7",height:"36px",marginRight:'8px'}}></div>
                                    <Button onClick={()=>{
                                        message.success('复制成功')
                                    }} size="large" autoInsertSpace={false}>
                                        复制
                                    </Button>
                                </div>
                            </div>
                            <Row gutter={[20,0]}>
                                <Col span={6}>
                                    <div className="mc-layout-side">
                                        <div className="mc-layout-side-title">
                                            <div className="img_box">
                                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEwIiBoZWlnaHQ9IjExMCIgdmlld0JveD0iMCAwIDExMCAxMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjExMCIgaGVpZ2h0PSIxMTAiIHJ4PSI2IiBmaWxsPSIjRjdGOEZCIi8+PHBhdGggZD0iTTQ0IDQ4LjRhMi4yIDIuMiAwIDEgMCA0LjQgMCAyLjIgMi4yIDAgMCAwLTQuNCAweiIgZmlsbD0iI0Q3REJFNyIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzcuOTUgNDIuOWEyLjc1IDIuNzUgMCAwIDEgMi43NS0yLjc1aDI4LjZhMi43NSAyLjc1IDAgMCAxIDIuNzUgMi43NXYyNC4yYTIuNzUgMi43NSAwIDAgMS0yLjc1IDIuNzVINDAuN2EyLjc1IDIuNzUgMCAwIDEtMi43NS0yLjc1VjQyLjl6bTMuMy41NXYyMy4xaDI3LjV2LTIzLjFoLTI3LjV6IiBmaWxsPSIjRDdEQkU3Ii8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02MS42NDMgNTIuODRsNy43MjggNy43MjcgMi4zMzMtMi4zMzQtOC4xMy04LjEzYTIuNzUgMi43NSAwIDAgMC0zLjk2LjA3MmwtNy40MDMgNy45NjMtMy4wMTYtMi45NDRhMi43NSAyLjc1IDAgMCAwLTMuOTM1LjA5NWwtNi44NjggNy4zODcgMi40MTYgMi4yNDggNi40ODUtNi45NzYgMy4wMTYgMi45NDVhMi43NSAyLjc1IDAgMCAwIDMuOTM1LS4wOTVsNy40LTcuOTU5eiIgZmlsbD0iI0Q3REJFNyIvPjwvc3ZnPg==" />
                                            </div>
                                            <div className="title_info">
                                                <div className="title_info_text color-474F5E">大苏打大苏打飒飒大啊大苏打盛大的撒打撒打撒打撒打撒打撒打撒打撒萨达撒啊撒大大飒飒大苏打撒旦</div>
                                                <SuccessTag text="上架"/>
                                            </div>
                                        </div>
                                        <div className="mc-layout-side-list">
                                            <div className="mc-layout-side-list-item">9个款式</div>
                                            <div></div>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={18}>
                                    <div className='mc-layout-main'>
                                        <div className='mc-layout-content'>
                                            <Card title={"款式"}>222</Card>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Spin> 
            </Scoped>
        </div>
    )
}

export default observer(Index);

const Scoped = styled.div`
    .mc-layout-wrap {
        display: flex;
        justify-content: center;
        min-width: 510px;
        .mc-layout {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            .mc-header {
                color: rgb(36, 40, 51);
                font-size: 30px;
                height: 42px;
                font-weight: bold;
                margin: 8px 0px 24px;

                display: flex;
                justify-content: space-between;
                align-items: center;

                &-left {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    &-secondary {
                        height: 32px;
                        width: 32px;
                        border: 1px solid #d7dbe7;
                        border-radius: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:hover {
                            background-color: #eaf0ff;
                            cursor: pointer;
                        }
                        &-icon {
                            font-size: 18px;
                        }
                    }
                    &-content {
                        margin-left: 12px;
                        font-size: 20px;
                    }
                }
                &-right {
                    display: flex;
                    align-items: center;
                    /* width: 70px; */
                    > .selector {
                        height: 36px;
                    }
                    Button{
                        height: 36px;
                        margin-right: 8px;
                    }
                }
            }
            .mc-layout-side{
                background-color: #FFF;
                padding: 24px 0;
                .mc-layout-side-title{
                    display: flex;
                    margin: 0 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eef1f7;
                    .img_box{
                        width: 80px;
                        height: 80px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .title_info{
                        margin-left: 10px;
                        /* width: 140px; */
                        flex: 1;
                        .title_info_text{
                            margin-bottom: 6px;
                        }
                    }
                }
                .mc-layout-side-list{
                    &-item{
                        margin:10px 10px
                    }
                }
            }
            &-main {
                
            }

            /* &-content {
                flex: 9;
                min-width: 510px;

                display: flex;
                flex-direction: column;
                gap: 20px;
            } */

            /* &-extra {
                flex: 1;
                min-width: 285px;
                display: flex;
                flex-direction: column;
                gap: 20px;

                .ant-card {
                    background-color: #f7f8fb;
                }
            }

            .mc-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                
          
            } */
        }
    }

    a {
        font-weight: 400;
    }
`;
