import { Button, Card, Form } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import DefaultSelect from "@/components/Select/DefaultSelect";
import base from "@/store/settings/base/base";


function DataShare() {

    return (
        <Scoped>
            <Card style={{marginBottom:"20px"}}>
                <Form layout={"vertical"}>
                    <Form.Item
                        label="共享模式"
                        >
                        <div style={{marginBottom:"14px"}}>独立店铺模式下，所有数据完全隔离，仅当前站点可管理。全局共享模式下，配置与商品库同步全平台站点，无需重复创建商品</div>
                        <DefaultSelect
                            defaultValue={base.storeInfo.data_scope}
                            style={{ width: 256 }}
                            onChange={(value)=>base.setStoreInfo({
                                ...base.storeInfo,
                                data_scope:value
                            })}
                            options={[
                                { value: '0', label: '独立店铺模式' },
                                { value: '1', label: '全局共享模式' },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}


export default observer(DataShare)

const Scoped = styled.div`
`