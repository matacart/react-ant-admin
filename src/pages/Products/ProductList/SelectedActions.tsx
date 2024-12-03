import { Button, Checkbox, Select } from "antd";
import styled from "styled-components";

// 自定义表头操作

export default function SelectedActions({ selectedRowKeys, setSelectedRowKeys }: { selectedRowKeys: React.Key[]; setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>> }) {
    const selectedCount = selectedRowKeys.length;
    
    if (selectedCount === 0) return null;
    const handleClearSelection = () => {
      setSelectedRowKeys([]);
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
              placeholder="批量编辑"
              style={{ width: 120 }}
              options={[
                { value: '1', label: '修改名称' },
                { value: '2', label: '编辑厂商' },
                { value: '3', label: '添加标签' },
                { value: '4', label: '剔除标签' },
                { value: '5', label: '添加销售渠道' },
                { value: '6', label: '去除销售渠道' },
                { value: '7', label: '修改售价' },
                { value: '8', label: '修改原价' },
                { value: '9', label: '修改重量' },
                { value: '10', label: '更改库存' },
                { value: '11', label: '编辑商品类型' },
                { value: '12', label: '删除商品' }
              ]}
              // onChange={handleMoreActionsChange}
            >
            </Select>
            <Button autoInsertSpace={false} style={{ margin: '10px' }}>将商品存档</Button>
            <Button autoInsertSpace={false}>进入批量编辑器</Button> {/* 新增的批量发货按钮 */}
          </div>
        </div>
      </Scoped>
    );
}

const Scoped = styled.div`
  .ant-select-selection-placeholder{
    color: #000000;
  }
`