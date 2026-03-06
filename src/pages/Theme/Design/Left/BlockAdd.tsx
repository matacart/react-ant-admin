import { EditorAddIcon } from "@/components/Icons/Icons";
import { generateId } from "@/utils/dataStructure";
import { useIntl } from "@umijs/max";
import { Flex, Popover, Tooltip } from "antd";

function BlockAdd({current,maxBlock}:{current:number,maxBlock:number}) {

    const intl = useIntl();

    // 添加内容
    const AddBlockContent = (id:string,type:string,blocks:any[],popoverId:string,sectionId:string)=>{
        return (
            <div className="add-block-content">
                <div className="title color-242833">添加内容</div>
                <div className="item-box">
                    {blocks?.map((item,index)=>(
                        <Flex className="item" key={index} gap={8} onClick={(e)=>{
                            e.stopPropagation();
                            let newSettings:any = {};
                            item.settings.forEach((element:any) => {
                                if(element.default !== undefined){
                                    newSettings[element.id] = {
                                        value:element.default
                                    }
                                }
                            });
                            const block = {
                                type:item.type,
                                settings:newSettings
                            }
                            // 生成随机id
                            const blockOrder = generateId();
                            // editor.addComponentBlock(id,type,block,blockOrder)
                            // // 添加完成后隐藏对应的Popover
                            // handlePopoverOpenChange(popoverId, false)
                            // // 设置组件选中项 需要blockorder
                            // setActiveCollapsed(blockOrder)
                            // editor.setComponent({id:sectionId,type:'section',itemId:blockOrder})
                        }}>
                            <img style={{width:"20px"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSA0QzE5LjU1MjMgNCAyMCA0LjQ0NzcyIDIwIDVMMjAgOS41TDE5IDkuNUMxOC40NDc3IDkuNSAxOCA5LjA1MjI4IDE4IDguNUwxOCA2TDE1LjUgNkMxNC45NDc3IDYgMTQuNSA1LjU1MjI4IDE0LjUgNUwxNC41IDRMMTkgNFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDIwQzQuNDQ3NzIgMjAgNCAxOS41NTIzIDQgMTlMNCAxNC41TDUgMTQuNUM1LjU1MjI5IDE0LjUgNiAxNC45NDc3IDYgMTUuNUw2IDE4TDguNSAxOEM5LjA1MjI4IDE4IDkuNSAxOC40NDc3IDkuNSAxOUw5LjUgMjBMNSAyMFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDVDNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMOS41IDRWNUM5LjUgNS41NTIyOCA5LjA1MjI4IDYgOC41IDZMNiA2TDYgOC41QzYgOS4wNTIyOCA1LjU1MjI4IDkuNSA1IDkuNUg0TDQgNVoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAxOUMyMCAxOS41NTIzIDE5LjU1MjMgMjAgMTkgMjBMMTQuNSAyMEwxNC41IDE5QzE0LjUgMTguNDQ3NyAxNC45NDc3IDE4IDE1LjUgMThMMTggMThMMTggMTUuNUMxOCAxNC45NDc3IDE4LjQ0NzcgMTQuNSAxOSAxNC41TDIwIDE0LjVMMjAgMTlaIiBmaWxsPSIjNDc0RjVFIi8+Cjwvc3ZnPgo=" />
                            <div>{intl.formatMessage({id: item.name})}</div>
                        </Flex>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <Popover
            open={popoverStates[popoverId] || false}
            onOpenChange={(open) => current == maxBlock ? ()=>{} : handlePopoverOpenChange(popoverId,open)}
            getPopupContainer={()=>mRef.current!}
            styles={{
                body: {
                    padding: 0,
                    marginLeft: "12px"
                }
            }}
            placement="rightTop" 
            arrow={false} 
            trigger={"click"} 
            // content={()=>AddBlockContent(res.id,res.type,res.config.schema.blocks,popoverId,sectionId)}
        >
            <Tooltip placement="top" title={`添加内容 (${current}/${maxBlock})`}>
                <div style={{cursor: current == maxBlock ? "not-allowed" : "pointer"}} onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                    <EditorAddIcon />
                </div>
            </Tooltip>
        </Popover>
    )
}

export default BlockAdd;