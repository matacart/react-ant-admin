import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { Flex, message } from 'antd';
import { getWithdrawList } from '@/services/y2/api';
import WithdrawalList from './WithdrawalList';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { history } from '@umijs/max';
import WithdrawalModal from './WithdrawalModal';

function Withdrawal(){

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [withdrawal,setWithdrawal] = useState({});

    useEffect(()=>{
        getWithdrawList({
            page:"1",
            limit:"10",
        }).then(res=>{
            res.code == 0 && setWithdrawal({
                data:res.data,
                count:res.count
            });
        }).catch((err)=>{
            message.error(err?.msg);
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                        <div className='create-title-left'>
                            <div className="create-title-left-content">提款记录</div>
                        </div>
                        <div className='create-title-right'>
                            <Flex gap={12}>
                                <WithdrawalModal />
                                {/* <PrimaryButton text="发起提款" onClick={()=>history.push(`/stores/billing-cost/withdrawal/add`)} /> */}
                            </Flex>
                        </div>
                    </div>
                    <div className='create-content'>
                        <WithdrawalList withdrawal={withdrawal} />
                    </div>
                </div>
            </div>}
        </Scoped>
        
    );
}

export default Withdrawal;


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
                gap: 12px;
                align-content: center;
                &-secondary{
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
                    &-icon {
                        font-size: 18px;
                    }
                }
                &-content {
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                margin-bottom: 20px;
                overflow: hidden;
                color: #242833;
                font-size: 24px;
                font-weight: 600;
                line-height: 32px;
                }
            }
          .create-title-right{
            display: inline-block;
  
          }
  
        }
        .create-content{
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