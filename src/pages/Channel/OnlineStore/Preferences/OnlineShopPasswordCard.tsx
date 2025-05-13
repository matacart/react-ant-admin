import DefaultButton from "@/components/Button/DefaultButton";
import DefaultTag from "@/components/Tag/DefaultTag";
import MinDefaultTag from "@/components/Tag/MinDefaultTag";
import WarningTagText from "@/components/Tag/WarningTagText";
import { ExportOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { Card, Checkbox, Divider, Flex, Form, Input, Radio} from "antd";
import styled from "styled-components";


const { TextArea } = Input;
function OnlineShopPasswordCard() {

    return (
        <Scoped>
            <Card>
                <WarningTagText content={<span className="color-242833 font-14">店铺主域名为www.deom.matacart.com时自动开启密码保护；成功绑定自定义域名后可关闭。<a onClick={()=>history.push("/settings/domain/manage")} style={{color:'#356DFF'}}>去绑定域名</a></span>} />
                <Form layout="vertical" className="form-warp">
                    <Form.Item>
                        <Checkbox checked={true} disabled>开启密码保护</Checkbox>
                    </Form.Item>
                    <Divider className="divider-warp" />
                    <Form.Item label={<div className="font-w-600">密码</div>}>
                        <Input disabled placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item label={<div className="font-w-600">访客可见信息</div>}>
                        <TextArea disabled rows={4} showCount maxLength={2000} placeholder="客户访问店铺时可以看见的一段话" />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default OnlineShopPasswordCard

const Scoped = styled.div`
    margin-bottom: 20px;
   .form-warp{
        margin-top: 20px;
        .divider-warp{
            margin:20px 0;
        }
   }
`
