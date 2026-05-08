import MyButton from "@/components/Button/MyButton";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import { AddIcon, DownIcon, LeftIcon, SearchSecondIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import { getFileList, uploadPic } from "@/services/y2/api";
import { CheckCircleFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Drawer, Flex, App, Row, Spin, Upload } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import ImagePickerDataSource from "./ImagePickerDataSource";
import { useIntl } from "@umijs/max";


interface imageType{
    id:string,
    url:string,
    type:string,
    alt?:string
}

const ImagePicker = forwardRef(({
    url,
    setStaticUrl,
    setUrl,
    deleteUrl,
    variables,
    rightRef,
    style
}:{
    url:string,setStaticUrl:(url:string)=>void,setUrl:(key:string)=>void,deleteUrl:()=>void,
    variables:any,
    rightRef:React.RefObject<HTMLDivElement>,
    style?: React.CSSProperties
},ref)=>{
    
    const intl = useIntl();
    
    const { message } = App.useApp();

    const [loading,setLoading] = useState(false);

    const [open,setOpen] = useState(false);

    // 图片列表
    const [imgList,setImgList] = useState<imageType[]>([]);
    // 选中图片
    const [imgUrl,setImgUrl] = useState("");

    const beforeUpload = (file:any) => {
        let formData = new FormData()
        formData.append("file", file)
        setLoading(true);
        uploadPic(formData).then((res: any) => {
            if(res.code == 0){
                const fileInfo = {
                    id:file.id,
                    url:res.data.src,
                    type:file.type.split('/')[1],
                }
                setImgList([fileInfo,...imgList]);
            }else{
                message.error(res.msg || "err", 1)
            }
        }).catch((err: any) => {
        }).finally(() => {
            setLoading(false);
        })
        return false;
    };

    // 取消
    const cancel = ()=>{
        setOpen(false);
    }
    // 完成
    const submit = ()=>{
        setImgUrl(imgUrl);
        setStaticUrl(imgUrl);
        setOpen(false);
    }

    const fetchImgList = ()=>{
        setLoading(true);
        getFileList({
            groupId:'0',
            extType:1,
            pageNum:1,
            pageSize:10,
        }).then(res=>{
            if(res.code == 0){
                const newList = res.data.list.map((item:any)=>{
                    return {
                        id:item.id,
                        url:item.url,
                        type:item.nameSuffix
                    }
                })
                setImgList(newList);
            }
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            setLoading(false);
        })
    }

    // 更换图片
    const changeImg = ()=>{
        fetchImgList();
        setOpen(true);
    }
    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        changeImg:changeImg
    }));

    useEffect(() => {
        setImgUrl(url);
    }, [url]);

    return (
        <Scoped style={style}>
            <Spin spinning={loading}>
            {imgUrl ?
                <div className="preview">
                    <Flex justify="center" className="image-box">
                        <img className="img" src={imgUrl} />
                    </Flex>
                    <Flex className="button-box" gap={12}>
                        <div style={{width:"100%"}}>
                            <MyDropdown
                                tiggerEle={<MyButton style={{width:"100%",height:"36px"}} text={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.imagePicker.replace' })} icon={<DownIcon />} iconPosition="end" />}
                                menu={{
                                    items:[
                                        {
                                            key: "1", label: (
                                                <ImagePickerDataSource url={imgUrl || ""} setUrl={setUrl} variables={variables} rightRef={rightRef} />
                                            )
                                        },
                                        {
                                            key: "2", label: (
                                                <span onClick={changeImg}>{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.imagePicker.replaceImg' })}</span>
                                            )
                                        }
                                    ]
                                }}
                            />
                        </div>
                        <div style={{width:"100%"}}>
                            <MyButton style={{width:"100%",height:"36px"}} text={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.imagePicker.delete' })} onClick={deleteUrl} />
                        </div>
                    </Flex>
                </div>
            : <Flex className="menu-picker cursor-pointer" vertical justify="center" align="center" gap={6} onClick={changeImg}>
                <AddIcon className="font-24 icon" />
                <div className="text">{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.imagePicker.addImg' })}</div>
            </Flex>
            }
            </Spin>
            
            {/* 文件库 */}
            <MyDrawer
                getContainer={()=>rightRef.current!}
                width={296}
                closeIcon={null}
                title={
                    <Flex align="center" gap={2}>
                        <LeftIcon className="font-20 font-w-500 cursor-pointer" onClick={cancel} />
                        <div>{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.imagePicker.fileLibrary' })}</div>
                    </Flex>
                }
                mask={false}
                open={open}
                rootStyle={{
                    position:"absolute"
                }}
                className="menu-picker-drawer"
                classNames={{
                    body: 'menu-box'
                }}
                onClose={cancel}
                footer={
                    <Flex gap={8} justify="flex-end">
                        <MyButton color="primary" variant="solid" text="完成" onClick={submit}/>
                    </Flex>
                }
            >
                <>
                    <Flex style={{padding: '12px'}}>
                        <MyInput placeholder="搜索文件名/文件格式" suffix={<SearchSecondIcon />} style={{height:"36px"}} />
                    </Flex>
                    <Spin spinning={loading}>
                        <Row style={{padding: '0 12px'}} gutter={[12,16]}>
                            <Col span={12}>
                                <Upload
                                    name="file"
                                    beforeUpload={beforeUpload}
                                    showUploadList={false}
                                >
                                    <button className="upload_btn" type="button">
                                        {loading ? <LoadingOutlined className="font-20" /> : <PlusOutlined className="font-20" />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                </Upload>
                            </Col>
                            {/*  */}
                            {imgList.map((img:any)=>{
                                return (
                                    <Col span={12} key={img.id}>
                                        <Flex className={img.url == imgUrl ?"item_box checked":"item_box"} align="center" justify="center" onClick={()=>{
                                            setImgUrl(img.url);
                                        }}>
                                            <img className="item" src={`${img.url}?x-oss-process=image/resize,w_200`} alt={img.alt} />
                                            <CheckCircleFilled className="icon_checked" />
                                            <span className="type_checked">{img.type}</span>
                                        </Flex>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Spin>
                </>
            </MyDrawer>
        </Scoped>
    )
});

export default ImagePicker;


const Scoped = styled.div`
    .menu-picker{
        border: 1px dashed #d7dbe7;
        border-radius: 6px;
        height: 100px;
        background-color: #f7f8fb
    }
    .preview{
        padding: 16px;
        background: #f7f8fb;
        border-radius: 4px;
        .image-box{
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            img{
                object-fit: contain;
                height: 100px;
            }
        }
        .button-box{
            margin-top: 12px;
            /* .ant-upload-wrapper{
                width: 100%;
            } */
        }
    }
`

const MyDrawer = styled(Drawer)`
    .menu-box{
        padding: 0;
        overflow-x: hidden;
        .upload_btn{
            width: 128px;
            height: 128px;
            background: #FAFAFA;
            border-radius: 6px;
            border: 1px dashed #d7dbe7;
            cursor: pointer;
            &:hover{
                border-color: #5e91ff;
                color: #356dff;
            }
        }

        .item_box{
            position: relative;
            width: 128px;
            height: 128px;
            background-color: #eaedf1;
            border-radius: 6px;
            border: 2px solid #eaedf1;
            cursor: pointer;
            &:hover{
                border-color: #5e91ff;
            }
            .item{
                height: auto;
                width: auto;
                margin: auto;
                max-height: 100%;
                max-width: 100%;
                object-fit: contain;
            }
            .icon_checked{
                display: none;
            }
            .type_checked{
                position: absolute;
                right: 0;
                bottom: 0;
                padding: 2px 6px;
                font-size: 12px;
                color: #fff;
                border-radius: 6px 0 4px 0;
                background-color: #00000080;
            }
        }
        .checked{
            border: 2px solid #5e91ff;
            .icon_checked{
                display: block;
                position: absolute;
                right: 6px;
                top: 6px;
                color: #356DFF;
                font-size: 16px;
            }
            .type_checked{
                display: block;
                font-size: 12px;
                position: absolute;
                padding: 2px 6px;
                right: 0;
                bottom: 0;
                color: #fff;
                background: #00000080;
                border-radius: 10px 0 4px 0;
            }
        }
    }
`