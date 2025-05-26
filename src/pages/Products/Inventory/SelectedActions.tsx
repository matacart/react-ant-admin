import { Button, Checkbox, Flex, Input, MenuProps, Modal, Radio, Select } from "antd";
const { Option } = Select;
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteProductList, updataBatchUpdatePrice } from "@/services/y2/api";
import styled from "styled-components";
import { useState } from "react";
import ButtonDropdownSecondary from "@/components/Dropdown/ButtonDropdownSecondary";
import DefaultButton from "@/components/Button/DefaultButton";
import productList from "@/store/product/productList";
import { observer } from "mobx-react-lite";



// 自定义表头操作
function SelectedActions({onFetchData}: {onFetchData:any }) {
    const selectedCount = productList.productList.length;

    const controlsItems: MenuProps['items'] = [
      {
        label: <div>修改名称</div>,
        key: '1',
      },
      {
        label: <div>编辑厂商</div>,
        key: '2',
      },
      {
        label: <div>添加标签</div>,
        key: '3',
      },
      {
        label: <div>剔除标签</div>,
        key: '4',
      },
      {
        label: <div>添加销售渠道</div>,
        key: '5',
      },
      {
        label: <div>去除销售渠道</div>,
        key: '6',
      },
      {
        label: <div>修改重量</div>,
        key: '9',
      },
      {
        label: <div>更改库存</div>,
        key: '10',
      },
      {
        label: <div>编辑商品类型</div>,
        key: '11',
      },
    ];
    
    if (selectedCount === 0) return null;
    
    return (
      <Scoped style={{padding:"10px 0px",backgroundColor: '#fafafa'}}>
        <Flex gap={12} align="center">
            <Checkbox
              checked={selectedCount > 0}
              onClick={(e) => {
                e.stopPropagation(); // 阻止点击事件冒泡到父元素
                productList.setProductList([])
                // handleClearSelection();
              }}
              style={{ marginLeft: 10 }}
            />
            <span style={{ marginLeft: 10 }} className="color-242833">已选择 {productList.allSelected ? productList.count:selectedCount} 项</span>
            <DefaultButton text="上架" autoInsertSpace={false} />
            <DefaultButton text="下架" autoInsertSpace={false} />
            <ButtonDropdownSecondary btnStyle={{width:"128px"}} menu={{items:controlsItems,style:{height:"300px",width:"128px",background:"#FFF"}}} text="批量操作" trigger={['click']} />
            <DefaultButton text="将商品存档" />
            <DefaultButton text="进入批量编辑器" />
            {!productList.allSelected && <div style={{marginLeft:"12px"}} className="color-356DFF font-w-500 cursor-pointer" onClick={()=>{
              productList.setAllSelected(true)
            }}>全选{productList.count}个商品</div>}
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
