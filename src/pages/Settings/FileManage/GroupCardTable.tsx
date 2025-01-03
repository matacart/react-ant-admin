import { deleteFile, getFileList } from "@/services/y2/api"
import { DeleteOutlined, FolderOutlined, PaperClipOutlined } from "@ant-design/icons";
import copy from 'copy-to-clipboard';
import { Dropdown, MenuProps, message, Modal, Popover, Space, Table, TableProps, theme, Tooltip } from "antd"
import { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import React from "react";
import fileData from "@/store/fileData";
import { observer } from "mobx-react-lite";
import RemoveModal from "@/components/Modal/RemoveModal";

const { useToken } = theme;

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
    url:string;
}

function GroupCardTable({dataSource}) {

    useEffect(()=>{
        if(dataSource!==undefined){
          setData(dataSource)
        }
    },[dataSource])

    useEffect(()=>{
      // console.log(fileData.data)
      if(fileData.data!==null){
        setData([...data,{
          id:fileData.data.id,
          name:fileData.data.basename,
          size:fileData.data.size,
          createTime:fileData.data.create_time,
          url:fileData.data.savepath
        }])
      }
      fileData.setData(null)
    },[fileData.data])


    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              哈哈哈
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
    ];

    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
        padding: 0,
    };

    const formatTime = (time:string)=>{
        if(time){
            const date = new Date(parseInt(time)*1000)
            const year = date.getFullYear()
            const month = (date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1)
            const day = date.getDate()<10?"0"+date.getDate():date.getDate()
            const hours = date.getHours()<10?"0"+date.getHours():date.getHours()
            const minutes = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()
            const seconds = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()
            return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds
        }
    }

    const [data,setData] = useState<DataType[]>([]);

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '文件',
          dataIndex: 'name',
          key: 'name',
          width:420,
          render: (text) => <a>{text}</a>,
        },
        {
          title: '上传时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width:170,
          render: (text) => <span>{formatTime(text)}</span>,
        },
        {
          title: '大小',
          dataIndex: 'size',
          key: 'size',
          width:160,
          render: (text) => <span>{(text/1000)+"M"}</span>,
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width:160,
          render: (_, record) => (
            <Space size="middle">
                <Tooltip title="更改分组">
                    <Dropdown trigger={["click"]} arrow={false} placement="bottomRight" menu={{ items }}
                    dropdownRender={(menu) => (
                        <div style={contentStyle}>
                            <div className="dropdownMenuRemoveItem" onMouseOver={()=>{"this.style.backgroundColor='red'"}} style={{backgroundColor:"#F0F0F0",color:"red",borderBottom:"1px solid #F0F0F0",padding:"6px 12px"}}>取消分组</div>
                            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                            <Space style={{ padding: 8 }}>
                            </Space>
                        </div>
                    )}>
                        <span style={{fontSize:"20px",cursor:"pointer"}}><FolderOutlined /></span>
                    </Dropdown>
                </Tooltip>
                <Tooltip title="复制链接">
                    <span onClick={()=>{copyUrl(record.url)}} style={{fontSize:"20px",cursor:"pointer"}}><PaperClipOutlined /></span>
                </Tooltip>
                <Tooltip title="删除">
                  <RemoveModal removeFunc={()=>{removeFile(record.id)}} />
                </Tooltip>
            </Space>
          ),
        },
    ];


    // 复制链接
    const copyUrl = (url:string)=>{
        copy("https:"+url)
        message.success('复制成功')
    }

    // 文件删除
    const removeFile = (id:string)=>{
      deleteFile(id).then(res=>{
        if(res.code == 0){
          setData(data.filter((item) => item.id !== id))
          message.success('删除成功')
        }
      })
    }
    

    return (
        <Scoped>
            <Table<DataType> columns={columns} scroll={{ x: 'max-content'}} dataSource={data} />
        </Scoped>
    )
}

export default observer(GroupCardTable)

const Scoped = styled.div`
    .dropdownMenuRemoveItem{
        background-color: #000;
    }


`