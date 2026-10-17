import { Card, Form } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import base from "@/store/settings/base/base";
import { observer } from "mobx-react-lite";
import DefaultSelect from "@/components/Select/DefaultSelect";


function shopStatusCard() {

    useEffect(()=>{
    },[])

    return (
        <Scoped>
            <Card style={{marginBottom:"20px"}}>
                <Form layout={"vertical"}>
                    <Form.Item
                        label="商店状态"
                        >
                        <DefaultSelect
                            defaultValue={base.storeInfo.status}
                            style={{ width: 256 }}
                            onChange={(value)=>base.setStoreInfo({
                                ...base.storeInfo,
                                status:value
                            })}
                            options={[
                                { value: '0', label: '打烊' },
                                { value: '1', label: '营业中' },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}


export default observer(shopStatusCard)

const Scoped = styled.div`
`