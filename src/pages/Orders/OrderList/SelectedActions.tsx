import DefaultButton from "@/components/Button/DefaultButton";
import MyDropDownSecondary from "@/components/Dropdown/MyDropDownSecondary";
import { UnfoldIcon } from "@/components/Icons/Icons";
import { batchshipOrders, batchdelOrders, updateOrderStatus } from "@/services/y2/order";
import orderList from "@/store/order/orderList";
import { history } from "@umijs/max";
import { message, Modal, Checkbox, Button, Select, Flex, theme } from "antd";
import React, { useRef } from "react";
import styled from "styled-components";

const { useToken } = theme;

function SelectedActions(){

    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
      width:"256px"
    };
    
    const menuStyle: React.CSSProperties = {
      paddingTop:"8px",
      boxShadow: 'none',
    };

    const Ref = useRef(null);

    const selectedCount = orderList.orderIds.length;


    if (selectedCount === 0) return null;
  
    const handleBatchShipOrders = async () => {
      if (selectedCount === 0) {
        message.warning('请选择至少一项进行操作');
        return;
      }
    
      // 使用 Modal.confirm 弹出确认对话框
      Modal.confirm({
        title: '标记订单为已发货',
        content: (
          <div>
            <p>这些订单将被标记为“已发货”。</p>
            <div style={{ marginTop: '16px' }}>
              <Checkbox>
                给用户发送通知邮件
              </Checkbox>
            </div>
          </div>
        ),
        onOk: async () => {
          try {
            await batchshipOrders(selectedRowKeys as string[]);
            message.success('批量发货成功');
            // 清除选中状态
            // setSelectedRowKeys([]);
            // 重新加载数据
            // fetchData();
          } catch (error) {
            message.error('批量发货失败');
          }
        },
        onCancel: () => {
          console.log('Cancel');
        },
      });
    };
  
  
    const handleMoreActionsChange = (value: string) => {
      console.log('Selected more action:', value);
      // 根据 value 执行相应的操作
      if (value === 'delete-orders') {
        handleDeleteOrders();
      }
    };
    
    const handleDeleteOrders = async () => {
      // console.log('Selected Row Keys:', selectedRowKeys);
      // 确保 selectedRowKeys 不为空
      // if (selectedRowKeys.length === 0) {
      //   message.warning('请选择至少一项进行操作');
      //   return;
      // }
    
      // // 显示确认对话框
      // Modal.confirm({
      //   title: '确认删除?',
      //   content: '您确定要删除这些订单吗?',
      //   onOk: async () => {
      //     try {
      //       // 将数字数组转换为字符串数组
      //       const stringSelectedRowKeys = selectedRowKeys.map(String);
      //       const response = await batchdelOrders(stringSelectedRowKeys);
    
      //       if (response && response.code === 0) { // 后端成功状态码应为200
      //         message.success('订单删除成功');
      //         // 清除选中状态
      //         setSelectedRowKeys([]);
      //         // 重新加载数据
      //         fetchData();
      //       } else if (response && response.code === 201) {
      //         message.error(`订单删除失败，后端返回错误：${response.msg}`);
      //       } else {
      //         message.error('订单删除失败，请检查后端响应');
      //       }
      //     } catch (error) {
      //       let errorMessage = '订单删除失败';
      //       if (error instanceof Error) {
      //         errorMessage += `：${error.message}`;
      //       }
      //       message.error(errorMessage);
      //     }
      //   },
      //   onCancel: () => {
      //     console.log('Cancel');
      //   },
      // });
    };
  
    const handleAccountPayment = async () => {
      if (selectedCount === 0) {
        message.warning('请选择至少一项进行操作');
        return;
      }
    
      // 使用 Modal.confirm 弹出确认对话框
      Modal.confirm({
        title: '标记订单为已付款',
        content: (
          <div>
            <p>自定义支付的订单，付款状态将被标记为“已付款"</p>
            <p>已授权未入账的订单，付款状态将标记为“已付款"</p>
            <div style={{ marginTop: '16px' }}>
              <Checkbox>
                给用户发送通知邮件
              </Checkbox>
            </div>
          </div>
        ),
        onOk: async () => {
          try {
            // 将所有选定项的键合并成一个字符串
            const combinedKey = selectedRowKeys;
            const response = await updateOrderStatus(combinedKey);
            if (response.code === 0) {
              message.success('订单状态更新成功');
              // 重新获取数据并更新界面
              fetchData(); // 直接调用 fetchData 来刷新数据
            } else {
              message.error('订单状态更新失败');
            }
          } catch (error) {
            message.error('订单状态更新失败');
          }
        },
        onCancel: () => {
          console.log('Cancel');
        },
      });
    };

    return(
      <Scoped>
        <div ref={Ref} style={{ display: 'flex', alignItems: 'center',backgroundColor: '#fafafa',padding:"10px 0px" }}>
          <Checkbox
              checked={selectedCount > 0}
              onClick={(e) => {
                e.stopPropagation(); // 阻止点击事件冒泡到父元素
                orderList.setOrderIds([])
              }}
              style={{ marginLeft: 7 }}
          />
          <span style={{ marginLeft: 20 }}>已选择 {selectedCount} 项</span>
          <Flex gap={12} style={{ marginLeft: 20 }}>
            <DefaultButton text="入账付款" />
            <DefaultButton text="批量发货" />
            <MyDropDownSecondary
              getPopupContainer={()=>Ref.current!}
              tiggerEle={
                <DefaultButton text="更多操作" icon={<UnfoldIcon />} iconPosition="end" />
              }
              menu={{
                items:[
                  {
                    key: "1", label: (
                      <div onClick={() => {}}>归档订单</div>
                    )
                  },
                  {
                    key: "2", label: (
                      <div onClick={() => {}}>取消归档订单</div>
                    )
                  },
                  {
                    key: "3", label: (
                      <div onClick={() => {}}>添加标签</div>
                    )
                  },
                  {
                    key: "4", label: (
                      <div onClick={() => {}}>删除标签</div>
                    )
                  }
                ]
              }}
              dropdownRender={(menu:any)=>{
                return (
                    <div style={contentStyle}>
                        <div>
                            {React.cloneElement(
                                menu as React.ReactElement<{
                                    style: React.CSSProperties;
                                }>,
                                { style: menuStyle },
                            )}
                        </div>
                        <div className="apps-warp">
                          <div className="color-7A8499 font-12" style={{margin:"0 12px"}}>应用</div>
                          <Flex className="apps-item cursor-pointer" align="center" onClick={()=>history.push("/order_invoice_customization")}>
                            <div>
                              <img src="https://img.myshopline.com/image/devcenter/9999/8888/406ab03a38ad41b0b6bbd4e42734b4ee.png?w=120&h=120" />
                            </div>
                            <div className="color-474F5E">打印订单票据</div>
                          </Flex>
                        </div>
                    </div>
                )
              }}
            />
          </Flex>
        </div>
      </Scoped>
    )
}

const Scoped = styled.div`
  .apps-warp{
    padding: 8px 0;
    border-top: 1px solid #eef1f7;
    .apps-item{
      padding: 0 12px;
      height: 36px;
      img{
        width: 20px;
        margin-right: 8px;
      }
    }
    .apps-item:hover{
      background-color: rgba(0,0,0,0.04);
    }
  }

`


export default SelectedActions;