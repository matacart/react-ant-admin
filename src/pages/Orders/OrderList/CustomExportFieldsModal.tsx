import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import orderList from "@/store/order/orderList";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Flex, Modal, Radio, Tooltip, Tree, TreeDataNode, TreeProps } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
};

function CustomExportFieldsModal() {

    const [open, setOpen] = useState(false);

    const [treeData,setTreeData] = useState<TreeDataNode[]>([
        {
          title: '订单信息',
          key: '0',
          children: [
            {
                title: '订单编号',
                key: '0-0',
            },
            {
                title: '订单ID',
                key: '0-1',
            },
            {
                title: '​采购订单号',
                key: '0-2',
            },
            {
                title: '订单日期',
                key: '0-3',
            },
            {
                title: '订单来源',
                key: '0-4',
            },
            {
                title: '订单状态',
                key: '0-5',
            },
            {
                title: '是否归档',
                key: '0-6',
            },
            {
                title: '订单标签',
                key: '0-7',
            },
          ],
        },
        {
          title: '商品信息',
          key: '1',
          children: [
            {
                title: '商品名称',
                key: '1-0',
            },
            {
                title: '商品SKU(货号)',
                key: '1-1',
            },
            {
                title: '商品条码(货号)',
                key: '1-2',
            },
            {
                title: '商品标签',
                key: '1-3',
            },
            {
                title: '商品链接',
                key: '1-4',
            },
            {
                title: '变体属性名称1',
                key: '1-5',
            },
            {
                title: '变体属性值1',
                key: '1-6',
            },
            {
                title: '变体属性名称2',
                key: '1-7',
            },
            {
                title: '变体属性值2',
                key: '1-8',
            },
            {
                title: '变体属性名称3',
                key: '1-9',
            },
            {
                title: '变体属性值3',
                key: '1-10',
            },
            {
                title: '变体属性名称4',
                key: '1-11',
            },
            {
                title: '变体属性值4',
                key: '1-12',
            },
            {
                title: '变体属性名称5',
                key: '1-13',
            },
            {
                title: '变体属性值5',
                key: '1-14',
            },
            {
                title: '定制属性',
                key: '1-15',
            },
            {
                title: '售价',
                key: '1-16',
            },
            {
                title: '商品成交价',
                key: '1-17',
            },
            {
                title: <div>
                    商品行成交价
                    <Tooltip title="去除了营销折扣">
                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>,
                key: '1-18',
            },
            {
                title: '单品折扣总合',
                key: '1-19',
            },
            {
                title: <div>
                    商品行折扣总和
                    <Tooltip title="新增了营销折扣">
                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>,
                key: '1-20',
            },
            {
                title: '数量',
                key: '1-21',
            },
            {
                title: '分类',
                key: '1-22',
            },
            {
                title: '厂商',
                key: '1-23',
            },
          ],
        },
        {
            title: '订单金额',
            key: '2',
            children: [
                {
                    title: '订单小计',
                    key: '2-0',
                },
                {
                    title: '运费',
                    key: '2-1',
                },
                {
                    title: '附加费',
                    key: '2-2',
                },
                {
                    title: '订单折扣',
                    key: '2-3',
                },
                {
                    title: '折扣码1',
                    key: '2-4',
                },
                {
                    title: '折扣码折扣金额1',
                    key: '2-5',
                },
                {
                    title: '折扣码2',
                    key: '2-6',
                },
                {
                    title: '折扣码折扣金额2',
                    key: '2-7',
                },
                {
                    title: '折扣码3',
                    key: '2-8',
                },
                {
                    title: '折扣码折扣金额3',
                    key: '2-9',
                },
                {
                    title: '折扣码4',
                    key: '2-10',
                },
                {
                    title: '折扣码折扣金额4',
                    key: '2-11',
                },
                {
                    title: '折扣码5',
                    key: '2-12',
                },
                {
                    title: '折扣码折扣金额5',
                    key: '2-13',
                },
                {
                    title: '折扣码折扣总金额',
                    key: '2-14',
                },
                {
                    title: '积分抵扣金额',
                    key: '2-15',
                },
                {
                    title: '小费',
                    key: '2-16',
                },
                {
                    title: '税费',
                    key: '2-17',
                },
                {
                    title: '订单商品税费总和',
                    key: '2-18',
                },
                {
                    title: '关税金额',
                    key: '2-19',
                },
                {
                    title: '订单关税总额',
                    key: '2-20',
                },
                {
                    title: '折抵购物金',
                    key: '2-21',
                },
                {
                    title: '自定折扣名称',
                    key: '2-22',
                },
                {
                    title: '自定折扣合计',
                    key: '2-23',
                },
                {
                    title: '自定义订单栏位1',
                    key: '2-24',
                },
                {
                    title: '自定义订单栏位2',
                    key: '2-25',
                },
                {
                    title: '自定义订单栏位3',
                    key: '2-26',
                },
                {
                    title: '自定义订单栏位4',
                    key: '2-27',
                },
                {
                    title: '自定义订单栏位5',
                    key: '2-28',
                },
                {
                    title: '调整金额',
                    key: '2-29',
                },
                {
                    title: '订单合计',
                    key: '2-30',
                },
                {
                    title: '订单货币',
                    key: '2-31',
                },
            ],
        },
        {
            title: '付款信息',
            key: '3',
            children: [
                {
                    title: '付款总金额',
                    key: '3-0',
                },
                {
                    title: '付款货币',
                    key: '3-1',
                },
                {
                    title: '付款状态',
                    key: '3-2',
                },
                {
                    title: '支付凭证',
                    key: '3-3',
                },
                {
                    title: '付款方式',
                    key: '3-4',
                },
                {
                    title: '支付流水号',
                    key: '3-5',
                },
                {
                    title: '付款日期',
                    key: '3-6',
                }
            ],
        },
        {
            title: '退款信息',
            key: '4',
            children: [
                {
                    title: '退款状态',
                    key: '4-0',
                },
                {
                    title: '退款总金额',
                    key: '4-1',
                }
            ],
        },
        {
            title: '发货信息',
            key: '5',
            children: [
                {
                    title: '发货状态',
                    key: '5-0',
                },
                {
                    title: '运费方案',
                    key: '5-1',
                },
                {
                    title: '配送方式',
                    key: '5-2',
                },
                {
                    title: '收件人名称',
                    key: '5-3',
                },
                {
                    title: '收件人电话号码',
                    key: '5-4',
                },
                {
                    title: '公司',
                    key: '5-5',
                },
                {
                    title: '税号',
                    key: '5-6',
                },
                {
                    title: '地址 1',
                    key: '5-7',
                },
                {
                    title: '地址 2',
                    key: '5-8',
                },
                {
                    title: '区/乡/镇',
                    key: '5-9',
                },
                {
                    title: '城市',
                    key: '5-10',
                },
                {
                    title: '地区/州/省份',
                    key: '5-11',
                },
                {
                    title: '国家/地区',
                    key: '5-12',
                },
                {
                    title: '邮编',
                    key: '5-13',
                },
                {
                    title: '完整地址',
                    key: '5-14',
                },
                {
                    title: '门市名称',
                    key: '5-15',
                },
                {
                    title: '门店地址',
                    key: '5-16',
                },
                {
                    title: '门店Code',
                    key: '5-17',
                },
                {
                    title: '运单号',
                    key: '5-18',
                },
            ],
        },
        {
            title: '客户信息',
            key: '6',
            children: [
                {
                    title: '卖家备注',
                    key: '6-0',
                },
                {
                    title: '客户备注',
                    key: '6-1',
                },
                {
                    title: '客户ID',
                    key: '6-2',
                },
                {
                    title: '客户姓名',
                    key: '6-3',
                },
                {
                    title: '客户邮箱',
                    key: '6-4',
                },
                {
                    title: '客户取消原因',
                    key: '6-5',
                },
                {
                    title: '客户电话',
                    key: '6-6',
                },
                {
                    title: '是否已激活客户',
                    key: '6-7',
                },
                {
                    title: 'IP',
                    key: '6-8',
                },
                {
                    title: 'user_agent',
                    key: '6-9',
                },
                {
                    title: '来源网站（即将下线）',
                    key: '6-10',
                },
                {
                    title: '落地页（即将下线）',
                    key: '6-11',
                },
                {
                    title: 'UTM',
                    key: '6-12',
                },
                {
                    title: '首次访问落地页URL',
                    key: '6-13',
                },
                {
                    title: '最后一次访问落地页URL',
                    key: '6-14',
                },
                {
                    title: '首次互动来源',
                    key: '6-15',
                },
                {
                    title: '末次互动来源',
                    key: '6-16',
                },
            ],
        },
        {
            title: '税费信息',
            key: '7',
            children: [
                {
                    title: '税名1',
                    key: '7-0',
                },
                {
                    title: '税金1',
                    key: '7-1',
                },
                {
                    title: '税名2',
                    key: '7-2',
                },
                {
                    title: '税金2',
                    key: '7-3',
                },
                {
                    title: '税名3',
                    key: '7-4',
                },
                {
                    title: '税金3',
                    key: '7-5',
                },
                {
                    title: '税名4',
                    key: '7-6',
                },
                {
                    title: '税金4',
                    key: '7-7',
                },
                {
                    title: '税名5',
                    key: '7-8',
                },
                {
                    title: '税金5',
                    key: '7-9',
                },
            ],
        },
        {
            title: '关税信息',
            key: '8',
            children: [
                {
                    title: '关税名1',
                    key: '8-0',
                },
                {
                    title: '关税金1',
                    key: '8-1',
                },
                {
                    title: '关税名2',
                    key: '8-2',
                },
                {
                    title: '关税金2',
                    key: '8-3',
                },
                {
                    title: '关税名3',
                    key: '8-4',
                },
                {
                    title: '关税金3',
                    key: '8-5',
                },
                {
                    title: '关税名4',
                    key: '8-6',
                },
                {
                    title: '关税金4',
                    key: '8-7',
                },
                {
                    title: '关税名5',
                    key: '8-8',
                },
                {
                    title: '关税金5',
                    key: '8-9',
                },
            ],
        },
    ])

    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
    
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const [code, setCode] = useState<React.Key[]>([])

    const [useMarketCurrency,setUseMarketCurrency] = useState(0)

    const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
        setCode(checkedKeysValue as React.Key[])
    };

    const submit = () => {
        orderList.setCode([...code])
        orderList.setUseMarketCurrency(useMarketCurrency)
        setOpen(false)
    }

    return (
        <>
            <div className="color-356DFF cursor-pointer" onClick={() => {
                setOpen(true)
                setCode([...orderList.code])
                setUseMarketCurrency(orderList.useMarketCurrency)
            }}>自定义导出字段</div>
            <Modal title="自定义导出字段" width={620} open={open} centered mask={false} onCancel={() => setOpen(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Flex justify='space-between' align='center'>
                            <div className="color-474F5E">已选择导出项({code.length}/129)</div>
                            <Flex gap={12}>
                                <DefaultButton text={"取消"} onClick={() => setOpen(false)} />
                                <PrimaryButton text={"保存"} onClick={submit} />
                            </Flex>
                        </Flex>
                    </>
                )}
            >
                <div style={{margin:"20px 0 12px"}}>导出设定</div>
                <Radio.Group
                    style={style}
                    value={useMarketCurrency}
                    onChange={(e)=>setUseMarketCurrency(e.target.value)}
                    options={[
                        { value: 0, label: '以店铺币种导出' },
                        { value: 1, label: '以订单币种导出' },
                    ]}
                />
                <div style={{margin:"20px 0 12px"}}>导出字段</div>
                <MyInput suffix={<SearchOutlined />} placeholder="搜索名称" style={{height:"36px"}} />
                <MyTree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={code}
                    treeData={treeData}
                />
            </Modal>
        </>
    );
}

const MyTree = styled(Tree as React.ComponentType<TreeProps<TreeDataNode>>)`
    margin-top: 20px;
    .ant-tree-treenode{
        margin-bottom: 12px;
    }
    height: 420px;
    overflow-y: auto;
`

export default observer(CustomExportFieldsModal);