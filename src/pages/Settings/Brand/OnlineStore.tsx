import { Button, Card } from "antd";
import styled from "styled-components";
import { wrap } from 'lodash';


export default function OnlineStore() {
  return (
    <Scoped>
        <Card title={<div className="card-title">
            <Button>在线商店</Button>
        </div>}>
            <div>
                <div className="container">
                    <div className="header">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="line"></span>
                    </div>
                    <div className="content">
                        <div className="coverLogoPlaceholder">
                            <img src="/icons/ImageCoverBlank.svg" />
                            <span className="color-474F5E" style={{marginLeft: '6px'}}>封面图片</span>
                        </div>
                        <div className="contentBody">
                            <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/logo.f3d63.svg" className="squareLogoPlaceholder" alt="" />
                            <div className="contentTitle">标语</div>
                            <div className="contentDesc">简短描述</div>
                            <div className="productIconRow">
                                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" className="productIconItem" alt="" />
                                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" className="productIconItem" alt="" />
                                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" className="productIconItem" alt="" />
                            </div>
                            <div className="productIconRow">
                                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" className="productIconItem" alt="" />
                                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" className="productIconItem" alt="" />
                                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" className="productIconItem" alt="" />
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="contentMobile">
                        <div className="content">
                            <div className="coverLogoPlaceholder">
                                <img src="/icons/ImageCoverBlank.svg" />
                                <span className="color-474F5E" style={{marginLeft: '6px'}}>封面图片</span>
                            </div>
                            <div className="contentBody">
                                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/logo.f3d63.svg" className="squareLogoPlaceholder" alt="" />
                                <div className="contentTitle">标语</div>
                                <div className="contentDesc">简短描述</div>
                                <div className="productIconRow">
                                    <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" alt="" />
                                    <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" alt="" />
                                </div>
                                <div className="productIconRow">
                                    <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" alt="" />
                                    <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20250114180335342/imgs/productIcon.8edbd.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: '20px',textAlign:"center"}} className="color-7A8499">展示位置示意</div>
            </div>
        </Card>
    </Scoped>
  )
}

const Scoped = styled.div`
    .card{
        padding:0px;
    }
    .card-title{
        text-align: center;
    }
    .container {
        position: relative;
        margin-right: 63px;
        background: #f7f8fb;
        /* display: flex; */
        .header{
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            height: 20px;
            width: 100%;
            padding-right: 12px;
            padding-left: 4px;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            background-color: #eaedf1;
            .dot{
                width: 6px;
                height: 6px;
                margin-bottom: 1px;
                margin-left: 4px;
                border-radius: 50%;
                background: #b8becc;
            }
            .line{
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                height: 6px;
                margin-left: 12px;
                border-radius: 5px;
                background: #b8becc;
            }
        }
        /*  */
        .content{
            position: relative;
            margin: 12px 12px 0;
            background: #fff;
            -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            font-size: 0;
            .coverLogoPlaceholder {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                background: #eaedf1;
                width: 100%;
                height: 210px;
                border-radius: 3px 3px 0 0;
                font-size: 14px;
                -o-object-fit: cover;
                object-fit: cover;
            }
            .contentBody{
                position: relative;
                margin: 34px 146px 0 80px;
                .squareLogoPlaceholder{
                    position: absolute;
                    top: -6px;
                    max-width: 89px;
                    max-height: 56px;
                    -o-object-fit: cover;
                    object-fit: cover;
                    -webkit-transform: translateY(-100%);
                    transform: translateY(-100%);
                }
                .contentTitle{
                    color: #242833;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px
                }
                .contentDesc {
                    margin-top: 2px;
                    font-size: 12px;
                }
                .productIconRow {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: justify;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    margin: 4px 0;
                    gap: 12px;
                    /* white-space: wrap; */
                }
            }
            
        }
        .contentMobile{
            position: absolute;
            right: -63px;
            bottom: 0;
            width: 200px;
            padding: 18px 8px 0;
            border-radius: 13px 13px 0 0;
            background: #f7f8fb;
            -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            .content{
                margin: 0px 0px 0;
                position: relative;
                background: #fff;
                -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
                font-size: 0;
                .coverLogoPlaceholder{
                    height: 88px;
                    width: 100%;
                    border-radius: 3px 3px 0 0;
                    font-size: 14px;
                    -o-object-fit: cover;
                    object-fit: cover;
                }
                .contentBody{
                    position: relative;
                    margin: 24px 12px 0;
                    .productIconRow {
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-pack: justify;
                        -ms-flex-pack: justify;
                        justify-content: space-between;
                        margin: 4px 0;
                        white-space: wrap;
                        img{
                            /* width: 24px; */
                        }
                    }
                }
                
            }
        }
    }
`