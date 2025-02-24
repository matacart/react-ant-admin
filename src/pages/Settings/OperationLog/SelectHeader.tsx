import { DownOutlined } from "@ant-design/icons";
import { Button, Cascader, Col, DatePicker, Dropdown, Flex, Input, MenuProps, Row, Select, Space } from "antd";


interface Option {
    value: string;
    label: string;
    children?: Option[];
}

const { Search } = Input;
const { RangePicker } = DatePicker;

export default function SelectHeader() {

    const options: Option[] = [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
            },
          ],
        },
      ];

      const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div>修改默认语言</div>
          ),
        },
        {
          key: '3',
          label: (
            <div>menu item1st</div>
          ),
        }
        
      ];

    return (
        <Row className="" gutter={16}>
            <Col>
                <Space.Compact>
                    <Select
                        defaultValue={0}
                        options={[
                            { value: 0, label: '操作详情' },
                            { value: 1, label: '操作人账号'},
                            { value: 2, label: '操作人名称' },
                        ]}
                    />
                    <Search placeholder="" />
                </Space.Compact>
            </Col>
            {/*  */}
            <Col>
                <Cascader options={options} expandTrigger={"hover"} changeOnSelect={true} onChange={()=>{console.log(123)}} placeholder="Please select" />
            </Col>
            {/*  */}
            <Col>
                <Dropdown menu={{ items }}>
                    <Button>
                        <Flex style={{width:100}} justify="space-between">
                            <div>操作事件</div>
                            <div><DownOutlined /></div>
                        </Flex>
                    </Button>
                </Dropdown>
            </Col>
            {/*  */}
            <Col>
                <Flex align="center">
                    <div style={{marginRight:8}}>操作时间</div>
                    <RangePicker />
                </Flex>
            </Col>
        </Row>
    )
}