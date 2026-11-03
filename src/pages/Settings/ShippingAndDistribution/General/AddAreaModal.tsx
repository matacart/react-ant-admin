// import DefaultButton from "@/components/Button/DefaultButton";
// import PrimaryButton from "@/components/Button/PrimaryButton";
// import MyInput from "@/components/Input/MyInput";
// import generalFreight, { ProductGroup } from "@/store/settings/ShippingAndDistribution/generalFreight";
// import { Divider, Flex, Form, Modal, Tree, TreeDataNode } from "antd";
// import { observer } from "mobx-react-lite";
// import { Key, useEffect, useMemo, useRef, useState } from "react";
// import styled from "styled-components";
// import { addAreaPlan } from "./area";

// /** 后端提交格式 */
// interface SubmitCountry {
//     countryCode: string;
//     areaCodes?: string[];
//     selectedAreaNum?: number;
//     isCountryAllChoose: boolean;
//     totalAreaNum: number;
// }

// /** 把洲/国家数据转成 Tree 数据 */
// const buildTreeData = (list: any[], parentKey = ""): TreeDataNode[] => {
//     return list.map((data) => {
//         const selfCode = data?.countryCode || data?.code;
//         const key = parentKey ? `${parentKey}-${selfCode}` : selfCode;
//         const childList = data?.countries || data?.libraryNodes || data?.child || [];
//         const children = buildTreeData(childList, key);
//         return {
//             title: data.name,
//             key,
//             children,
//         };
//     });
// };
// /**
//  * 递归过滤
//  * - 自身命中：保留整棵子树，不再向下递归
//  * - 自身不命中：递归子节点，有命中才保留父节点
//  * - 同时把命中路径上的父 key 收集到 expandKeys
//  */
// const filterTreeData = (
//     nodes: TreeDataNode[],
//     keyword: string,
//     expandKeys: Key[] = [],
// ): TreeDataNode[] => {
//     const result: TreeDataNode[] = [];
//     nodes.forEach((node) => {
//         const selfMatched = String(node.title).toLowerCase().includes(keyword);
//         if (selfMatched) {
//             result.push(node);
//             if (node.children?.length) expandKeys.push(node.key);
//             return;
//         }
//         if (node.children?.length) {
//             const childExpand: Key[] = [];
//             const children = filterTreeData(node.children, keyword, childExpand);
//             if (children.length > 0) {
//                 result.push({ ...node, children });
//                 expandKeys.push(node.key, ...childExpand);
//             }
//         }
//     });
//     return result;
// };

// /** 收集树里所有 key */
// const collectKeys = (nodes: TreeDataNode[], keys: Key[] = []): Key[] => {
//     nodes.forEach((node) => {
//         keys.push(node.key);
//         if (node.children?.length) collectKeys(node.children, keys);
//     });
//     return keys;
// };

// /**
//  * selectedKeys -> 后端提交格式
//  * key 结构：EUROPE-AT    两段 = 整个国家
//  *          EUROPE-AT-95  三段 = 国家下的省
//  */
// const toSubmitFormat = (
//     selectedKeys: string[],
//     countryMap: Map<string, { country: any; continentCode: string }>,
// ): SubmitCountry[] => {
//     const groups = new Map<string, { whole: boolean; regionCodes: string[] }>();

//     selectedKeys.forEach((key) => {
//         const parts = key.split("-");
//         if (parts.length < 2) return;

//         const countryCode = parts[1];
//         const regionCode = parts[2] ?? null;

//         if (!groups.has(countryCode)) {
//             groups.set(countryCode, { whole: false, regionCodes: [] });
//         }
//         const g = groups.get(countryCode)!;
//         if (regionCode) g.regionCodes.push(regionCode);
//         else g.whole = true;
//     });

//     return Array.from(groups.entries()).map(([countryCode, { whole, regionCodes }]) => {
//         const entry = countryMap.get(countryCode);
//         const total = (entry?.country?.libraryNodes || []).length;
//         const isAll = whole || total === 0 || regionCodes.length === total;

//         if (isAll) {
//             return { countryCode, isCountryAllChoose: true, totalAreaNum: 0 };
//         }
//         return {
//             countryCode,
//             areaCodes: regionCodes,
//             selectedAreaNum: regionCodes.length,
//             isCountryAllChoose: false,
//             totalAreaNum: total,
//         };
//     });
// };

// /**
//  * 后端提交格式 -> selectedKeys（回显用）
//  * - 全选 + 无省 → 国家 key（EUROPE-AD）
//  * - 全选 + 有省 → 展开成所有省 key，和 onCheck 存的格式一致
//  * - 部分选 → areaCodes 逐个转省 key（EUROPE-AT-95）
//  */
// const fromSubmitFormat = (
//     shippingAreas: SubmitCountry[],
//     countryMap: Map<string, { country: any; continentCode: string }>,
// ): string[] => {
//     const keys: string[] = [];

//     shippingAreas.forEach((item) => {
//         const entry = countryMap.get(item.countryCode);
//         if (!entry) return;

//         const { country, continentCode } = entry;
//         const regionNodes: any[] = country.libraryNodes || [];
//         const base = `${continentCode}-${item.countryCode}`;

//         if (item.isCountryAllChoose) {
//             if (regionNodes.length === 0) {
//                 keys.push(base);
//             } else {
//                 regionNodes.forEach((r) => keys.push(`${base}-${r.code}`));
//             }
//         } else {
//             (item.areaCodes || []).forEach((code) => keys.push(`${base}-${code}`));
//         }
//     });

//     return keys;
// };

// interface AddAreaModalProps {
//     /** 编辑场景：后端返回的 shippingAreas，用于回显 */
//     initialShippingAreas?: SubmitCountry[];
// }

// function AddAreaModal({ deliveryLocation }: { deliveryLocation: ProductGroup }) {
//     const [open, setOpen] = useState(false);
//     const scopedRef = useRef<HTMLDivElement>(null);
//     const [form] = Form.useForm();

//     const [rawTreeData, setRawTreeData] = useState<TreeDataNode[]>([]);

//     const [inputValue, setInputValue] = useState("");
//     const [keyword, setKeyword] = useState("");
//     const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

//     const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
//     const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

//     // countryCode -> { country, continentCode }
//     // 正向转换算 totalAreaNum，反向转换拼 EUROPE-AT-95 需要 continentCode
//     const countryMap = useMemo(() => {
//         const map = new Map<string, { country: any; continentCode: string }>();
//         (generalFreight.countryList || []).forEach((continent: any) => {
//             (continent.countries || []).forEach((country: any) => {
//                 map.set(country.countryCode, {
//                     country,
//                     continentCode: continent.code,
//                 });
//             });
//         });
//         return map;
//     }, [generalFreight.countryList]);

//     const init = () => {
//         // 编辑场景：把后端 shippingAreas 转回 selectedKeys 回显
//         // if (initialShippingAreas?.length) {
//         //     setSelectedKeys(fromSubmitFormat(initialShippingAreas, countryMap));
//         // }
//         setOpen(true);
//     };

//     const submit = () => {
//         if (selectedKeys.length === 0) return;
//         form.validateFields().then((values) => {
//             const shippingAreas = toSubmitFormat(selectedKeys, countryMap);
//             const areaPlans = {
//                 shippingRegionSeq : "AP"+new Date().getTime().toString(),
//                 addressType: 2,
//                 shippingName: values.areaName,
//                 deliveryPlans: [],
//                 deliveryAddressSeq: "",
//                 isDefault: false,
//                 shippingAreas,
//             };
//             const newProductGroup = generalFreight.productGroupList.map((item: ProductGroup) => {
//                 if(item.deliveryLocationGroupSeq == deliveryLocation.deliveryLocationGroupSeq){
//                     return {
//                         ...item,
//                         areaPlanList: [...(item.areaPlanList || []), areaPlans],
//                     }
//                 }
//                 return item;
//             });
//             generalFreight.setProductGroupList(newProductGroup);
//             // 新增区域计划
//             addAreaPlan(deliveryLocation.deliveryLocationGroupSeq, areaPlans);
//             setOpen(false);
//         }).catch((e) => {
//             console.log(e);
//         });
//     };

//     useEffect(() => {
//         setRawTreeData(buildTreeData(generalFreight.countryList || []));
//     }, [generalFreight.countryList]);

//     // 过滤 + 收集展开 key 一次完成
//     const { treeData, filterExpandKeys } = useMemo(() => {
//         const kw = keyword.trim().toLowerCase();
//         if (!kw) return { treeData: rawTreeData, filterExpandKeys: [] as Key[] };
//         const expandKeys: Key[] = [];
//         const data = filterTreeData(rawTreeData, kw, expandKeys);
//         return { treeData: data, filterExpandKeys: expandKeys };
//     }, [rawTreeData, keyword]);

//     // 搜索时展开命中路径
//     useEffect(() => {
//         if (!keyword.trim()) return;
//         setExpandedKeys(filterExpandKeys);
//     }, [keyword, filterExpandKeys]);

//     // 缓存可见 key 集合，onCheck 复用
//     const visibleKeySet = useMemo(
//         () => new Set(collectKeys(treeData)),
//         [treeData],
//     );

//     const searchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const v = e.target.value ?? "";
//         setInputValue(v);
//         clearTimeout(debounceTimer.current);
//         debounceTimer.current = setTimeout(() => setKeyword(v), 300);
//     };

//     useEffect(() => () => clearTimeout(debounceTimer.current), []);

//     return (
//         <Scoped ref={scopedRef}>
//             <DefaultButton onClick={init} text="添加区域" />
//             <Modal
//                 open={open}
//                 onCancel={() => setOpen(false)}
//                 getContainer={() => scopedRef.current!}
//                 title="添加区域"
//                 width={620}
//                 centered
//                 footer={() => (
//                     <Flex justify="space-between" align="center">
//                         {selectedKeys.length === 0 ? (
//                             <div className="color-F86140 font-12">至少选择 1 个国家或地区</div>
//                         ) : (
//                             <div className="font-12">已选择 {selectedKeys.length} 个国家或地区</div>
//                         )}
//                         <Flex justify="flex-end" gap={12}>
//                             <DefaultButton onClick={() => setOpen(false)} text="取消" />
//                             <PrimaryButton onClick={submit} text="确定" />
//                         </Flex>
//                     </Flex>
//                 )}
//             >
//                 <MyForm layout="vertical" form={form}>
//                     <Form.Item
//                         className="mb-20"
//                         name="areaName"
//                         label={false}
//                         rules={[{ required: true, message: "请输入区域名称" }]}
//                     >
//                         <MyInput style={{ height: "36px" }} placeholder="请输入区域名称" />
//                     </Form.Item>
//                 </MyForm>
//                 <Divider style={{ margin: "20px 0" }} />
//                 <MyInput
//                     placeholder="按国家/地区名称搜索"
//                     style={{ height: "36px" }}
//                     value={inputValue}
//                     allowClear
//                     onChange={searchCountry}
//                 />
//                 <div className="tree-box">
//                     <Tree
//                         checkable
//                         checkedKeys={selectedKeys}
//                         expandedKeys={expandedKeys}
//                         onExpand={(keys) => setExpandedKeys(keys)}
//                         expandAction="click"
//                         treeData={treeData}
//                         onCheck={(_, info) => {
//                             const hiddenSelected = selectedKeys.filter(
//                                 (k: string) => !visibleKeySet.has(k),
//                             );
//                             const leafKeys = (info.checkedNodes as TreeDataNode[]).filter((n) => !n.children || n.children.length === 0).map((n) => n.key as string);
//                             setSelectedKeys([...hiddenSelected, ...leafKeys]);
//                         }}
//                         style={{ fontSize: "14px", fontWeight: "400", width: "100%" }}
//                     />
//                 </div>
//             </Modal>
//         </Scoped>
//     );
// }

// const Scoped = styled.div`
//     .tree-box{
//         width: 100%;
//         height: 300px;
//         margin-top: 20px;
//         overflow: auto;
//     }
// `;

// const MyForm = styled(Form)`
//     margin-top: 20px;
//     .ant-form-item{
//         margin-bottom: 0;
//     }
//     .ant-form-item-required::before {
//         display: none !important;
//     }
//     .setting-title{
//         margin-bottom: 12px;
//         padding-bottom: 12px;
//         border-bottom: 1px solid #d7dbe7;
//     }
//     .setting-item{
//         margin-bottom: 12px;
//         padding-top: 20px;
//         border-top: 1px solid #d7dbe7;
//     }
// `

// export default observer(AddAreaModal);
