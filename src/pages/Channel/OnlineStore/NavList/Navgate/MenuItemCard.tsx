import SimpleCard from "@/components/Card/SimpleCard";
import { Flex, Form, Modal } from "antd"
import { useMemo, useState } from "react";
import styled from "styled-components"
import SortableTree from "./Tree/SortableTree";
import { AddIcon } from "@/components/Icons/Icons";
import DefaultInput from "@/components/Input/DefaultInput";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultButton from "@/components/Button/DefaultButton";
import DocumentLibrary from "@/pages/Components/DocumentLibrary";
import documentLibrary from "@/store/components/documentLibrary";
import modal from "antd/es/modal";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import navgate from "@/store/channel/navList/navgate";
import DefaultSelect from "@/components/Select/DefaultSelect";
import JumpLink, { getPageLink } from "./Tree/JumpLink";

const MenuItemCard = ()=>{

  const [addImgModalOpen, setAddImgModalOpen] = useState(false);

  const [selectFileCount,setSelectFileCount] = useState(0);

  const [isMaskVisible, setIsMaskVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const imgValue = Form.useWatch('img', form); // 监听 img 字段

  // collapsible 展开 indicator 指示线 removable 移除
  const content = (
    <div style={{marginBottom:"12px"}}>
      <SortableTree collapsible indicator removable add edit />
    </div>
  )

  // 取消
  const cancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  }
  // 添加
  const submit = ()=>{
    form.validateFields().then(values=>{
      const pageLink = getPageLink(values.nodeType,values.url);
      const newItem = {
        id: `new-item-${Date.now()}`,
        isNew: true,
        title:values.title,
        img:values.img,
        isSys:values.sys,
        isShare:values.share,
        openMode:values.openMode,
        pageLink:pageLink,
        nodeType:values.nodeType,
        children:[],
        parentId:navgate.id?navgate.id:null,
      };
      navgate.setInitialItems([...navgate.initialItems, newItem]);
      form.resetFields();
      setIsModalOpen(false);
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
    <Scoped>
      <SimpleCard title={<div>编辑菜单项</div>} content={content} extra={<span onClick={()=>{
        setIsModalOpen(true)
      }} className="color-356DFF add-item cursor-pointer"><AddIcon />添加菜单项</span>} />
      {/*  */}
      <Modal 
        title={"添加菜单项"}
        centered 
        width={620} 
        open={isModalOpen}
        onCancel={cancel}
        forceRender
        footer={()=>{
          return (
            <Flex justify="flex-end" gap={12}>
              <DefaultButton text="取消" onClick={cancel} />
              <PrimaryButton text="添加" onClick={submit} />
            </Flex>
          )
        }}
      >
        <MyForm form={form} layout="vertical">
          <Form.Item name="title" label="菜单项标题" required={false} rules={[
            {required:true,message:"请输入菜单项标题"}
          ]}>
            <DefaultInput placeholder="请输入菜单项标题" />
          </Form.Item>
          <Form.Item name="img" label="菜单项图片">
            {imgValue ? <div className="image-container" onMouseEnter={()=>setIsMaskVisible(true)} onMouseLeave={()=>setIsMaskVisible(false)}>
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
          <JumpLink key={isModalOpen ? 'jump-link-open' : 'jump-link-closed'} form={form} />
        </MyForm>
      </Modal>
      {/*  */}
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
    </Scoped>
  )
}


export default observer(MenuItemCard);

const Scoped = styled.div`
  .add-item{
    &:hover{
      text-decoration: underline;
    }
  }
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