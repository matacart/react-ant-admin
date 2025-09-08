import { ExportIcon, LeftIcon, RemitIcon, StartIcon } from "@/components/Icons/Icons";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Detail(){

    const navigate = useNavigate();

    return(
        <Scoped>
            <Flex className="head" align="center" gap={12}>
                <Flex className='back cursor-pointer' align="center" justify="center" onClick={()=>navigate(-1)}>
                    <LeftIcon className='font-20' />
                </Flex>
                <div className="title font-20 font-w-600">行为: 在线商店访问速度</div>
                <Flex gap={8}>
                    <RemitIcon className="font-20" />
                    <div>导出数据</div>
                </Flex>
                <Flex gap={8}>
                    <ExportIcon className="font-20" />
                    <div>另存为</div>
                </Flex>
                <Flex gap={8}>
                    <StartIcon className="font-20" />
                    <div>收藏</div>
                </Flex>
            </Flex>
            <div className="speed-empty">
                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-datacenter/20250716144547170/imgs/empty-table.98f98.svg" />
                <div className="font-w-600 font-20">数据量不足，无法分析</div>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    padding: 32px 40px;
    width: 100%;
    .head{
        margin-bottom: 20px;
        .back{
            width: 32px;
            height: 32px;
            border: 1px solid #b8becc;
            border-radius: 4px;
            cursor: pointer;
        }
    }
    
    .speed-empty{
        /* border: 1px solid #d7d7e7; */
        border-radius: 4px;
        background-color: #FFFFFF;
        text-align: center;
        padding: 100px 0;
    }

`

export default Detail;