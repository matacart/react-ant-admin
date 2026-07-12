import { Outlet } from "@umijs/max";
import Aside from "./page/Aside";
import Header from "./page/Header";
import { Flex } from "antd";

function App() {
  return (
    <>
      <Header />
      <Flex>
        <Aside />
        <Outlet />
      </Flex>
    </>
  );
}


export default App;
