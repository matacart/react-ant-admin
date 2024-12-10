import { Button, Checkbox, Modal, Select } from "antd";
const { Option } = Select;
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteProductList } from "@/services/y2/api";
import styled from "styled-components";



// 自定义表头操作

export default function SelectedActions({ selectedRowKeys, setSelectedRowKeys,onFetchData }: { selectedRowKeys: React.Key[]; setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;onFetchData:any }) {
    const selectedCount = selectedRowKeys.length;
    
    if (selectedCount === 0) return null;
    const handleClearSelection = () => {
      setSelectedRowKeys([]);
    };

    const handleBatchEditingChange = (value: string) => {
      // 在这里处理批量编辑的操作
      console.log(`Selected value: ${value}`);
      switch(value){
        case '1':
          // 批量编辑名称
          break;
        case '2':
          // 批量编辑厂商
          break;
        case '3':
          // 批量添加标签
          break;
        case '4':
          // 批量剔除标签
          break;
        case '5':
          // 批量添加销售渠道
        case '12':
          // 批量删除商品
          confirm();
          break;
      }

    };

    // 
    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
      modal.confirm({
        title: '确定删除'+selectedCount+'件商品？',
        icon: <ExclamationCircleOutlined />,
        content: '商品删除后不可恢复，所关联的活动也会自动剔除这些商品',
        centered:true,
        okText: '确认',
        cancelText: '取消',
        onOk(){
          // 删除商品
          deleteProductList(selectedRowKeys.toString()).then(res=>{
            console.log(res);
            if(res.code == 0){
              // 清除选中状态
              setSelectedRowKeys([]);
              // 重新加载数据
              // fetchData();
              onFetchData();
            }
          })
        }
      });
    };
    
    return (
      <Scoped>
      <div style={{ display: 'flex', alignItems: 'center',backgroundColor: '#fafafa'}}>
          <Checkbox
            checked={selectedCount > 0}
            onClick={(e) => {
              e.stopPropagation(); // 阻止点击事件冒泡到父元素
              handleClearSelection();
            }}
            style={{ marginLeft: 20 }}
          />
          <span style={{ marginLeft: 20 }}>已选择 {selectedCount} 项</span>
          <div style={{ margin: '10px' }}>
            <Button autoInsertSpace={false}>上架</Button>
            <Button autoInsertSpace={false} style={{ margin: '10px' }}>下架</Button> {/* 新增的批量发货按钮 */}
              <Select
                // placeholder="批量编辑"
                style={{ width: 120 }}
                onSelect={handleBatchEditingChange}
                value={"批量编辑"}
              >
                <Option value="1">修改名称</Option>
                <Option value="2">编辑厂商</Option>
                <Option value="3">添加标签</Option>
                <Option value="4">剔除标签</Option>
                <Option value="5">添加销售渠道</Option>
                <Option value="6">去除销售渠道</Option>
                <Option value="7">修改售价</Option>
                <Option value="8">修改原价</Option>
                <Option value="9">修改重量</Option>
                <Option value="10">更改库存</Option>
                <Option value="11">编辑商品类型</Option>
                <Option value="12"><span style={{color:'#F00'}}>删除商品</span></Option>
              </Select>
            <Button autoInsertSpace={false} style={{ margin: '10px' }}>将商品存档</Button>
            <Button autoInsertSpace={false}>进入批量编辑器</Button> {/* 新增的批量发货按钮 */}
          </div>
          {/* 弹窗 */}
          {contextHolder}
      </div>
      </Scoped>
    );
}

const Scoped = styled.div`
  .ant-select-selection-placeholder{
    color: #000000;
  }
`
