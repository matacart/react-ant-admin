import { ClockCircleFilled } from "@ant-design/icons";
import styled from "styled-components";



export default function MerchantCertification() {
    return (
        <Scoped>
            {/* 申请中 */}
            <div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                        <h3>账号认证</h3>
                    </div>
                    <div className='create-content'>
                        <div className='progress'>
                            <div className='progress-img' style={{fontSize:"100px",color:"#356dff"}}>
                                <ClockCircleFilled />    
                            </div>
                            <div className='progress-title'>正在申请中，请稍后在登录...</div>
                        </div>
                    </div>
                    <div className='create-footer' style={{ display:"flex",flexDirection:"row-reverse" }}>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    .create-warp-flex{
        width: 100%;
        display: flex;
        justify-content: center;
        color: #474f5e;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        .desc{
            margin-top: 8px;
            color: #7a8499;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
        }
        .litle-title{
            font-size: 16px;
            line-height: 22px;
            font-weight: 600;
        }
        .create-warp{
            max-width: 967px;
            min-width: 700px;
            width: 100%;
            .create-title{
                padding-bottom: 0px;
                color: #474f5e;
                font-size: 14px;
                font-weight: 500;
                line-height: 20px;
                h3 {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    margin: 0 24px 24px 0;
                    overflow: hidden;
                    color: #242833;
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 32px;
                }
            }
            .create-content{
                padding: 20px 24px;
                border-radius: 6px;
                width: 100%;
                background-color: white;
                .create-item-warp{
                    .input{
                        width: 480px;
                        height: 36px;
                        margin-left: 20px;
                    }

                    display: flex;
                    margin-top: 10px;
                    .icon{
                        width: 40px;
                        height: 40px;
                    }
                    .create-item-text{
                        flex:1;
                        .litle-title{
                            color: black;
                        }
                    }

                }

                .progress{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding:200px;
                    .progress-title{
                        margin-top: 24px;
                        font-size: 14px;
                        font-weight: 600;
                    }
                }
                
            }
        }
    }
`