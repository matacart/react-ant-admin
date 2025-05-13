import { deleteFile, getFileList } from "@/services/y2/api"
import { DeleteOutlined, FolderOutlined, PaperClipOutlined } from "@ant-design/icons";
import copy from 'copy-to-clipboard';
import { Dropdown, Flex, MenuProps, message, Modal, Pagination, Popover, Space, Table, TableProps, theme, Tooltip } from "antd"
import { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import React from "react";
import fileData from "@/store/fileData";
import { observer } from "mobx-react-lite";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { type } from './../../../../types/index.d';
import { TableRowSelection } from "antd/es/table/interface";
import DeleteModal from "@/components/Modal/DeleteModal";
import { title } from 'process';

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
      console.log(fileData.data)
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

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    function splitByLastDot(str:string) {
      // 查找最后一个点的索引
      const lastDotIndex = str.lastIndexOf('.');
      if (lastDotIndex === -1) {
          // 如果字符串中没有点，返回包含原字符串的数组
          return [str];
      }
      // 分割字符串
      const firstPart = str.substring(0, lastDotIndex);
      const secondPart = str.substring(lastDotIndex + 1);
      return [firstPart, secondPart];
    }

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '文件',
          dataIndex: 'name',
          key: 'name',
          width:420,
          render: (text,record,index) => {
            
            const nameItem = splitByLastDot(text)
            const name = nameItem[0]
            const type = nameItem[1].toUpperCase()

            let imgTypeUrl:string = "";

            if(type == "MP4"){
              imgTypeUrl = record.url
            }else if(type == "JPEG" || type == "JPG" || type == "PNG" || type == "GIF" || type == "PJP" || type == "SVG"){
              imgTypeUrl = record.url
            }else if(type == "XLSX"){

            }else if(type == "DOCX"){
              imgTypeUrl = "/img/settings/file-type-docx.svg"
            }

            return (
              <Flex align="center">
                <div style={{marginRight:12,width:60,height:60}}>
                  {type == "MP4"?<video style={{width:"100%",height:"100%",objectFit:"contain",background:"#f7f8fb",borderRadius:"4px"}} src={record.url} />:<img style={{width:"100%",height:"100%",objectFit:"contain",background:"#f7f8fb",borderRadius:"4px"}} src={imgTypeUrl+"?x-oss-process=image/resize,w_300"} />}
                </div>
                <div>
                  <div className="color-242833">{name}</div>
                  <div className="color-7A8499 font-12">{type}</div>
                </div>
              </Flex>
            )
          }
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
                        <span style={{fontSize:"20px",cursor:"pointer"}} onClick={(e)=>e.stopPropagation()}><FolderOutlined /></span>
                    </Dropdown>
                </Tooltip>
                <Tooltip title="复制链接">
                    <span onClick={(e)=>{
                      e.stopPropagation()
                      copyUrl(record.url)
                    }} style={{fontSize:"20px",cursor:"pointer"}}><PaperClipOutlined /></span>
                </Tooltip>
                <Tooltip title="删除">
                  <DeleteModal
                    tElement={
                      <span style={{cursor:"pointer",fontSize:"20px",color:"red"}}><DeleteOutlined /></span>
                    }
                    title="删除文件"
                    removeFunc={()=>{removeFile(record.id)}} 
                    content={"此文件将从文件库中被删除，且文件关联的资源将自动移除该文件，操作无法撤销。"}
                    okText="删除"
                  />
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
    
    // 分页
    const paginationConfig: TableProps<DataType>['pagination'] = {
      onChange: () => {},
      showTotal:(total)=><div className="color-7A8499">共{total}个文件</div>
    };


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    }
    // 选择
    const rowSelection: TableRowSelection<DataType> = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    
    return (
      <Scoped>
        <Table<DataType> columns={columns} scroll={{ x: 'max-content'}} onRow={(record)=>({
          onClick: () => {
            window.open(record.url);
          }
        })} rowSelection={rowSelection} dataSource={data} pagination={paginationConfig} />
      </Scoped>
    )
}

export default observer(GroupCardTable)

const Scoped = styled.div`
    .ant-pagination-total-text{
      position: absolute;
      left: 0;
    }

    .ant-table{
      border: 1px solid #eef1f7;
      border-radius: 6px;
      border-bottom: none;
    }
    .dropdownMenuRemoveItem{
        background-color: #000;
    }


`