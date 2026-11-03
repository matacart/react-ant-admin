import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import customFreight, { AreaPlan, ProductGroup } from "@/store/settings/ShippingAndDistribution/customFreight";
import { Divider, Flex, Form, Modal, Tree, TreeDataNode } from "antd";
import { observer } from "mobx-react-lite";
import { Key, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { addAreaPlan, updateAreaPlan } from "./area";

/** 后端提交格式 */
interface SubmitCountry {
    countryCode: string;
    areaCodes?: string[];
    selectedAreaNum?: number;
    isCountryAllChoose: boolean;
    totalAreaNum: number;
}

/** 把洲/国家数据转成 Tree 数据 */
const buildTreeData = (list: any[], parentKey = ""): TreeDataNode[] => {
    return list.map((data) => {
        const selfCode = data?.countryCode || data?.code;
        const key = parentKey ? `${parentKey}-${selfCode}` : selfCode;
        const childList = data?.countries || data?.libraryNodes || data?.child || [];
        const children = buildTreeData(childList, key);
        return {
            title: data.name,
            key,
            children,
        };
    });
};
/**
 * 递归过滤
 * - 自身命中：保留整棵子树，不再向下递归
 * - 自身不命中：递归子节点，有命中才保留父节点
 * - 同时把命中路径上的父 key 收集到 expandKeys
 */
const filterTreeData = (
    nodes: TreeDataNode[],
    keyword: string,
    expandKeys: Key[] = [],
): TreeDataNode[] => {
    const result: TreeDataNode[] = [];
    nodes.forEach((node) => {
        const selfMatched = String(node.title).toLowerCase().includes(keyword);
        if (selfMatched) {
            result.push(node);
            if (node.children?.length) expandKeys.push(node.key);
            return;
        }
        if (node.children?.length) {
            const childExpand: Key[] = [];
            const children = filterTreeData(node.children, keyword, childExpand);
            if (children.length > 0) {
                result.push({ ...node, children });
                expandKeys.push(node.key, ...childExpand);
            }
        }
    });
    return result;
};

/** 收集树里所有 key */
const collectKeys = (nodes: TreeDataNode[], keys: Key[] = []): Key[] => {
    nodes.forEach((node) => {
        keys.push(node.key);
        if (node.children?.length) collectKeys(node.children, keys);
    });
    return keys;
};

/**
 * selectedKeys -> 后端提交格式
 * key 结构：EUROPE-AT    两段 = 整个国家
 *          EUROPE-AT-95  三段 = 国家下的省
 */
const toSubmitFormat = (
    selectedKeys: string[],
    countryMap: Map<string, { country: any; continentCode: string }>,
): SubmitCountry[] => {
    const groups = new Map<string, { whole: boolean; regionCodes: string[] }>();

    selectedKeys.forEach((key) => {
        const parts = key.split("-");
        if (parts.length < 2) return;

        const countryCode = parts[1];
        const regionCode = parts[2] ?? null;

        if (!groups.has(countryCode)) {
            groups.set(countryCode, { whole: false, regionCodes: [] });
        }
        const g = groups.get(countryCode)!;
        if (regionCode) g.regionCodes.push(regionCode);
        else g.whole = true;
    });

    return Array.from(groups.entries()).map(([countryCode, { whole, regionCodes }]) => {
        const entry = countryMap.get(countryCode);
        const total = (entry?.country?.libraryNodes || []).length;
        const isAll = whole || total === 0 || regionCodes.length === total;

        if (isAll) {
            return { countryCode, isCountryAllChoose: true, totalAreaNum: 0 };
        }
        return {
            countryCode,
            areaCodes: regionCodes,
            selectedAreaNum: regionCodes.length,
            isCountryAllChoose: false,
            totalAreaNum: total,
        };
    });
};

/**
 * 后端提交格式 -> selectedKeys（回显用）
 * - 全选 + 无省 → 国家 key（EUROPE-AD）
 * - 全选 + 有省 → 展开成所有省 key，和 onCheck 存的格式一致
 * - 部分选 → areaCodes 逐个转省 key（EUROPE-AT-95）
 */
const fromSubmitFormat = (
    shippingAreas: SubmitCountry[],
    countryMap: Map<string, { country: any; continentCode: string }>,
): string[] => {
    const keys: string[] = [];

    shippingAreas.forEach((item) => {
        const entry = countryMap.get(item.countryCode);
        if (!entry) return;

        const { country, continentCode } = entry;
        const regionNodes: any[] = country.libraryNodes || [];
        const base = `${continentCode}-${item.countryCode}`;

        if (item.isCountryAllChoose) {
            if (regionNodes.length === 0) {
                keys.push(base);
            } else {
                regionNodes.forEach((r) => keys.push(`${base}-${r.code}`));
            }
        } else {
            (item.areaCodes || []).forEach((code) => keys.push(`${base}-${code}`));
        }
    });

    return keys;
};

type OccupiedMap = Map<string, { whole: boolean; regionCodes: Set<string> }>;
/** 汇总「其它区域」已占用的国家/省份（编辑时排除自己） */
const buildOccupiedMap = (
    areaPlanList: AreaPlan[] = [],
    excludeSeq?: string,
): OccupiedMap => {
    const map: OccupiedMap = new Map();
    areaPlanList.forEach((plan) => {
        if (excludeSeq && plan.shippingRegionSeq === excludeSeq) return;
        (plan.shippingAreas || []).forEach((item: SubmitCountry) => {
            if (!item?.countryCode) return;
            if (!map.has(item.countryCode)) {
                map.set(item.countryCode, { whole: false, regionCodes: new Set() });
            }
            const g = map.get(item.countryCode)!;
            if (item.isCountryAllChoose) {
                g.whole = true;
            } else {
                (item.areaCodes || []).forEach((code) => g.regionCodes.add(code));
            }
        });
    });
    return map;
};

/** 给树节点注入 disabled（依赖 洲-国-省 三段 key 约定） */
const applyDisabled = (nodes: TreeDataNode[], occupied: OccupiedMap): TreeDataNode[] => {
    const walk = (list: TreeDataNode[]): TreeDataNode[] =>
        list.map((node) => {
            const parts = String(node.key).split("-");
            const level = parts.length; // 1=洲 2=国家 3=省
            const countryCode = parts[1];
            const regionCode = parts[2];
            let disabled = false;

            if (level === 2) {
                const occ = occupied.get(countryCode);
                // 整国全选 或 已有省被占 → 国家节点禁用（勾国家=全选所有省，必冲突）
                if (occ && (occ.whole || occ.regionCodes.size > 0)) disabled = true;
            } else if (level === 3) {
                const occ = occupied.get(countryCode);
                if (occ) {
                    disabled = occ.whole || occ.regionCodes.has(regionCode);
                }
            }

            const children = node.children?.length ? walk(node.children) : node.children;

            // 洲：子节点全禁用则自身也禁用
            if (level === 1 && children?.length) {
                disabled = children.every((c) => c.disabled);
            }
            return { ...node, disabled, children };
        });
    return walk(nodes);
};

// 编辑回显时剪掉与其它区域冲突的历史 key -- 再init时使用
const pruneConflictKeys = (keys: string[], occupied: OccupiedMap): string[] => keys.filter((k) => {
    const parts = k.split("-");
    const occ = occupied.get(parts[1]);
    if (!occ) return true;
    if (occ.whole) return false;
    const regionCode = parts[2];
    if (!regionCode) return occ.regionCodes.size === 0;
    return !occ.regionCodes.has(regionCode);
});

function SetAreaModal({ deliveryLocationGroup, areaPlan }: { deliveryLocationGroup: ProductGroup, areaPlan?: AreaPlan }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    // const [rawTreeData, setRawTreeData] = useState<TreeDataNode[]>([]);

    const [inputValue, setInputValue] = useState("");
    const [keyword, setKeyword] = useState("");
    const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

    const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    // countryCode -> { country, continentCode }
    // 正向转换算 totalAreaNum，反向转换拼 EUROPE-AT-95 需要 continentCode
    const countryMap = useMemo(() => {
        const map = new Map<string, { country: any; continentCode: string }>();
        (customFreight.countryList || []).forEach((continent: any) => {
            (continent.countries || []).forEach((country: any) => {
                map.set(country.countryCode, {
                    country,
                    continentCode: continent.code,
                });
            });
        });
        return map;
    }, [customFreight.countryList]);

    // 1. 基础树（只依赖 countryList）
    const baseTreeData = useMemo(() => buildTreeData(customFreight.countryList || []),[customFreight.countryList]);

    // 2. 其它区域占用表（每次渲染算，保证 observer 正确订阅 areaPlanList）
    const occupiedMap = buildOccupiedMap(
        deliveryLocationGroup?.areaPlanList,
        areaPlan?.shippingRegionSeq,
    );

    // 3. 带 disabled 的全量树（派生，不再 setState）
    const rawTreeData = applyDisabled(baseTreeData, occupiedMap);

    const init = () => {

        console.log(deliveryLocationGroup.areaPlanList);


        if(areaPlan){
            form.setFieldsValue({
                areaName: areaPlan.shippingName,
            });
            setSelectedKeys(fromSubmitFormat(areaPlan.shippingAreas || [], countryMap));
        }else{
            form.setFieldsValue({
                areaName: "",
            });
            setSelectedKeys([]);
        }
        setExpandedKeys([]);
        setInputValue("");
        setKeyword("");
        setOpen(true);
    };

    const submit = () => {
        if (selectedKeys.length === 0) return;
        form.validateFields().then((values) => {
            const shippingAreas = toSubmitFormat(selectedKeys, countryMap);
            if(areaPlan){
                // 编辑区域计划
                const newAreaPlan = {
                    ...areaPlan,
                    shippingName: values.areaName,
                    shippingAreas,
                };
                customFreight.updateAreaPlanList(deliveryLocationGroup.deliveryLocationGroupSeq, newAreaPlan);
                updateAreaPlan(deliveryLocationGroup.deliveryLocationGroupSeq, newAreaPlan);
            }else{
                // 新增区域计划
                const newAreaPlan = {
                    shippingRegionSeq : "AP"+new Date().getTime().toString(),
                    addressType: 2,
                    shippingName: values.areaName,
                    deliveryPlans: [],
                    deliveryAddressSeq: "",
                    isDefault: false,
                    shippingAreas,
                };
                customFreight.addAreaPlanList(deliveryLocationGroup.deliveryLocationGroupSeq, newAreaPlan);
                addAreaPlan(deliveryLocationGroup.deliveryLocationGroupSeq, newAreaPlan);
            }
            setOpen(false);
        }).catch((e) => {
            console.log(e);
        });
    };

    // 过滤 + 收集展开 key 一次完成
    const { treeData, filterExpandKeys } = useMemo(() => {
        const kw = keyword.trim().toLowerCase();
        if (!kw) return { treeData: rawTreeData, filterExpandKeys: [] as Key[] };
        const expandKeys: Key[] = [];
        const data = filterTreeData(rawTreeData, kw, expandKeys);
        return { treeData: data, filterExpandKeys: expandKeys };
    }, [rawTreeData, keyword]);

    // 搜索时展开命中路径
    useEffect(() => {
        if (!keyword.trim()) return;
        setExpandedKeys(filterExpandKeys);
    }, [keyword, filterExpandKeys]);

    // 缓存可见 key 集合，onCheck 复用
    const visibleKeySet = useMemo(
        () => new Set(collectKeys(treeData)),
        [treeData],
    );

    const searchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value ?? "";
        setInputValue(v);
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => setKeyword(v), 300);
    };

    useEffect(() => () => clearTimeout(debounceTimer.current), []);

    return (
        <>
            {areaPlan ? <a style={{color:"#242833"}} onClick={init}>编辑区域</a>:<DefaultButton onClick={init} text="添加区域" />}
            <MyModal
                open={open}
                onCancel={() => setOpen(false)}
                title={areaPlan ? "编辑区域" : "添加区域"}
                width={620}
                centered
                footer={() => (
                    <Flex justify="space-between" align="center">
                        {selectedKeys.length === 0 ? (
                            <div className="color-F86140 font-12">至少选择 1 个国家或地区</div>
                        ) : (
                            <div className="font-12">已选择 {selectedKeys.length} 个国家或地区</div>
                        )}
                        <Flex justify="flex-end" gap={12}>
                            <DefaultButton onClick={() => setOpen(false)} text="取消" />
                            <PrimaryButton onClick={submit} text="确定" />
                        </Flex>
                    </Flex>
                )}
            >
                <MyForm layout="vertical" form={form}>
                    <Form.Item
                        className="mb-20"
                        name="areaName"
                        label={false}
                        rules={[{ required: true, message: "请输入区域名称" }]}
                    >
                        <MyInput style={{ height: "36px" }} placeholder="请输入区域名称" />
                    </Form.Item>
                </MyForm>
                <Divider style={{ margin: "20px 0" }} />
                <MyInput
                    placeholder="按国家/地区名称搜索"
                    style={{ height: "36px" }}
                    value={inputValue}
                    allowClear
                    onChange={searchCountry}
                />
                <div className="tree-box">
                    <Tree
                        checkable
                        checkedKeys={selectedKeys}
                        expandedKeys={expandedKeys}
                        onExpand={(keys) => setExpandedKeys(keys)}
                        expandAction="click"
                        treeData={treeData}
                        onCheck={(_, info) => {
                            const hiddenSelected = selectedKeys.filter(
                                (k: string) => !visibleKeySet.has(k),
                            );
                            const leafKeys = (info.checkedNodes as TreeDataNode[]).filter((n) => !n.children || n.children.length === 0).map((n) => n.key as string);
                            setSelectedKeys([...hiddenSelected, ...leafKeys]);
                        }}
                        style={{ fontSize: "14px", fontWeight: "400", width: "100%" }}
                    />
                </div>
            </MyModal>
        </>
    );
}

const MyModal = styled(Modal)`
    .tree-box{
        width: 100%;
        height: 300px;
        margin-top: 20px;
        overflow: auto;
    }
`;

const MyForm = styled(Form)`
    margin-top: 20px;
    .ant-form-item{
        margin-bottom: 0;
    }
    .ant-form-item-required::before {
        display: none !important;
    }
    .setting-title{
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid #d7dbe7;
    }
    .setting-item{
        margin-bottom: 12px;
        padding-top: 20px;
        border-top: 1px solid #d7dbe7;
    }
`

export default observer(SetAreaModal);
