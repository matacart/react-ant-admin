import DefaultInput from "@/components/Input/DefaultInput";
import { Card, Form, FormInstance } from "antd";

function WithdrawalInfo(props: { form: FormInstance }){

    const { form } = props;

    <Card>
        <Form form={form} layout='vertical' className='product-form'>
            <Form.Item
                name="title"
                label={<div className="font-w-600 font-16">页面标题</div>}
                rules={[
                    { required: true, message: '标题不能为空' },
                    { max:280, message: '字符数不能超过280个字符' },
                ]}
            >
                <DefaultInput
                    onChange={(e:any) => {
                       
                    }}
                    placeholder="请填写页面标题"
                />
            </Form.Item>
        </Form>
    </Card>


}

export default WithdrawalInfo;