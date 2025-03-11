
import { styled } from 'styled-components';
import Header from './Header';
import { Outlet } from '@umijs/max';
import { Flex } from 'antd';
import "./orderTicketAssistant.scss"

// 模拟插件 -- 入口文件
function OrderTicketAssistantApp(){

    return (
        <Scoped>
            {/* header */}
            <Header />
            {/* content */}
            <div className='app'>
                <Outlet />
            </div>
        </Scoped>
    )

}

export default OrderTicketAssistantApp;

const Scoped = styled.div`
    height: 100%;
    .app{
        position: relative;
        top: 46px;
        height: calc(100% - 46px);
    }
`