import { ArrowLeftOutlined, ExportOutlined } from '@ant-design/icons'
import { App, Card, Flex } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
// 使用 @monaco-editor/react 组件
import MonacoEditor from '@monaco-editor/react';
import { getPrimaryDomain } from '@/utils/dataStructure';
import DefaultButton from '@/components/Button/DefaultButton';
import { getRobotsTxtConfig, resetRobotsTxtConfig, updateRobotsTxtConfig } from '@/services/y2/api';

function Index(){
    
    const { message } = App.useApp();

    const previewDomain = getPrimaryDomain();

    const [loading,setLoading] = useState(false);

    const [code,setCode] = useState("");

    const submit = ()=>{
        setLoading(true);
        updateRobotsTxtConfig({
            robots_content:code,
        }).then((res)=>{
            message.success("更新成功");
        }).catch(()=>{
            message.error("更新失败");
        }).finally(()=>{
            setLoading(false);
        })
    }

    // 重置为默认
    const reset = ()=>{
        resetRobotsTxtConfig().then((res)=>{
            // 重置成功后，刷新当前页面的robots.txt配置
            if(res.code == 0){
                getRobotsTxtConfig().then((res)=>{
                    res.code == 0 && setCode(res.data || "")
                })
            }
        }).catch(()=>{
            message.error("重置失败");
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        getRobotsTxtConfig().then((res)=>{
            res.code == 0 && setCode(res.data || "")
        })
    },[])

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/website/preferences')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">
                                Robots编辑器
                            </div>
                        </div>
                    </div>
                    <div className='mc-header-description'>
                        你可以编辑robots.txt文件，让搜索引擎知道要索引哪些网站页面。
                        <a>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a>
                    </div>
                    <div className='mc-layout-main'>
                        <Card>
                            <Flex className='header' justify='space-between' align='center'>
                                <div>
                                    <div className='font-w-500'>你的robots.txt文件</div>
                                    <div className='font-12'>文件地址：<a href={`${previewDomain}/robots.txt`} target="_blank">{previewDomain}/robots.txt</a></div>
                                </div>
                                <div className='reset color-356DFF cursor-pointer' onClick={reset}>重置为默认</div>
                            </Flex>
                            <div className='monaco-editor-box'>
                                <MonacoEditor
                                    height="100%"
                                    // language={language}
                                    value={code}
                                    onChange={(newValue) => setCode(newValue || "")}
                                    // onMount={handleEditorDidMount}
                                    theme="vs"
                                    options={{
                                        minimap: { enabled: true },
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </Card>
                        <Flex gap={20} style={{marginTop:"20px"}}>
                            <div className='normal-card'>
                                <h2>什么是Robots.txt文件？</h2>
                                <p>了解这种文件与无索引还有其他SEO设定有何不同。</p>
                                <DefaultButton text='在Google上查看' onClick={()=>window.open(`https://developers.google.com/search/docs/crawling-indexing/robots/intro`)} />
                            </div>
                            <div className='normal-card card2' >
                                <h2>如何编写Robots.txt文件？</h2>
                                <p>查阅Google撰写的编辑Robots.txt文件的准则。</p>
                                <DefaultButton text='在Google上查看' onClick={()=>window.open(`https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt`)} />
                            </div>
                        </Flex>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <PrimaryButton loading={loading} onClick={submit} text='更新' />
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(Index)

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
            margin: 8px 0px 0px;
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
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
        }
        .mc-header-description{
            margin-left: 44px;
        }
        .mc-layout-main{
            margin-top: 12px;
            .header{
                margin-bottom: 12px;
                .reset{
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
            .monaco-editor-box{
                border: 1px solid #d7dbe7;
                border-radius: 4px;
                height: 480px;
            }
            .normal-card{
                flex:1;
                padding: 16px;
                background-image: url("/img/robot-background-1.svg");
                background-repeat: no-repeat;
                background-position: right center;
                background-color: #FFFFFF;
                border: 1px solid #d7dbe7;
                border-radius: 6px;
                h2{
                    font-size: 14px;
                }
                p{
                    font-size: 12px;
                }
            }
            .card2{
                background-image: url("/img/robot-background-2.svg");
            }
        }
        .mc-footer{
            display:flex;
            flex-direction: row-reverse;
        }
    }
}
`