
import { ExportIcon, UnfoldIcon } from '@/components/Icons/Icons';
import { Button, Card, Dropdown, Flex, MenuProps, Space, Tabs, TabsProps } from 'antd';
import { styled } from 'styled-components';
import InvoiceTemplateTable from './InvoiceTemplateTable';
import PickTemplateTable from './PickTemplateTable';
import DraftTemplateTable from './DraftTemplateTable';


function TemplateManage(){

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '发票模板',
          children: <InvoiceTemplateTable />,
        },
        {
          key: '2',
          label: '拣货单模板',
          children: <PickTemplateTable />,
        },
        {
          key: '3',
          label: '草稿单模板',
          children: <DraftTemplateTable />,
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
                    <div className='font-24 font-w-600 color-242833'>模板管理</div>
                    <div>
                        <Button type='primary'>新增模板</Button>
                    </div>
                </Flex>
                {/*  */}
                <Card>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </Card>
            </div>
        </Scoped>
    )

}

export default TemplateManage;

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