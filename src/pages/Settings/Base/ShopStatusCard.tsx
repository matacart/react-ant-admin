import InputSearch from "@/components/Search/InputSearch";
import { getCurrenciesList, getTimeZoneList } from "@/services/y2/api";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Select, Switch, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import baseInfoStore from "@/store/set-up/baseInfoStore"
import { observer } from "mobx-react-lite";


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
                        <Select
                            defaultValue={baseInfoStore.storeStauts}
                            style={{ width: 256 }}
                            onChange={(value)=>baseInfoStore.setStoreStauts(value)}
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