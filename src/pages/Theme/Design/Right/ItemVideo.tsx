import DefaultButton from "@/components/Button/DefaultButton"
import MyButton from "@/components/Button/MyButton"
import { EditorAddBtnIcon, SearchSecondIcon } from "@/components/Icons/Icons"
import MyInput from "@/components/Input/MyInput"
import { getFileList } from "@/services/y2/api"
import { CheckCircleFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Col, Drawer, Flex, GetProp, Row, Spin, Upload, UploadProps } from "antd"
import { useMemo, useRef, useState } from "react"
import styled from "styled-components"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface DataType{
    value:string,
    resource:any,
}

function ItemVideo({item,data,setData}:{item:any,data:DataType,setData:(item:any,value:DataType)=>void}){

    const mRef = useRef(null)

    const [open,setOpen] = useState(false);

    const [menu,setMenu] = useState([]);

    // 默认数据
    const defaultData = item.default ?? undefined;

    const [videoData,setVideoData] = useState(typeof data === 'object' ? data : defaultData);

    const [loading, setLoading] = useState(false);

    const [videoList,setVideoList] = useState([
        {
            checked:true,
            url:'//oss.handingcdn.com/Uploads/Editor/Picture/mr/55/app/0/images/2025-11-14/2025-11-14/69168c5c44810.mp4',
        },
        {
            checked:false,
            url:'//oss.handingcdn.com/Uploads/Editor/Picture/mr/55/app/0/images/2025-11-14/2025-11-14/69168c5c44810.mp4'
        }
    ]);

    const fetchVideo = ()=>{
        setLoading(true);
        getFileList({
            groupId:'0',
            extType:2,
            pageNum:1,
            pageSize:10,
        }).then(res=>{
            if(res.code == 0){
                const newVideoList = res.data.list.map((item:any)=>{
                    return {
                        id:item.id,
                        checked:false,
                        url:item.url,
                        type:item.nameSuffix
                    }
                })
                setVideoList(newVideoList);
            }
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            setLoading(false);
        })
    }

    // 删除video
    const delVideo = () => {
        setVideoData({
            value: "",
            resource: null
        })
        setData(item,{
            value: "",
            resource: null
        });
    }

    // 完成
    const submit = () => {
        const video = videoList.filter(item=>item.checked)[0];
        setData(item,{
            value: video.url || "",
            resource: null
        });
        setVideoData({
            value: video.url || "",
            resource: null
        });
        setOpen(false);
    }

    // 取消
    const cancel = ()=>{
        setOpen(false);
    }

    const beforeUpload = (file: FileType) => {
        return false;
    };

    useMemo(()=>{
        setVideoData(typeof data === 'object' ? data : defaultData);
    },[data])


    return (
        <Scoped ref={mRef}>
            {videoData?.value ? (
                <div className="select_item">
                    <Flex className="select_item_container" align="center" justify="center">
                        <video src={videoData?.value}></video>
                    </Flex>
                    <Flex gap={12}>
                        <div style={{flex:1}}>
                            <DefaultButton style={{width:"100%"}} text="更换" onClick={() => setOpen(true)} />
                        </div>
                        <div style={{flex:1}}>
                            <DefaultButton style={{width:"100%"}} text="删除" onClick={delVideo} />
                        </div>
                    </Flex>
                </div>
            ):<Flex className="menu-picker cursor-pointer" justify="center" align="center" gap={6} onClick={()=>{
                fetchVideo();
                setOpen(true);
            }}>
                <EditorAddBtnIcon className="font-24 icon" />
                <div className="text">选择视频文件</div>
            </Flex>} 
            
            <Drawer
                getContainer={()=>mRef.current!}
                width={319}
                closeIcon={null}
                title={<div>从文件库中选择</div>}
                mask={false}
                open={open}
                classNames={{
                    body: 'menu-box'
                }}
                onClose={cancel}
                footer={
                    <Flex justify="end">
                        <Flex gap={8}>
                            <MyButton text="取消" onClick={cancel}/>
                            <MyButton color="primary" variant="solid" text="完成" onClick={submit}/>
                        </Flex>
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
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    beforeUpload={beforeUpload}
                                >
                                    <button className="upload_btn" type="button">
                                        {loading ? <LoadingOutlined className="font-20" /> : <PlusOutlined className="font-20" />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                </Upload>
                            </Col>
                            {/*  */}
                            {videoList.map((video:any)=>{
                                return (
                                    <Col span={12} key={video.id}>
                                        <Flex className={video.checked?"video_box checked":"video_box"} align="center" justify="center" onClick={()=>{
                                            const newVideoList = videoList.map((item:any)=>{
                                                if(item.id == video.id){
                                                    return {
                                                        ...item,
                                                        checked:true
                                                    }
                                                }else{
                                                    return {
                                                        ...item,
                                                        checked:false
                                                    }
                                                }
                                            })
                                            setVideoList(newVideoList);
                                        }}>
                                            <video src={video.url} />
                                            <CheckCircleFilled className="icon_checked" />
                                            <span className="type_checked">{video.type}</span>
                                        </Flex>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Spin>
                </>
            </Drawer>
        </Scoped>
    )
}

export default ItemVideo

const Scoped = styled.div`

    .select_item_container{
        height: 120px;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        margin-bottom: 12px;
        video{
            width: auto;
            height: auto;
            margin: auto;
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
        }
    }

    .menu-picker{
        border: 1px dashed #d7dbe7;
        border-radius: 6px;
        height: 48px;
        background-color: #f7f8fb
    }

    .ant-drawer-content-wrapper{
        top: 52px;
        box-shadow:none;
    }

    .menu-box{
        padding: 0;
        .upload_btn{
            width: 140px;
            height: 140px;
            background: #FAFAFA;
            border-radius: 6px;
            border: 1px dashed #d7dbe7;
            cursor: pointer;
            &:hover{
                border-color: #5e91ff;
                color: #356dff;
            }
        }

        .video_box{
            position: relative;
            width: 140px;
            height: 140px;
            background-color: #eaedf1;
            border-radius: 6px;
            border: 2px solid #eaedf1;
            cursor: pointer;
            &:hover{
                border-color: #5e91ff;
            }
            video{
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
                display: none;
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