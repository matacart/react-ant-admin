import React, { useState } from 'react';
import { history } from '@umijs/max';
import styled from 'styled-components';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ListCard from './ListCard';
import LangSelect from '@/components/Select/LangSelect';
import country from '@/store/settings/additional/country';
import { Flex } from 'antd';
import { observer } from 'mobx-react-lite';

function Index(){

    const [isSkeleton,setIsSkeleton] = useState(false);

    const setLang = (value:string) => {
        country.setLanguagesId(value);
    }

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                        <div className='create-title-left'>
                             <div className="create-title-left-icon" onClick={()=>history.push("/settings/settle")}>
                                <ArrowLeftOutlined />
                            </div>
                            <h3 style={{ position: 'relative', display: 'inline-block' }}>适用国家列表</h3>
                        </div>
                        <div className='create-title-right'>
                            <Flex gap={12}>
                                <LangSelect lang={country.languagesId} setLang={setLang} />
                            </Flex>
                        </div>
                    </div>
                    <div className='create-content'>
                        <ListCard />
                    </div>
                </div>
            </div>}
        </Scoped>
        
    );
}

export default observer(Index);


const Scoped = styled.div`
.create-warp-flex{
    width: 100%;
    max-width: max(75%,1200px);
    margin: auto;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    .create-warp{
        width: 100%;
        min-width: 500px;
        .create-title{
            padding-bottom: 0px;
            color: #474f5e;
            font-size: 14px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            .create-title-left{
                display: flex;
                align-items: center;
                .create-title-left-icon{
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                }
                h3{
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    margin-bottom: 0;
                    margin-left: 12px;
                    overflow: hidden;
                    color: #242833;
                    font-size: 20px;
                    font-weight: 600;
                    line-height: 32px;
                }
            }
            .create-title-right{
                display: inline-block;
            }
        }
        .create-content{
            margin-top: 24px;
            .create-content-app{
                border-radius: 6px;
                background-color: #FFF;
                padding: 12px 24px;
                margin-bottom: 16px;
                .create-content-app-title{
                    margin-bottom: 8px;
                }
                .create-content-app-btn{
                    flex: 1;
                    text-align: right;
                }
            }
        }
    }
}
`;



