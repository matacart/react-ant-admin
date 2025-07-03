import { useIntl } from "@/.umi/plugin-locale/localeExports";
import DefaultButton from "@/components/Button/DefaultButton";
import { DragOverlay, useDraggable } from "@dnd-kit/core/dist";
import { Card, Flex } from "antd";
import { action } from "mobx";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type ConditionItem = {
    key: string,
    operator: string | undefined,
    type: number,
    value: number | string[],
    extInfo:any,
    children?: ConditionItem[];
}

type GroupItem = {
    key: string,
    isSubGroup?: boolean;
    operator?: string | undefined,
    type?: number,
    value?: number | string[],
    extInfo?:any
    children?: ConditionItem[];
};

function ConditionCard(){

    const intl = useIntl();

    const containerRef = useRef<HTMLDivElement>(null);

    // 使用 ref 来跟踪是否是点击触发的滚动
    const isProgrammaticScroll = useRef(false);

    const [active,setActive] = useState(1)

    const groupList = [
        {
            id:1,
            key:"baseInfo",
            children:[
                {
                    key: "emailDomain",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: "EQ",componentType: "LIST_PAGE",listSource: "emailDomain"}
                },
                {
                    key: "language",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: "EQ",componentType: "LIST",listSource: "language"}
                },
                {
                    key: "createTime",
                    operator: "BETWEEN",
                    type: 0,
                    value: [],
                    extInfo:{componentType: "DATE",dateType: "CUSTOME"}
                },
                {
                    key: "userSource",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                },
                {
                    key: "platform",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                },
                {
                    key: "status",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                },
                {
                    key: "emailSubscribeStatus",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                },
                {
                    key: "gender",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                },
                {
                    key: "ageLevel",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                },
                {
                    key: "birthdayMonth",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                },
                {
                    key: "address",
                    operator: "EQ",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'ADDRESS'}
                },
                {
                    key: "smsSubscribeStatus",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                },
                {
                    key: "registerTime",
                    operator: "BETWEEN",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                }
            ]
        },
        {
            id:2,
            key:"orderInfo",
            children:[
                {
                    key: "payOrderCnt",
                    operator: "EQ",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'NUMBER'}
                },
                {
                    key: "totalAmount",
                    operator: "EQ",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'PRICE'}
                },
                {
                    key: "singleOrderAmount",
                    relation: "and",
                    type: 1,
                    blockType: 1,
                    children:[
                        {
                            key: "singleOrderAmount",
                            operator: "EQ",
                            type: 0,
                            value: [],
                            extInfo:{componentType: 'PRICE'}
                        },
                        {
                            key: "singleOrderAmountTime",
                            operator: "BETWEEN",
                            type: 0,
                            value: [],
                            extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                        }
                    ]
                },
                {
                    key: "unitPrice",
                    operator: "EQ",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'PRICE'}
                },
                {
                    key: "firstOrderTime",
                    operator: "BETWEEN",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                },
                {
                    key: "lastOrderTime",
                    operator: "BETWEEN",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                },
                {
                    key: "lastAbandonedCreateTime",
                    operator: "BETWEEN",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                }
            ]
        },
        {
            id:3,
            key:"userAction",
            children:[
                {
                    key: "lastLoginTime",
                    operator: "BETWEEN",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                },
                {
                    key: "lastLoginChannel",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'LIST', listSource: 'loginChannel'}
                },
                {
                    key: "loginChannel",
                    blockType: 1,
                    relation: "and",
                    type: 1,
                    children:[
                        {
                            key: "loginChannel",
                            operator: "IN",
                            type: 0,
                            value: [],
                            extInfo:{operatorType: 'EQ', componentType: 'LIST', listSource: 'loginChannel'}
                        },
                        {
                            key: "loginChannelTime",
                            operator: "BETWEEN",
                            type: 0,
                            value: [],
                            extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                        }
                    ]
                },
                {
                    key: "lastCartCreateTime",
                    operator: "BETWEEN",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                },
                {
                    key: "loginCount",
                    operator: "EQ",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'NUMBER'}
                }
            ]
        },
        {
            id:4,
            key:"productInfo",
            children:[
                {
                    key: "purchasedItem",
                    blockType: 1,
                    type: 1,
                    relation: "and",
                    children:[
                        {
                            key: "purchasedItem",
                            operator: "IN",
                            type: 0,
                            value: [],
                            extInfo:{operatorType: 'IN', componentType: 'LIST_PAGE', listSource: 'productList'}
                        },
                        {
                            key: "purchasedItemTime",
                            operator: "BETWEEN",
                            type: 0,
                            value: [],
                            extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                        }
                    ]
                },
                {
                    key: "viewedItem",
                    blockType: 1,
                    type: 1,
                    relation: "and",
                    children:[
                        {
                            key: "viewedItem",
                            operator: "IN",
                            type: 0,
                            value: [],
                            extInfo:{operatorType: 'IN', componentType: 'LIST_PAGE', listSource: 'productList'}
                        },
                        {
                            key: "viewedItemDate",
                            operator: "BETWEEN",
                            type: 0,
                            value: [],
                            extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                        }
                    ]
                },
                {
                    key: "purchasedCate",
                    blockType: 1,
                    type: 1,
                    relation: "and",
                    children:[
                        {
                            key: "purchasedCate",
                            operator: "IN",
                            type: 0,
                            value: [],
                            extInfo:{operatorType: 'IN', componentType: 'LIST', listSource: 'categoryList'}
                        },
                        {
                            key: "purchasedCateTime",
                            operator: "BETWEEN",
                            type: 0,
                            value: [],
                            extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                        }
                    ]
                },
                {
                    key: "viewedCate",
                    blockType: 1,
                    type: 1,
                    relation: "and",
                    children:[
                        {
                            key: "purchasedCate",
                            operator: "IN",
                            type: 0,
                            value: [],
                            extInfo:{operatorType: 'IN', componentType: 'LIST', listSource: 'categoryList'}
                        },
                        {
                            key: "purchasedCateTime",
                            operator: "BETWEEN",
                            type: 0,
                            value: [],
                            extInfo:{componentType: 'DATE', dateType: 'CUSTOME'}
                        }
                    ]
                },
                {
                    key: "preferItemTag",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'IN', componentType: 'LIST_PAGE', listSource: 'productLabelList'}
                },
                {
                    key: "preferCate",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'IN', componentType: 'LIST', listSource: 'categoryList'}
                },
                {
                    key: "preferPrice",
                    operator: "EQ",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'PRICE'}
                },
            ]
        },
        {
            id:5,
            key:"promotion",
            children:[
                {
                    key: "preferActivity",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'IN', componentType: 'ENUM'}
                },
                {
                    key: "preferDiscount",
                    operator: "EQ",
                    type: 0,
                    value: [],
                    extInfo:{componentType: 'PRICE'}
                }
            ]
        },
        {
            id:6,
            key:"customerWorth",
            children:[
                {
                    key: "rfm",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                },
                {
                    key: "customerCycle",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'EQ', componentType: 'ENUM'}
                }
            ]
        },
        {
            id:7,
            key:"customerTag",
            children:[
                {
                    key: "customerTag",
                    operator: "IN",
                    type: 0,
                    value: [],
                    extInfo:{operatorType: 'IN', componentType: 'LIST_PAGE', listSource: 'customerLabelList'}
                }
            ]
        },
        {
            id:8,
            key:"recommendTag",
            children:[
                {
                    key: "attractNew",
                    isSubGroup: true,
                    children:[
                        {
                            key: "isLoginNotPay",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'attractNew', componentType: 'TAG'}
                        },
                        {
                            key: "isAddCartNotPayIn30",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'attractNew', componentType: 'TAG'}
                        },
                        {
                            key: "isAbandonedIn30",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'attractNew', componentType: 'TAG'}
                        },
                        {
                            key: "isNotOrderIn30",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'attractNew', componentType: 'TAG'}
                        }
                    ]
                },
                {
                    key: "oldRepurch",
                    isSubGroup: true,
                    children:[
                        {
                            key: "isFirstOrder",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'oldRepurch', componentType: 'TAG'}
                        },
                        {
                            key: "isRecentHighConsume",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'oldRepurch', componentType: 'TAG'}
                        },
                        {
                            key: "isRecentHighOrder",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'oldRepurch', componentType: 'TAG'}
                        }
                    ]
                },
                {
                    key: "lossRecovery",
                    isSubGroup: true,
                    children:[
                        {
                            key: "isRecentConsumed",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'lossRecovery', componentType: 'TAG'}
                        },
                        {
                            key: "isOnceActived",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'lossRecovery', componentType: 'TAG'}
                        },
                        {
                            key: "isRecentAbandoned",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'lossRecovery', componentType: 'TAG'}
                        }
                    ]
                },
                {
                    key: "keyPperations",
                    isSubGroup: true,
                    children:[
                        {
                            key: "isHighValue",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'keyPperations', componentType: 'TAG'}
                        },
                        {
                            key: "isBirthdayInNextMonth",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'keyPperations', componentType: 'TAG'}
                        },
                        {
                            key: "isRecentActived",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'keyPperations', componentType: 'TAG'}
                        },
                        {
                            key: "isRepurchased",
                            operator: "EQ",
                            type: 0,
                            value: 1,
                            extInfo:{subGroup: 'keyPperations', componentType: 'TAG'}
                        }
                    ]
                },
            ]
        },
    ]

    // 根据id创建可拖拽组件
    function DraggableItem({key,component,id}:{key:string,component:any,id:string}) {
        const style = {
            whiteSpace: "normal",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #d7dbe7"
        }
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id:id,
            data: { key,style,component:component },
        });
        return (
            <>
                <div id={id} ref={setNodeRef} style={style} className="listItem" {...listeners} {...attributes} >
                    <div>{intl.formatMessage({ id: "customer.management.subdivision."+key })}</div>
                </div>
            </>
        );
    }

    // 在组件中添加以下代码
    useEffect(() => {

        const str = {"conditions":{"type":1,"relation":"and","blockType":0,"extInfo":"{\"id\":\"8d9c3af3-d31c-4f8e-a4bb-9fd1eda20601\"}","children":[{"type":1,"relation":"and","blockType":0,"extInfo":"{\"id\":\"4fd22fbc-dbe1-4eac-baa5-e248bd2b9900\"}","children":[{"key":"payOrderCnt","type":0,"operator":"EQ","value":[1],"extInfo":"{\"componentType\":\"NUMBER\",\"id\":\"37251bcf-b4c3-411b-adb5-d8d121ddbd8b\"}"},{"key":"purchasedItem","type":1,"relation":"and","blockType":1,"isOpen":true,"isEdit":true,"children":[{"key":"purchasedItem","type":0,"operator":"IN","value":[],"extInfo":"{\"operatorType\":\"IN\",\"componentType\":\"LIST_PAGE\",\"listSource\":\"productList\",\"id\":\"17ce3c87-673b-4697-a1d1-54a31ec809e5\",\"label\":[]}"}],"extInfo":"{\"id\":\"c14a1b0a-c2de-47d5-bf47-99a3d5e62627\"}"}]}]},"not":{"type":1,"relation":"and","blockType":0,"extInfo":"{\"id\":\"2e15448c-39c9-4bb1-b676-822007508dd6\"}","children":[{"type":1,"relation":"and","blockType":0,"extInfo":"{\"id\":\"c8c98e48-9bd0-4d70-a119-95854dd4a3b3\"}","children":[]}]}}
        const str1 = {"conditions":{"type":1,"relation":"and","blockType":0,"extInfo":"{\"id\":\"6d13d74c-e881-4b98-84db-b4f006103b26\"}","children":[{"type":1,"relation":"and","blockType":0,"extInfo":"{\"id\":\"35196553-9bdc-40c4-a44d-9976abbea64e\"}","children":[{"key":"emailSubscribeStatus","type":0,"operator":"IN","value":[1],"extInfo":"{\"operatorType\":\"EQ\",\"componentType\":\"ENUM\",\"id\":\"f7324462-ea6f-4070-80ed-deadaee01de1\"}"},{"key":"payOrderCnt","type":0,"operator":"EQ","value":[1],"extInfo":"{\"componentType\":\"NUMBER\",\"id\":\"c7f38ac8-90db-4990-8f07-b36db45070b4\"}"}]}]},"not":{"type":1,"relation":"and","blockType":0,"extInfo":"{\"id\":\"13b1a4bd-491e-49a3-8962-64cd44b62b0a\"}","children":[{"type":1,"relation":"and","blockType":0,"extInfo":"{\"id\":\"0675a56c-1ddf-4ffa-9bd6-29185a87696e\"}","children":[]}]}}
        console.log(str)
        console.log(str1)

        const container = containerRef.current;
        if (!container) return;
        const groups = Array.from(container.querySelectorAll('.container-group'));
        const handleScroll = () => {
            if (isProgrammaticScroll.current) return;
            const containerTop = container.scrollTop;
            let closestIndex = 0;
            let minDistance = Infinity;

            groups.forEach((group:any, index) => {
                const groupTop = group.offsetTop;
                const distance = Math.abs(groupTop - containerTop);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });
            setActive(groupList[closestIndex].id);
        };

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };

        
    }, []);

    return(
        <MyCard title={<div className="font-w-600">细分条件列表</div>} styles={{
            header:{
                padding:"0 16px"
            },
            body:{
                padding:0,
                height: `calc(100% - 56px)`
            }
        }}>
            <Flex style={{height:"100%"}}>
                <div className="tabList">
                    {groupList.map((item,index)=>(
                        <div key={index} className={item.id == active ? "tabListItem active":"tabListItem"} onClick={async ()=>{
                            setActive(item.id)
                            isProgrammaticScroll.current = true; // 标记为程序触发滚动
                            // 获取到container元素中对应的子元素
                            const target = containerRef.current?.querySelector(
                                `.container-group:nth-child(${index + 1})`
                            )
                            // 滚动到该元素可见的位置
                            target?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                            // 滚动完成后恢复监听  ？？？防抖
                            setTimeout(() => {
                                isProgrammaticScroll.current = false;
                            }, 500); // 略大于滚动动画时间
                        }}>
                            {intl.formatMessage({ id: "customer.management.subdivision."+item.key })}
                        </div>
                    ))}
                </div>
                <div className="container" ref={containerRef}>
                    {groupList.map((item,index)=>(
                        <div key={index} className="container-group">
                            <div className="title font-w-500">{intl.formatMessage({ id: "customer.management.subdivision."+item.key })}</div>
                            <Flex className="list">
                                {item.children.map((groupItem:GroupItem,index:number)=>{
                                    return (
                                        <div key={index} className="listItem-warp">
                                            {groupItem?.isSubGroup ? <>
                                                <div className="sub-container-group">
                                                    <div className="font-12 color-7A8499" style={{marginBottom:"8px"}}>{intl.formatMessage({ id: "customer.management.subdivision."+groupItem.key })}</div>
                                                    <Flex className="list">
                                                        {groupItem.children && groupItem.children?.map((sub:any,index:number)=>(
                                                            <div key={index} className="listItem-warp">
                                                                {DraggableItem({id:item.id+"-"+groupItem.key+"-"+sub.key,key:sub.key,component:sub})}
                                                            </div>
                                                        ))}
                                                    </Flex>
                                                </div>
                                            </>:DraggableItem({id:groupItem.key+item.id,key:groupItem.key,component:groupItem})}
                                        </div>
                                    )
                                })}
                            </Flex>
                        </div>
                    ))}
                </div>
            </Flex>
        </MyCard>
    )
}


const MyCard = styled(Card)`
    border: 1px solid #f0f0f0;
    height: 100%;
    .tabList{
        border-right: 1px solid #eef1f6;
        .tabListItem{
            font-weight: 500;
            padding:8px 20px 8px 16px;
            cursor: pointer;
        }
        .active{
            color: #1657d9;
            background: #f7f8fb;
        }
        .active::before {
            content: '';
            position: absolute;
            left: 0;
            width: 4px;
            height: 20px;
            border-radius: 0 4px 4px 0;
            opacity: 1;
            background-color: #356dff;
        }
    }
    .container{
        max-width: 300px;
        height: 100%;
        overflow-y: auto;
        scroll-behavior: smooth; /* 平滑滚动效果 */
        padding-bottom: 20px;
        .container-group{
            padding: 12px 20px 0;
            .title{
                margin-bottom: 12px;
            }
            .list{
                flex-wrap: wrap;
                row-gap: 8px;
                align-items: stretch;
                margin: 0 -4px;
                .listItem-warp{
                    padding: 0 4px;
                    flex: 1 0 50%;
                    width: 100%;
                    cursor: grab;
                    .listItem{
                        /* height: 100%; */
                        word-wrap: break-word;
                        padding: 10px 12px;
                        border-radius: 8px;
                        border: 1px solid #d7dbe7;
                        div{
                            overflow: hidden;
                            font-size: 14px;
                            line-height: 18px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            user-select: none;
                        }
                    }
                }
                
            }
        }
    }
`

export default ConditionCard