
import { Card, Form, Select, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { Link } from "react-router-dom"
import newCategories from "@/store/categories/newCategories";


 function CategoriesSubnumber(){
    
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        newCategories.setIsShare(checked?'1':'0')
    };

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">共享信息
                        {/* <Tooltip title="上架信息">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip> */}
                    </span>
                    <Link to='#'>编辑</Link>
                </div>
                <Form layout="vertical">
                    <Form.Item
                        className="moreLink"
                        label={
                            <div className="label-content between">
                                <span>数据归属</span>
                            </div>
                        } >
                        <Select
                            style={{ width: "100%", height: "36px" }}
                            placeholder="数据归属"
                            defaultValue={newCategories.partsWarehouse}
                            options={[
                                { value: '0', label: '商户自建' },
                                { value: '1', label: '平台自建' },
                            ]}
                            onChange={(e)=>{
                                newCategories.setPartsWarehouse(e)
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className="item between">
                            <span>子号共享</span>
                            <Switch defaultChecked={newCategories.isShare == "1"?true:false} onChange={onChange} />
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}
export default observer(CategoriesSubnumber)

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}
.item{
        /* margin-bottom: 10px; */
        margin-top: 16px;
}
.between{
    display: flex;
    justify-content: space-between;
}
a{
    font-weight: 400;
}

:where(.css-dev-only-do-not-override-no4izc).ant-form-item {
    margin-bottom: 0;
}

`