import DefaultButton from "@/components/Button/DefaultButton";
import { HelpIcon, LeftIcon, PreviewIcon, RemitIcon, TiledIcon, UnfoldIcon } from "@/components/Icons/Icons";
import LangSelect from "@/components/Select/LangSelect";
import MySelect from "@/components/Select/MySelect";
import codeEditor from "@/store/theme/codeEditor";
import { history } from "@umijs/max";
import { Flex, Modal, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ItemType{
    title: React.ReactNode,
    onClick: () => void
}

function Header({templateId,languageId}:{templateId:string,languageId:string}){

    const navigate = useNavigate();

    const itemList = [
        {
            title: <>
                <Tooltip title="设计">
                    <TiledIcon className="font-20" />
                </Tooltip>
            </>,
            onClick: () => {
                history.push(`/theme/editor?templateId=${templateId}&languagesId=${languageId}&templateName=templates/index.json`)
                console.log("design")
            }
        },
        {
            title: <>
                <Tooltip title="定制">
                    <HelpIcon className="font-20" />
                </Tooltip>
            </>,
            onClick: () => {
                const myModal = Modal.info({
                    title: '主题定制协助',
                    centered: true,
                    content: (
                      <div>
                        <p>您好, MATACART团队可提供定制主题服务，如需帮助，请联系 theme.support@matacart.com</p>
                      </div>
                    ),
                    footer: [
                        <Flex justify="flex-end">
                            <DefaultButton onClick={() => myModal.destroy()} text="确定" />
                        </Flex>
                    ],
                });
            }
        },
        {
            title: <>
                <Tooltip title="下载">
                    <RemitIcon className="font-20" />
                </Tooltip>
            </>,
            onClick: () => {}
        },
        {
            
            title: <>
                <Tooltip title="预览">
                    <PreviewIcon className="font-20" />
                </Tooltip>
            </>,
            onClick: () => {}
        }
    ]

    const setMode = (value:string)=>{
        codeEditor.setMode(value)
    }

    const setLang = (value:string)=>{
        codeEditor.setLanguageId(value);
    }

    return (
        <Scoped className="header">
            <Flex className='back cursor-pointer' align="center" justify="center" onClick={()=>navigate(`/website/shopSetting`)}>
                <LeftIcon className='font-20' />
            </Flex>
            <Flex className='title' align="flex-end" gap={14}>
                <div className="color-242833 font-20 font-w-600">编辑 {codeEditor.templateInfo?.name} 的模板代码</div>
                <div className="color-7A8499 font-14 font-w-600">模板ID: {codeEditor.templateInfo?.id}</div>
            </Flex>
            <Flex className="title-bar" justify="flex-end" gap={8}>
                <Flex align="center">
                    <div>模式：</div>
                    <MySelect
                        defaultValue={codeEditor.mode}
                        options={[
                            { value: 'auto', label: '智能模式' },
                            { value: 'original', label: '开发模式' },
                            { value: 'mapping', label: '用户模式' },
                        ]} style={{height:"36px",width:"100px"}} 
                        onChange={setMode} 
                    />
                </Flex>
                <LangSelect lang={codeEditor.languageId} setLang={setLang} />
                {itemList.map((item:ItemType,index:number)=>(
                    <Flex key={index} className="item color-474F5E" align="center" gap={8}>
                        <div className="font-14 color-474F5E" onClick={item.onClick}>{item.title}</div>
                    </Flex>
                ))}
            </Flex>
        </Scoped>
    );
}

const Scoped = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 60px;
    .back{
        width: 36px;
        height: 36px;
        margin-right: 12px;
        border: 1px solid #b8becc;
        border-radius: 4px;
        cursor: pointer;
    }

    .title-bar{
        flex: 1;
        .item{
            cursor: pointer;
        }
        .languageItem{
            .openIcon{

            }
        }
    }

`;


export default observer(Header);

