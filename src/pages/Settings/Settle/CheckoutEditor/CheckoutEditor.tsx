import styled from "styled-components"
import { Flex, Spin } from "antd"
import { useEffect, useState } from "react"
import noticeEmail from "@/store/settings/notification/noticeEmail"
import { useIntl, useParams } from "@umijs/max"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { observer } from "mobx-react-lite"
import { App } from 'antd';
import { LoadingOutlined } from "@ant-design/icons"
import Header from "./Header"
import Left from "./Left"
import config from "./config.json"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"

function CheckoutEditor() {
    
    const intl = useIntl();
    
    const params = useParams<{key:string}>();

    const [isSkeleton, setIsSkeleton] = useState(true);
    const [spinning, setSpinning] = useState(false);
   

    useEffect(()=>{
        const fetchData =  async ()=>{
            // 生成临时编号
        }
        fetchData();
        return () => {
            // 组件卸载时重置
            noticeEmail.reset();
        };
    },[])
    

    // 店铺语言变化，重新获取数据
    useEffect(()=>{
        checkoutEditor.setConfig(config);
        setIsSkeleton(false);
    },[noticeEmail.languagesId,noticeEmail.useLanguagesId])
    
    return (
        <Scoped>
            <App>
            {isSkeleton?<SkeletonCard />:<Spin spinning={spinning} indicator={<LoadingOutlined spin />}>
                <Header spinning={spinning} setSpinning={setSpinning} />
                <Flex style={{height:"calc(100vh - 60px)"}}>
                    <Left />
                    {/* <Main setSpinning={setSpinning} /> */}
                </Flex>
            </Spin>}
            </App>
        </Scoped>
    )
}
export default observer(CheckoutEditor);

const Scoped = styled.div`
    background-color: #eaedf1;
    height: 100vh;
`