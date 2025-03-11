
import { ExportIcon, UnfoldIcon } from '@/components/Icons/Icons';
import { ImportOutlined, InfoCircleFilled } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Space, Tag } from 'antd';
import { styled } from 'styled-components';
import ShopInformationCard from './ShopInformationCard';

const aItems: MenuProps['items'] = [
    {
      key: '1',
      label:"发票",

    },
    {
      key: '2',
      label: "拣货单",
    }
];

function BasicConfig(){

    return (
        <Scoped>
            <Flex style={{height:"64px"}} align='center'>
                <div style={{marginRight:"20px"}} className='font-24 font-w-600 color-242833'>基础设置</div>
            </Flex>
            {/*  */}
            <Flex gap={20}>
                <div className='content-left'>
                    <div className='font-20 font-w-600 color-242833'>店铺信息</div>
                    <div style={{marginTop:"8px"}} className='font-12 color-474F5E'>请填写用于票据定制化时的基础店铺信息。</div>
                </div>
                <div className='content-right'>
                    {/* 提示标签 */}
                    <Tag
                        className='tag'
                    >
                        <div className="text-box">
                            <InfoCircleFilled className="color-356DFF" />
                            <span style={{marginLeft:"8px"}}>以下信息仅用于本应用内部，编辑或者修改不会影响您在MataCart的店铺信息设置。</span>
                        </div>
                    </Tag>
                    {/*  */}
                    <ShopInformationCard />
                </div>
            </Flex>
        </Scoped>
    )

}

export default BasicConfig;

const Scoped = styled.div`
    .content-left{
        flex: 1;
    }
    .content-right{
        flex: 2;
        .tag{
            width: 100%;
            font-size: 14px;
            margin-top:12px;
            padding: 8px 16px;
            background-color: #E2F0FF;
            .text-box{
                display: inline-block;
                width: 99%;
            }
        }
    }
`