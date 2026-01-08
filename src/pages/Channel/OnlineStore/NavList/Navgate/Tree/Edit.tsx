import { Flex, Form, Modal, Spin, Tooltip } from 'antd';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import navgate, { TreeItem } from '@/store/channel/navList/navgate';
import { AddIcon, EditIcon, EditorFeaturedProductIcon, LeftIcon } from '@/components/Icons/Icons';
import documentLibrary from '@/store/components/documentLibrary';
import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import DefaultInput from '@/components/Input/DefaultInput';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import modal from 'antd/es/modal';
import DocumentLibrary from '@/pages/Components/DocumentLibrary';
import DefaultSelect from '@/components/Select/DefaultSelect';
import JumpLink, { getNavlistSecondData, getPageLink, optionsData } from './JumpLink';
import { getSearchLink } from '@/services/y2/api';

export interface EditProps extends React.HTMLAttributes<HTMLDivElement> {
  onEdit?: (newItem:TreeItem) => void; // 添加 onClick 属性
  info:any,
}

export function Edit({onEdit,info,...props }: EditProps) {

  const [addImgModalOpen, setAddImgModalOpen] = useState(false);
  
  const [selectFileCount,setSelectFileCount] = useState(0);

  const [isMaskVisible, setIsMaskVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading,setLoading] = useState(false);

  const [form] = Form.useForm();

  // 二级节点数据
  const [secondData, setSecondData] = useState<any>(null);

  // 使用 useWatch 监听 img 字段变化
  const watchedImg = Form.useWatch('img', form);

  // 取消
  const cancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  }
  // 更新
  const submit = ()=>{
    form.validateFields().then(values=>{
      const pageLink = getPageLink(values.nodeType,values.url);
      const newItem = {
        id: `new-item-${Date.now()}`,
        title:values.title,
        img:values.img,
        isSys:values.sys,
        isShare:values.share,
        openMode:values.openMode,
        pageLink:pageLink,
        nodeType:values.nodeType,
        children: [],
      };
      onEdit && onEdit(newItem);
      form.resetFields();
      setIsModalOpen(false);
    }).catch(err=>{
    })
  }
  
  // 文件库取消
  const fileCancel = ()=>{
    setAddImgModalOpen(false);
    setSelectFileCount(0);
    documentLibrary.clear();
  }
  // 文件库确定
  const fileSubmit = ()=>{
    form.setFieldsValue({
      img: documentLibrary.selectFileList[0].url
    });
    setAddImgModalOpen(false);
    setSelectFileCount(0);
    documentLibrary.clear();
  }
  
  // 文件数量同步
  useMemo(()=>{
    setSelectFileCount(documentLibrary.selectFileList.length)
  },[documentLibrary.selectFileList])

  return (
    <>
      <Scoped onClick={async (e)=>{
        // 初始化表单数据
        setIsModalOpen(true);
        // 根据nodeType获取value
        let value = info.pageLink;
        if(info.nodeType == "0" || info.nodeType == "1" || info.nodeType == "8"){
          value = optionsData.filter(item=>item.nodeType == info.nodeType)[0]
        }else if(info.nodeType == "2" || info.nodeType == "3" || info.nodeType == "4" || info.nodeType == "10" || info.nodeType == "11" || info.nodeType == "12" ){
          setLoading(true);
          const navlistSecondData = await getNavlistSecondData({
            nodeType: info.nodeType,
            pageNum: "1",
            pageSize: "10",
          });
          // 判断是否存在该节点
          let nodeData = null;
          if(!(navlistSecondData?.options.some((element:any) => element.value == value))){
            // 查找该节点
            await getSearchLink({
              node_types: info.nodeType,
              ids: (info.nodeType == "3" || info.nodeType == "10" || info.nodeType == "11") ? value : JSON.parse(value || "{}")?.id,
              languages_id: navgate.languagesId,
            }).then(res=>{
              nodeData = {
                value: value,
                label: <Flex align="center" style={{padding:"4px 0px"}} gap={6}>
                  <EditorFeaturedProductIcon className="font-18" />
                  <div>{res.data.list[0].title}</div>
                </Flex>
              }
            }).catch(err=>{
              console.log(err)
            })
          }
          const newOptions = navlistSecondData?.options;
          const total = navlistSecondData?.count;
          const nondeBack = {
            value: "back",
            label: <Flex align="center" justify="space-between" style={{padding:"4px 0px"}} gap={6}>
                <Flex>
                    <LeftIcon className="font-18" />
                    <div>返回</div>
                </Flex>
                <Flex className="font-12 color-474F5E">{total || 0}个选项</Flex>
            </Flex>
          }
          setLoading(false);
          nodeData ? setSecondData([nondeBack,nodeData,...newOptions]):setSecondData([nondeBack,...newOptions]);
        }
        setTimeout(() => {
          form.setFieldsValue({
            title: info.title,
            img: info?.img || "",
            url: value,
            sys: info.isSys.toString(),
            share: info.isShare.toString(),
            nodeType:info.nodeType,
            openMode: (info.openMode || "0").toString(),
          });
        }, 0);
      }} >
        <Tooltip title="编辑">
          <EditIcon />
        </Tooltip>
      </Scoped>
      <Modal title={"编辑菜单项"}
        centered 
        width={620} 
        open={isModalOpen}
        forceRender
        onCancel={cancel}
        footer={()=>{
          return (
            <Flex justify="flex-end" gap={12}>
              <DefaultButton text="取消" onClick={cancel} />
              <PrimaryButton text="更新" onClick={submit} />
            </Flex>
          )
        }}
      >
        <Spin spinning={loading}>
          <MyForm form={form} layout="vertical">
            <Form.Item name="title" label="菜单项标题" required={false} rules={[
              {required:true,message:"请输入菜单项标题"}
            ]}>
              <DefaultInput placeholder="请输入菜单项标题" />
            </Form.Item>
            <Form.Item name="img" label="菜单项图片">
              {watchedImg ? <div className="image-container" onMouseEnter={()=>setIsMaskVisible(true)} onMouseLeave={()=>setIsMaskVisible(false)}>
                  <img src={form.getFieldsValue()?.img} style={{width:"100%"}}/>
                  {isMaskVisible && (
                    <div className="mask">
                      <div className="delete-icon" onClick={(e)=>{
                          e.stopPropagation()
                          const myMOdal = modal.confirm({
                            title: '确定要删除吗？',
                            icon: <ExclamationCircleFilled style={{color:"#F86140"}} />,
                            content: '删除后不可恢复。',
                            centered:true,
                            footer:()=>{
                              return (
                                <Flex justify="flex-end" gap={12}>
                                  <DefaultButton text="取消" onClick={()=>myMOdal.destroy()} />
                                  <PrimaryButton text="确定" onClick={()=>{
                                    form.setFieldsValue({
                                      img: ""
                                    })
                                    myMOdal.destroy()
                                  }} />
                                </Flex>
                              )
                            }
                          });
                      }}>
                        <DeleteOutlined className="font-16" style={{opacity:0.6}} />
                      </div>
                    </div>
                  )}
                </div> : <Flex className="block_img-add" justify="center" align="center" onClick={()=>setAddImgModalOpen(true)}>
                <AddIcon className="font-24" />
                <div>添加图片</div>
              </Flex>}
            </Form.Item>
            <Form.Item name="sys" label="数据归属" initialValue={"0"} required={false}>
              <DefaultSelect options={[
                {value:"0",label:"商户自建"},
                {value:"1",label:"平台自建"},
              ]} />
            </Form.Item>
            <Form.Item name="share" label="子号共享" initialValue={"0"} required={false}>
              <DefaultSelect options={[
                {value:"0",label:"否"},
                {value:"1",label:"是"},
              ]} />
            </Form.Item>
            <Form.Item name="openMode" label="开新窗口" initialValue={"0"} required={false}>
              <DefaultSelect options={[
                {value:"0",label:"否"},
                {value:"1",label:"是"},
              ]} />
            </Form.Item>
            <JumpLink form={form} secondData={secondData} />
          </MyForm>
        </Spin>
      </Modal>
      {/* 文件库选择弹窗 */}
      <Modal
        width="90vw" style={{ maxWidth: "860px" }}
        styles={{
          body: {
            height: "620px",
            padding: 0
          }
        }}
        centered
        destroyOnHidden
        title='从文件库中选择'
        open={addImgModalOpen}
        onCancel={fileCancel}
        footer={() => (
          <Flex justify="space-between">
            <div style={{lineHeight:"32px"}}>已选<span style={{margin:"0 4px"}}>{selectFileCount}</span>个文件</div>
            <Flex gap={12}>
              <DefaultButton text="取消" onClick={fileCancel} />
              <PrimaryButton text="确定" onClick={fileSubmit} />
            </Flex>
          </Flex>
        )}
      >
        <DocumentLibrary />
      </Modal>
    </>
  );
}

const Scoped = styled.div`
  cursor: pointer;
  font-size: 18px;
`

const MyForm = styled(Form)`
  margin-top: 20px;
  max-height: 80vh;
  overflow-y: auto;
  .block_img-add{
    flex-direction: column;
    width: 160px;
    height: 100px;
    border: 2px dashed #DCDFE6;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
      color: #5e91ff;
      border: 2px dashed #5e91ff;
    }
  }
  .image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 120px;
    border: 1px solid #eef1f6;
    border-radius: 4px;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .mask{
        position: absolute;
        z-index: 99;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        /* opacity: 0; */
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s ease;
    }
    .image-container:hover.mask {
        opacity: 1;
    }
    .delete-icon {
        color: white;
        font-size: 16px;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        /* opacity: 0.8; */
        display: flex;
        justify-content: center;
        align-items:center;
        cursor: pointer;
    }
  }
`
