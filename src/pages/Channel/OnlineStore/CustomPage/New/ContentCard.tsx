import TinyMce from "@/components/MCE/TinyMce";
import customPage from "@/store/channel/customPage/customPage";
import { Card, Form, Input } from "antd"
import { observer } from "mobx-react-lite";
import styled from "styled-components"


const ContentCard = ()=>{
    const setContent = (content: string) => {
        customPage.setNewCustomPage({...customPage.newCustomPage, content})
    }

    return (
        <Scoped>
            <Card>
                <Form layout='vertical' className='product-form'>
                    <Form.Item
                        name="title"
                        label={<div className="font-w-600 font-16">页面内容</div>}
                    >
                        {/*  */}
                        <TinyMce content={customPage.newCustomPage.content} setContent={setContent}  />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}


export default observer(ContentCard)

const Scoped = styled.div`
`