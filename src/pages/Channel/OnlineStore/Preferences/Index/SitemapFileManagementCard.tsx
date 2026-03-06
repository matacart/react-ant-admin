import DefaultButton from "@/components/Button/DefaultButton";
import { CompressedFileIcon } from "@/components/Icons/Icons";
import DeleteModal from "@/components/Modal/DeleteModal";
import { delSitemapFile, getSitemapList, switchSitemap, uploadSitemap } from "@/services/y2/api";
import preferences, { SitemapFile } from "@/store/channel/preferences/preferences";
import { getPrimaryDomain } from "@/utils/dataStructure";
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, message, Modal, Switch, Table, Tooltip, Upload} from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";

function SitemapFileManagementCard() {

    const previewDomain = getPrimaryDomain();

    const [switchLoading,setSwitchLoading] = useState(false);

    const [loading,setLoading] = useState(false);

    const [tableLoading,setTableLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const [data, setData] = useState<SitemapFile[]>([]);

    const columns = [
        {
            title: 'Sitemap文件',
            dataIndex: 'file_name',
            key: 'file_name',
        },
        {
            title: '大小',
            dataIndex: 'file_size_formatted',
            key: 'file_size_formatted',
        },
        {
            title: '上传日期',
            dataIndex: 'create_time_formatted',
            key: 'create_time_formatted',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (text:any, record:any) => (
                <DeleteModal
                    tElement={
                        <Tooltip title="删除">
                            <DeleteOutlined className="font-16 color-F86140 cursor-pointer" />
                        </Tooltip>
                    }
                    removeFunc={()=>{
                        setLoading(true);
                        delSitemapFile(record.id).then(res=>{
                            if(res.code == 0){
                                message.success("删除成功");
                                setData(data.filter(item => item.id !== record.id))
                            }
                        }).catch(()=>{
                            console.log("删除失败")
                        }).finally(()=>{
                            setLoading(false);
                        })
                    }}
                    loading={loading}
                    title="确认要删除该文件吗？" 
                    content={""}
                    okText="删除"
                />
            )
        }
    ]

    const sitemapSwitch = (checked:boolean)=>{
        setSwitchLoading(true);
        switchSitemap(checked?"on":"off").then(res=>{
            if(res.code == 0){
                message.success("成功");
                preferences.setSitemapStatus({
                    active: checked?"on":"off",
                })
            }
        }).catch(err=>{
            message.error('失败');
        }).finally(()=>{
            setSwitchLoading(false);
        })
    }

    const [file,setFile] = useState<File>();

    const beforeUpload = (file:any) => {
        if (!file.type.match(/xml$/)) {
            message.error('仅支持上传 xml 文件');
            return false;
        }
        if (file.size > 50 * 1024 * 1024) {
            message.error('文件大小不能超过 50MB');
            return false;
        }
        setFile(file);
        return true;
    }

    const cancel = ()=>{
        setFile(undefined);
        setOpen(false);
    }

    // 上传文件
    const submit = ()=>{
        if(!file){
            message.error('请选择文件');
            return;
        }
        setLoading(true);
        uploadSitemap({
            sitemap_file:file,
        }).then(res=>{
            if(res.code == 0){
                message.success('上传成功');
                setTableLoading(true);
                getSitemapList().then(res=>{
                    res.code == 0 && setData(res.data.list);
                }).finally(()=>{
                    setTableLoading(false)
                });
            }
        }).catch(err=>{
            message.error('上传失败');
        }).finally(()=>{
            setFile(undefined);
            setLoading(false);
            setOpen(false);
        })
    }


    useEffect(()=>{
        setData(preferences.sitemapFileList);
    },[preferences.sitemapFileList])


    return (
        <Scoped>
            <Card className="card1">
                <Flex justify="space-between" align="center">
                    <div>
                        <Flex align="center">
                            <div>默认Sitemap</div>
                            <Tooltip title="MataCart平台自动生成并维护您的在线商店的 sitemap.xml。每当您添加或删除页面、商品、博客文章等时，会自动更新 Sitemap，这确保了您的网站内容能够及时被搜索引擎发现和索引。 请谨慎关闭它，可能会出现搜索引擎蜘蛛无法通过sitemap爬行，影响您网站在搜索结果中的排名和可见性。">
                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </Flex>
                        <div className="font-12">当前地址：<span className="color-356DFF">{previewDomain}/sitemap.xml</span></div>
                    </div>
                    <div>
                        <Switch loading={switchLoading} checked={preferences.sitemapStatus.active == "on"} onChange={sitemapSwitch} />
                    </div>
                </Flex>
            </Card>
            <Card className="card2">
                <Flex justify="space-between">
                    <Flex align="center">
                        <div>自定义Sitemap({data.length}/10)</div>
                        <Tooltip title="您可以通过手动创建并上传自己生成的 Sitemap 文件（须为xml格式）到您的网站，而不是依赖于MataCart平台自动生成的 Sitemap，更灵活地管理和控制搜索引擎对您网站的爬行和索引。">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </Flex>
                    <DefaultButton text="上传Sitemap.xml" onClick={()=>setOpen(true)} />
                </Flex>
                {/* 已上传文件列表 */}
                <Table rowKey={(record: SitemapFile) => record.id} loading={tableLoading} pagination={false} className="table" scroll={{ y: 320 }} columns={columns} dataSource={data} />
            </Card>
            {/* 自定义Sitemap文件上传 */}
            <MyModal open={open} centered width={620} title="上传Sitemap.xml"
                onCancel={cancel}
                footer={<Flex justify="end" gap={12}>
                    <DefaultButton loading={loading} text="取消" onClick={cancel} />
                    <DefaultButton loading={loading} text="上传" type="primary" onClick={submit} />
                </Flex>}
            >
                <ul className="tip">
                    <li>文件格式：仅支持 xml 文件</li>
                    <li>大小：最大 50MB（根据Google规定）</li>
                    <li>文件包含的URL数量：最多 50,000 个</li>
                </ul>
                <>
                    {file?
                        <div className="file-item-warp">
                            <Flex className="file-item" justify="space-between" align="center">
                            <Flex className="file-info" align="center">
                                <img src={'/img/settings/file.svg'} />
                                <span>{file.name}</span>
                            </Flex>
                            {/* beforeUpload={beforeUpload} */}
                            {<Upload maxCount={1} showUploadList={false} beforeUpload={beforeUpload}>
                                <DefaultButton text="替换文件" />
                            </Upload>}
                            {/*  */}
                            </Flex>
                        </div>
                        :<Dragger maxCount={1} showUploadList={false} beforeUpload={beforeUpload}>
                            <p className="ant-upload-drag-icon">
                                <PlusOutlined className="icon" />
                            </p>
                            <p className="ant-upload-text">上传文件（或拖放上传）</p>
                        </Dragger>
                    }
                </>
            </MyModal>
        </Scoped>
    )
}

export default observer(SitemapFileManagementCard)

const Scoped = styled.div`
    margin-bottom: 20px;
    .card2{
        margin-top: 20px;
        .table{
            margin-top: 20px;
        }
        .ant-table{
            border: 1px solid #eef1f7;
            border-radius: 6px;
            border-bottom: none;
        }
    }
    
`

const MyModal = styled(Modal)`
    .ant-upload-drag-icon{
        .icon{
            color: #474f5e !important;
            font-size: 32px !important;
        }
    }
    .tip{
        list-style-type: disc;
        margin-top: 20px;
        margin-bottom: 12px;
        padding-left: 24px;
    }
    .file-item-warp{
      position: relative;
      overflow: hidden;
      border-radius: 4px;
      background-color: #f7f7f8;
      .file-item{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: relative;
        box-sizing: border-box;
        align-items: center;
        -webkit-box-sizing: border-box;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 20px 24px;
        border-radius: 4px;
        .file-info{
          gap:20px;
        }
      }
    }
`
