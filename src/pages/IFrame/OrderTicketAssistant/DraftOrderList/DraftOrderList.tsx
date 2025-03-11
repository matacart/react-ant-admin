
import { ExportIcon, MailIcon, UnfoldIcon } from '@/components/Icons/Icons';
import { ImportOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Space } from 'antd';
import { styled } from 'styled-components';
import DraftOrderListCard from './DraftOrderListCard';

function DraftOrderList(){

    return (
        <Scoped>
            <Flex style={{height:"64px"}} align='center'>
                <div style={{marginRight:"20px"}} className='ota-font-24 ota-font-w-600 ota-color-242833'>草稿单</div>
                <Flex align='center' className='ota-cursor-pointer'>
                    <MailIcon className='ota-font-20' />
                    <div style={{marginLeft:"4px"}}>编辑邮件模板</div>
                </Flex>
            </Flex>
            {/*  */}
            <DraftOrderListCard />
        </Scoped>
    )

}

export default DraftOrderList;

const Scoped = styled.div`
    display: flex;
    justify-content: center;
    .order-list-content{
        max-width: 1200px;
        flex-grow: 1;
        margin: 0 40px 40px 40px;
        /* height: 1200px; */
    }
`