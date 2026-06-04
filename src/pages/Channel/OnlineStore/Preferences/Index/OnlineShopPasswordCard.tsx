import WarningTagText from "@/components/Tag/WarningTagText";
import preferences from "@/store/channel/preferences/preferences";
import { history } from "@umijs/max";
import { Card, Checkbox, Divider, Flex, Form, Input, Radio} from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";


const { TextArea } = Input;
function OnlineShopPasswordCard() {

    const [form] = Form.useForm();

    useEffect(()=>{
        // form.setFieldsValue({
        //     password: preferences.passWord.password,
        //     switchEnable: preferences.passWord.forceon ? true :preferences.passWord.switchEnable,
        // })
    },[])

    return (
        <Scoped>
            <Card>
                <WarningTagText content={<span className="color-242833 font-14">店铺主域名为www.deom.matacart.com时自动开启密码保护；成功绑定自定义域名后可关闭。<a onClick={()=>history.push("/settings/domain/manage")} style={{color:'#356DFF'}}>去绑定域名</a></span>} />
                <Form layout="vertical" className="form-warp">
                    <Form.Item>
                        <Checkbox checked={preferences.passWord.forceon} onChange={(e)=>{
                            preferences.setPassWord({
                                ...preferences.passWord,
                                forceon: e.target.checked,
                            })
                        }}>开启密码保护</Checkbox>
                    </Form.Item>
                    <Divider/>
                    <Form.Item label={<div className="font-w-600">密码</div>}>
                    {/* disabled={preferences.passWord.forceon} */}
                        <Input value={preferences.passWord.password} placeholder="请输入密码" onChange={(e)=>{
                            preferences.setPassWord({
                                ...preferences.passWord,
                                password: e.target.value,
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label={<div className="font-w-600">访客可见信息</div>}>
                    {/* disabled={preferences.passWord.forceon} */}
                        <TextArea rows={4} showCount maxLength={2000} placeholder="客户访问店铺时可以看见的一段话" />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default observer(OnlineShopPasswordCard)

const Scoped = styled.div`
    margin-bottom: 20px;
   .form-warp{
        margin-top: 20px;
        .divider-warp{
            margin:20px 0;
        }
   }
`
