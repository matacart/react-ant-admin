import { ExportIcon } from "@/components/Icons/Icons";
import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex, Select, Switch, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";



function AgreementAndPolicy() {

    const [isShared,setIsShared] = useState(false)
    
    return (
        <Scoped>
            <Card>
                <div className="color-242833">当前账号于2025-02-05 10:16:04完成账号注册并勾选<a className="color-356DFF" style={{margin:"0 8px"}}>用户协议<ExportIcon className="font-16" /></a>与<a className="color-356DFF" style={{margin:"0 8px"}}>隐私政策<ExportIcon className="font-16" /></a></div>
                <Divider className="divider" />
                <div style={{marginBottom:"8px"}}>共享数据</div>
                <div className="color-474F5E">您的账号在 MataCart 后台的操作数据，将共享给 MataCart 官方的分析工具。您共享的数据将有助于我们改善产品、开展与您更加相关的营销活动、为您提供个性化的推荐等。</div>
                <Flex className="switch-box">
                    <Switch onChange={(checked)=>setIsShared(checked)} />
                    {isShared ? <div className="color-474F5E switch-text">已开启<span className="font-12 color-7A8499">（于 2025-02-24 13:55:28 手动操作开闭）</span></div>:<div className="color-474F5E switch-text">已关闭<span className="font-12 color-7A8499">（于 2025-02-24 13:55:28 手动操作关闭）</span></div>}
                </Flex>
            </Card>
        </Scoped>
    )

}

export default AgreementAndPolicy;

const Scoped = styled.div`
    margin-bottom: 20px;

    .divider{
        margin:12px 0;
    }

    .switch-box{
        margin-top: 20px;
        .switch-text{
            margin-left: 12px;
        }
    }

`
