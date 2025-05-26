import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Flex } from "antd";

function CustomerHeader(){

    return(
        <Card>
            <Flex justify="space-between">
                <div className="font-16 font-w-600">客户</div>
                <div>
                    <DefaultButton text="加入黑名单" />
                </div>
            </Flex>
            <div className="color-7A8499">尚未登录过</div>
            <div className="color-7A8499">2025-05-18 16:09来自:未登录下单</div>
            
        </Card>
    )
}


export default CustomerHeader