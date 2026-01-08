import { Card, Flex, Form, FormInstance, Radio } from "antd"
import { observer } from "mobx-react-lite";
import styled from "styled-components"


const CommentCard = (props: { form: FormInstance })=>{

    const { form } = props;

    return (
        <Scoped>
            <Card>
                <Form form={form} layout='vertical' className='product-form'>
                    <Form.Item
                        name="comment"
                        initialValue={1}
                        label={<Flex vertical gap={12}>
                            <div className="font-w-600 font-16">评论</div>
                            <div style={{marginBottom:"6px"}}>评论处理方式</div>
                        </Flex>
                        }
                    >
                        <Radio.Group
                            style={{ display: 'flex', gap:"12px", flexDirection: 'column' }}
                            options={[
                                { value: 1, label: '禁用评论' },
                                { value: 2, label: '允许评论，需经过审核' },
                                { value: 3, label: '允许评论，并自动发布评论' },
                            ]}
                            onChange={()=>{

                            }}
                        />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}


export default observer(CommentCard)

const Scoped = styled.div`
`