import { getThemeVersions, setTemplateVersion } from "@/services/y2/api";
import shopSetting, { TemplateInstance } from "@/store/channel/shopSetting/shopSetting";
import { Flex, Modal, Switch, Table } from "antd";
import { useState } from "react";
import styled from "styled-components";

interface DataType {
  key: string;
  id: string;
  is_installed:number;
  version:string;
}

function VersionSwitchModal({template,type}:{template:TemplateInstance|null,type:"instance"|"using"}) {

    const [open, setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    // 分页
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const [data, setData] = useState<DataType[]>([]);

    const columns = [
        {
            title: '版本ID',
            dataIndex: 'id',
            key: 'id',
            width: 240,
        },
        {
            title: '版本号',
            dataIndex: 'version',
            key: 'version',
            width: 240,
        },
        {
            title: '更新时间',
            dataIndex: 'update_time',
            key: 'update_time',
            width: 240,
        },
        {
            title: '状态',
            key: 'action',
            width: 240,
            render: (text: string, record: DataType) => (
                <>
                    {record.is_installed === 1 ? <span>已启用</span> : 
                        <span className="color-356DFF cursor-pointer" onClick={()=>{
                            setLoading(true);
                            setTemplateVersion({
                                id:template?.id || "",
                                template_id:template?.template_id || "",
                                languages_id:template?.languages_id || "",
                                version_id:record.id,
                                mode:"auto",
                                target_type:"installation",
                            }).then((res)=>{
                                if(res.code == 0){
                                    setData(data.map(item=>{
                                        if(item.id === record.id){
                                            return {...item, is_installed:1}
                                        }
                                        return {...item, is_installed:0}
                                    }))
                                    if(type == "using" && template){
                                        shopSetting.setTemplateInstanceUsing({
                                            ...template,
                                            active_version_id:record.id || "",
                                            active_version:record.version || "",
                                        })
                                    }
                                    // ...template,
                                    // template_version_id:record.id || "",
                                    // template_version:record.version || "",
                                    if(type == "instance" && template){
                                        const newTemplateInstanceList = shopSetting.templateInstanceList.map(item=>{
                                            if(item.id === template.id){
                                                return {...item, template_version_id:record.id || "", template_version:record.version || ""}
                                            }
                                            return item;
                                        })
                                        shopSetting.setTemplateInstanceList(newTemplateInstanceList);
                                    }
                                }
                            }).finally(()=>{
                                setLoading(false);
                            })
                        }}>启用</span>
                    }
                </>
            )
        }
    ]

    const init = ()=>{
        template && getThemeVersions({
            templateId: template.template_id,
            page: pagination.current,
            limit: pagination.pageSize
        }).then(res=>{
            setData([...res.data]);
            setPagination({
                ...pagination,
                total: res.data.total
            });
        });
    }

    const cancel = ()=>{
        setOpen(false);
    }

    
    return <>
        <a onClick={()=>{
            setOpen(true);
            init();
        }}>切换</a>
        <MyModal 
            title="版本设置" 
            width={860} 
            centered 
            open={open} 
            onCancel={cancel}
            footer={false}
        >
            <Table<DataType>
                className="table"
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={false}
                // pagination={{
                //     ...pagination,
                //     showSizeChanger: true,
                //     onChange: (page, pageSize) => {
                //     setPagination({
                //         ...pagination,
                //         current: page,
                //         pageSize: pageSize,
                //     });
                //     },
                // }}
            />
        </MyModal>
    </>
}


const MyModal = styled(Modal)`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
    .table{
        margin: 24px 0;
        max-height: 420px;
        overflow-y: auto;
    }
`;

export default VersionSwitchModal
