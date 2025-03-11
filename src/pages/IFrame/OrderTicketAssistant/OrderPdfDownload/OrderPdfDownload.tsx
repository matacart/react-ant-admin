
import { ExportIcon, UnfoldIcon } from '@/components/Icons/Icons';
import { Button, Card, Dropdown, Flex, MenuProps, Space, Tabs, TabsProps } from 'antd';
import { styled } from 'styled-components';
import DownloadTable from './DownloadTable';

function OrderPdfDownload(){

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '全部',
            children: <DownloadTable status="0" />,
        },
        {
            key: '2',
            label: '下载中',
            children: <DownloadTable status="2" />,
        },
        {
            key: '3',
            label: '下载失败',
            children: <DownloadTable status="3" />,
        },
        {
            key: '4',
            label: '下载完成',
            children: <DownloadTable status="4" />,
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <Scoped>
            {/* content */}
            <div className='order-list-content'>
                <Flex style={{height:"64px"}} align='center' justify='space-between'>
                    <div className='ota-font-24 ota-font-w-600 ota-color-242833'>下载列表</div>
                </Flex>
                {/*  */}
                <Card>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </Card>
            </div>
        </Scoped>
    )

}

export default OrderPdfDownload;

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