import { Card, Divider, Flex, Form, Modal, Radio, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useRef, useState } from "react";
import DynamicSearchInput from "@/components/Input/DynamicSearchInput";
import { SearchOutlined } from "@ant-design/icons";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

function MaketCard() {

    // const 
    const [open,setOpen] = useState(false)

    const Ref = useRef<HTMLDivElement>(null)

    return (
        <Scoped>
            <Card>
                <div ref={Ref}></div>
                <Flex justify="space-between" align="center" className='title font-16 font-w-600 color-242833'>
                    <div >市场</div>
                    <div className="font-14 color-356DFF font-w-500 cursor-pointer" onClick={()=>setOpen(true)}>更换</div>
                </Flex>
                <Form>
                    <div className="font-w-600" style={{}}>United States</div>
                    <div style={{marginTop:"8px"}}>美国 (USD) </div>
                </Form>

                {/* 市场 */}
                <Modal title="更换市场" centered getContainer={() => Ref.current!} open={open} onCancel={()=>setOpen(false)}>
                    <div className="search-input-warp">
                        <DynamicSearchInput className="search-input" placeholder={"搜索国家/地区名称"} suffix={<SearchOutlined />} />
                    </div>
                    <Radio.Group
                        style={style}
                        options={[
                            { value: 1, label: '加拿大' },
                        ]}
                        />
                </Modal>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
  background-color: #f7f8fb;
  .title{
    margin-bottom: 20px;
  }
  .search-input-warp{
    margin:20px 0;
  }
`
export default observer(MaketCard);