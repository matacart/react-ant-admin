import { Avatar, Card, Flex, List } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react";
import { FoldIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { queryProductGroupGoods } from "@/services/y2/apiLogistics";
import generalFreight from "@/store/settings/ShippingAndDistribution/generalFreight";

interface ProductType{
    productId:string;
    title:string;
    image:string;
}

function ApplicableGoods() {

    const [isExpansionDetails, setIsExpansionDetails] = useState(false);

    const [loading, setLoading] = useState(false);

    const [goodPagination, setGoodPagination] = useState({
        position: "bottom" as const,
        align: "end" as const,
        pageSizeOptions:[5,10,20,50],
        current:1,
        pageSize:5,
        total: 0,
    });

    const [goodsList, setGoodsList] = useState<ProductType[]>([]);

    useEffect(()=>{
        setLoading(true);
        queryProductGroupGoods({
            languages_id:generalFreight.language,
            productGroupSeq:"1",
            pageNum:goodPagination.current,
            pageSize:goodPagination.pageSize,
        }).then(res=>{
            setGoodPagination({
                ...goodPagination,
                total:res.data.total,
            })
            setGoodsList(res.data.list);
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    },[generalFreight.language,goodPagination.current,goodPagination.pageSize])
    
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <div className="color-242833 font-16 font-w-600">适用商品</div>
                <Flex>
                    <div style={{marginRight:"8px"}}>共 {goodPagination.total} 件商品，不包含在其他自定义商品分组中的所有商品</div>
                    <Flex align="center" className="cursor-pointer" onClick={()=>setIsExpansionDetails(!isExpansionDetails)} >
                        {isExpansionDetails?<><span className="color-356DFF">隐藏详情</span><FoldIcon className="font-20 color-356DFF" /></>:<><span className="color-356DFF">查看详情</span><UnfoldIcon className="font-20 color-356DFF" /></>}
                    </Flex>
                </Flex>
                {isExpansionDetails?<List
                    className="goods-list"
                    loading={loading}
                    pagination={{
                        ...goodPagination,
                        onChange: (page, pageSize) => {
                            setGoodPagination({
                                ...goodPagination,
                                current:page,
                                pageSize:pageSize,
                            })
                        }
                    }}
                    dataSource={goodsList}
                    renderItem={(item, index) => (
                        <List.Item key={item.productId} className="goods-item">
                            <Flex align="center">
                                <Avatar shape="square" size="large" src={(item.image && item.image!=="")?item.image+"?x-oss-process=image/resize,w_100":"/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"} />
                                <div style={{marginLeft:"12px"}}>{item.title}</div>
                            </Flex>
                        </List.Item>
                    )}
                />:null}
            </Card>
        </Scoped>
    )
}

export default ApplicableGoods

const Scoped = styled.div`
    .content-box{
        margin-bottom: 12px;
    }
    .goods-list{
        margin-top: 20px;
        .goods-item{
            padding: 12px;
        }
    }
    .ant-list-items{
        border: 1px solid #eef1f7;
        border-bottom: none;
        border-radius: 4px;
    }
`