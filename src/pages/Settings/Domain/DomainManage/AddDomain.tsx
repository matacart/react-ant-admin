import { ArrowLeftOutlined, CheckCircleFilled} from "@ant-design/icons"
import { Card, Flex, Form, message, Steps, theme } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react";
import SuccessfulTable from "./SuccessfulTable";
import Analyze from "./Analyze";
import { addDomainName, getDomainNameList } from "@/services/y2/api";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import DefaultInput from "@/components/Input/DefaultInput";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { useSleep } from "@/hooks/customHooks";

function AddDomain() {

    const { token } = theme.useToken();

    const sleep = useSleep();

    const previewDomain = '.'+(JSON.parse(localStorage.getItem("MC_DATA_PLATFORM_INFO") || '{}')?.preview_domain || '');

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [form] = Form.useForm();

    const [current, setCurrent] = useState(0);

    const [domainName,setDomainName] = useState("");
    const [otherDomain,setOtherDomain] = useState("");

    const steps = [
        {
            title: <div className="font-w-500 font-14">添加域名</div>,
            content: <div>
                <Card classNames={{body:"card"}}>
                    <div>输入需要添加的域名</div>
                    <div className="card-desc">你可以在Godaddy、阿里云等域名服务商处购买第三方域名，并输入到此处。</div>
                    <Form form={form} layout="vertical">
                        <Form.Item label={"主域名："} rules={[{ required: true }]}>
                            <DefaultInput value={domainName} onChange={(e)=>{
                                setDomainName(e.target.value)
                            }} placeholder="如：www.example.com" />
                        </Form.Item>
                        
                        <Form.Item label={"子域名："}>
                            <DefaultInput value={otherDomain} placeholder="example.com 多个子域名用英文逗号隔开" onChange={(e)=>{
                                setOtherDomain(e.target.value)
                            }} />
                        </Form.Item>
                    </Form>
                    <div className="card-input">
                    </div>
                    <div className="">绑定遇到问题？请查看<a>帮助文档</a></div>
                </Card>
            </div>,
        },
        {
            title: <div className="font-w-500 font-14" style={{}}>解析域名</div>,
            content: <div>
                <Card classNames={{body:"card"}}>
                    <Flex align="center"><CheckCircleFilled className="font-20" style={{color: '#52C41A',marginRight:8}} /><span className="font-w-600 font-16">解析成功</span></Flex>
                    <div className="card-desc">修改后一般10分钟左右生效，若验证不通过请检查记录值或再次验证。</div>
                    <div className="card-input">
                        <Analyze />
                    </div>
                    <div className="">绑定遇到问题？请查看<a>帮助文档</a></div>
                </Card>
            </div>,
        },
        {
            title: <div className="font-w-500 font-14" style={{}}>绑定成功</div>,
            content: <div>
                <Card classNames={{body:"card"}}>
                    <Flex align="center"><CheckCircleFilled className="font-20" style={{color: '#52C41A',marginRight:8}} /><span className="font-w-600 font-16">绑定成功</span></Flex>
                    <div className="card-desc">管理员正在为你的域名激活SSL安全证书，根据域名服务商不同，最快加密时间10分钟，最晚24小时后自动生效。</div>
                    <div className="card-input">
                        <SuccessfulTable domainName={domainName} otherDomain={otherDomain} />
                    </div>
                    <div className="">绑定遇到问题？请查看<a>帮助文档</a></div>
                </Card>
            </div>,
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        borderRadius: token.borderRadiusLG,
    };

    const next = () => {
        setCurrent(current + 1);
      };
    
    const prev = () => {
        setCurrent(current - 1);
    }

    useEffect(()=>{
        getDomainNameList().then(res=>{
            setDomainName(res.data.domain_primary || `${res.data.handle}${previewDomain}` )
            setOtherDomain(res.data.other_domain)
            setIsSkeleton(false)
        })
    },[])



    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/domain/manage")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">添加域名</div>
                        </div>
                        <div className='mc-header-right'>
                            <Steps current={current} status="process" items={items} />
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div style={contentStyle}>
                                {steps[current].content}
                            </div>
                            <div className="submit-btn">
                                {current > 0 && (
                                    <DefaultButton text="上一步" style={{marginRight:12}}  onClick={() => prev()} />
                                )}
                                
                                {current < steps.length - 1 && (
                                    <PrimaryButton text="下一步" disabled={domainName == "" || otherDomain == ""} onClick={() => next()} />
                                )}

                                {current === steps.length - 1 && (
                                    <PrimaryButton text="完成" onClick={() => {
                                        addDomainName(domainName,otherDomain).then(async res=>{
                                            if(res.code == 0){
                                                await sleep(2000);
                                                message.success('Processing complete!')
                                                history.push("/settings/domain/manage")
                                            }else{
                                                message.error(res.msg)
                                            }
                                        }).catch(err=>{
                                            console.log(err);
                                        });
                                    }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default AddDomain

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
                &-content {
                    /* display: flex; */
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
            &-right {
                .ant-steps-item{
                    padding-right: 50px;
                }
                .ant-steps-item:last-child{
                    padding-right: 0px;
                }
            }
        }
        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .card{
                color: #242833;
                .card-desc{
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
                .card-input{
                    margin-bottom: 20px;
                }
            }
            .submit-btn{
                display: flex;
                justify-content: right;
            }
        }
    }
}
`