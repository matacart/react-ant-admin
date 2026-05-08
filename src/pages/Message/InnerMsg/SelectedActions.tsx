import { App, Checkbox, Flex } from "antd";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import innerMsg from "@/store/message/innerMsg/innerMsg";
import DefaultButton from "@/components/Button/DefaultButton";
import { delUserMessage, readAllMessage, readUserMessage } from "@/services/y2/api";
import DangerButton from "@/components/Button/DangerButton";
import { useState } from "react";
import { useIntl } from '@umijs/max';



// 自定义表头操作
function SelectedActions({fetchMessageList}: {fetchMessageList: () => void}) {

    const selectedCount = innerMsg.selectedRowKeys.length;

    if (selectedCount === 0) return null;

    const [loading,setLoading] = useState(false);
    const intl = useIntl();

    // 使用 App 组件提供的上下文
    const { modal, message } = App.useApp();
    
    return (
      <Scoped style={{padding:"10px 0px",backgroundColor: '#fafafa'}}>
        <Flex gap={12} align="center">
            <Checkbox
              checked={selectedCount > 0}
              onClick={(e) => {
                e.stopPropagation(); // 阻止点击事件冒泡到父元素
                innerMsg.setSelectedRowKeys([])
              }}
              style={{ marginLeft: 10, marginRight: 10 }}
            />
            <DefaultButton text={intl.formatMessage({ id: 'innerMsg.selectedActions.actions.delete' })} onClick={() => {
                const confirm = modal.confirm({
                    title: intl.formatMessage({ id: 'innerMsg.selectedActions.modals.deleteTitle' }),
                    content: intl.formatMessage({ id: 'innerMsg.selectedActions.modals.deleteContent' }, { count: innerMsg.selectedRowKeys.length }),
                    centered:true,
                    footer:()=><Flex gap={12} justify="end">
                        <DefaultButton text={intl.formatMessage({ id: 'innerMsg.selectedActions.actions.cancel' })} onClick={() => {
                            confirm.destroy();
                        }} />
                        <DangerButton loading={loading} text={intl.formatMessage({ id: 'innerMsg.selectedActions.actions.delete' })} onClick={() => {
                            setLoading(true);
                            delUserMessage({ ids: innerMsg.selectedRowKeys.join(",") }).then((res) => {
                                if(res.code == 0){
                                    message.success(intl.formatMessage({ id: 'innerMsg.selectedActions.messages.success' }));
                                    innerMsg.setSelectedRowKeys([]);
                                    // 重新加载数据
                                    fetchMessageList();
                                }
                            }).catch((err) => {
                                console.error("Error");
                            }).finally(()=>{
                                setLoading(false);
                                confirm.destroy();
                            });
                        }} />
                    </Flex>
                });
                
            }} />
            <DefaultButton text={intl.formatMessage({ id: 'innerMsg.selectedActions.actions.markRead' })} onClick={() => {
                readUserMessage({ ids: innerMsg.selectedRowKeys.join(",")}).then((res) => {
                    if(res.code == 0){
                        message.success(intl.formatMessage({ id: 'innerMsg.selectedActions.messages.success' }));
                        innerMsg.setSelectedRowKeys([]);
                    } 
                }).catch((err) => {
                    console.error("Error");
                }).finally(()=>{
                });
            }} />
            <DefaultButton text={intl.formatMessage({ id: 'innerMsg.selectedActions.actions.markAllRead' })} onClick={() => {
                readAllMessage().then((res) => {
                    if(res.code == 0){
                        message.success(intl.formatMessage({ id: 'innerMsg.selectedActions.messages.success' }));
                        innerMsg.setSelectedRowKeys([]);
                    }
                }).catch((err) => {
                    console.error("Error");
                }).finally(()=>{
                });
            }} />
        </Flex>
      </Scoped>
    );
}


export default observer(SelectedActions)

const Scoped = styled.div`
  width: 100%;
  .ant-select-selection-placeholder{
    color: #000000;
  }
`
