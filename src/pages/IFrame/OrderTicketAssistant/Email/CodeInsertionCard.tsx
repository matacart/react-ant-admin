import { Button, Card, Input, message } from "antd"
import copy from "copy-to-clipboard";
import styled from "styled-components"
import { set } from 'lodash';
import { useState } from "react";



const { TextArea } = Input;



const codeText = `<p><a target="_blank" href="https://admin.innovelabs.com/apps/download-pdf/orders/weiwu2/11337ec3e061476484f3dd338489d3a0/<%- dataModel.bizData?.orderDetail?.orderId %>/<%- dataModel.bizData?.orderDetail?.appOrderSeq %>">74JHJH</a></p>`

function CodeInsertionCard() {

  return (
    <Scoped>
        <Card>
            <div className="steps-1">
                <div className="steps font-16 color-242833 font-w-600">步骤  1/3</div>
                <div className="desc font-14 color-474F5E">全选并拷贝以下代码:</div>
                <TextArea readOnly rows={4} value={codeText} />
                <Button style={{margin:"8px 0 24px 0"}} onClick={() => {
                    copy(codeText)
                    message.success("复制成功")
                }}>复制代码</Button>
            </div>
            <div className="steps-2">
                <div className="steps font-16 color-242833 font-w-600">步骤  2/3</div>
                <div className="desc font-14 color-474F5E">{`在您的MataCart后台中，进入设置>通知>订单确认页面，您也可点击下方按钮快速跳转:`}</div>
                <Button style={{margin:"8px 0 24px 0"}}>{`跳转至设置>通知>订单确认`}</Button>
            </div>
            <div className="steps-3">
                <div className="steps font-16 color-242833 font-w-600">步骤  3/3</div>
                <div className="desc font-14 color-474F5E">{`旧邮件模板编辑器: 将复制的代码插入在如图所示位置，并保存修改，即可完成配置。`}</div>
                <div>
                    <img src="/img/old-mail-template.svg" />
                </div>
                <div className="desc font-14 color-474F5E">{`新邮件模板编辑器: 将复制的代码插入在如图所示位置，并保存修改，即可完成配置。`}</div>
                <div>
                    {/* <img src="/src/accimg/new-mail-template.svg" /> */}
                </div>
            </div>
        </Card>
    </Scoped>
  )
}

export default CodeInsertionCard

const Scoped = styled.div`
    .steps-1{
        :where(.css-dev-only-do-not-override-no4izc).ant-input-outlined{
            /* cursor: auto; */
            min-height: 32px;
            background: #f7f8fb;
        }
    }
    .steps{
        margin-bottom: 8px;
    }
    .desc{
        margin-bottom: 8px;
    }
`