import { Outlet } from '@umijs/max';
import { App } from 'antd';
// 主题布局入口
const Index = () => {
  return (
    <App>
      <Outlet/>
    </App>
  );
};

export default Index;

