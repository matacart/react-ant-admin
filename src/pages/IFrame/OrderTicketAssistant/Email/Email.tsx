
import { Button, Card, Dropdown, Flex, Form, Input, MenuProps, Space, Steps, Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';
import CodeInsertionCard from './CodeInsertionCard';
import { history } from '@umijs/max';

function Email(){


    const [current, setCurrent] = useState(0);

    const [TicketDownloadText,setTicketDownloadText] = useState("");

    return (
        <Scoped>
            <Flex style={{height:"64px"}} align='center' justify='space-between'>
                <div className='font-24 font-w-600 color-242833'>邮件自动化</div>
                <div>
                    <Steps
                        size="small"
                        current={current}
                        items={[
                            {
                                title: '设置模版链接',
                            },
                            {
                                title: '代码插入',
                                // subTitle: 'Left 00:00:08',
                            }
                        ]}
                    />
                </div>
            </Flex>
            {/*  */}
            <Flex gap={20}>
                <div className='content-left'>
                    <div className='font-20 font-w-600 color-242833'>设置模版链接</div>
                    <div style={{marginTop:"8px"}} className='font-14 color-474F5E'>选择您要发送给客户的票据模版和邮件中展示的链接文字。</div>
                </div>
                <div className='content-right'>
                    {current == 0 && <Card>
                        <Form layout='vertical'>
                            <Form.Item label="设置模版链接">
                                <Input placeholder="请输入链接文字" />
                            </Form.Item>
                            <Form.Item label="票据下载链接文字">
                                <Input value={TicketDownloadText} placeholder="请输入票据下载链接文字" onChange={(e)=>setTicketDownloadText(e.target.value)} />
                            </Form.Item>
                        </Form>
                        <div>样式示例</div>
                        <div style={{marginTop:"8px"}} className='color-356DFF'>{TicketDownloadText}</div>
                    </Card>}
                    {current == 1 && <CodeInsertionCard />}
                </div>
            </Flex>
            <Flex justify='end' style={{marginTop:"20px"}}>
                {current == 0 ? <Button type="primary" onClick={()=>setCurrent(current+1)}>下一步</Button> : <Button type="primary" onClick={()=>history.push("/order_invoice_customization/orderList")}>完成</Button>}
            </Flex>
        </Scoped>
    )

}

export default Email;

const Scoped = styled.div`
    .content-left{
        flex: 1;
    }
    .content-right{
        flex: 2;
    }
`