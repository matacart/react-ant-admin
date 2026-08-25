import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton";
import ProductCategoriesSelect from "@/components/Select/ProductCategoriesSelect";
import { getCategoryList } from "@/services/y2/api";
import taxes from "@/store/settings/taxes/taxes";
import { EditOutlined } from "@ant-design/icons";
import { Flex, Form, Modal, Radio, Select } from "antd"
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import cookie from 'react-cookies';

function CustomTaxEdit({index}:{index:number}) {

    const langId = cookie.load("domain")?.languages_id || "2"

    const [open,setOpen] = useState(false);

    const [form] = Form.useForm();

    const type = Form.useWatch('type', form); // 订阅 type 字段

    const [categoryList,setCategoryList] = useState<any[]>([]);

    const [page,setPage] = useState(1);

    const [isFreight,setIsFreight] = useState(false);

    const [loadingMore, setLoadingMore] = useState(false); // 是否正在加载更多

    const [hasMore, setHasMore] = useState(true); // 是否还有更多数据

    // 加载更多数据的函数
    const loadMore = () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        const nextPage = page + 1;
        getCategoryList({
            languages_id: langId,
            page: nextPage.toString(),
            limit: "10",
        }).then((res: any) => {
            if (res.code == 0) {
                if (res.data.length > 0) {
                    setCategoryList((prev:any[]) => [...prev, ...res.data.map((item:any)=>({
                        label:item.delimiter + item.title,
                        value:item.id,
                    }))]);
                    setPage(nextPage);
                } else {
                    setHasMore(false); // 没有更多数据了
                }
            }
        }).catch(() => {
            // message.error('加载更多失败');
        }).finally(() => {
            setLoadingMore(false);
        });
    };

    const cancel = () => {
        setOpen(false);
    }

    const submit = () => {
        form.validateFields().then((values) => {
            let taxesName;
            if(values.type == "2"){
                taxesName = categoryList.find((item:any)=>item.value == values.category)?.label
            }else{
                taxesName = "运费税"
            }
            const newCustomTax = [...taxes.customTax];
            newCustomTax[index] = {
                ...taxes.customTax[index],
                taxesExtCode:values.category,
                taxesName:taxesName || "",
                type:values.type,
            }
            taxes.setCustomTax(newCustomTax);
            setOpen(false);
        });
    }

    return (
        <>
            <EditOutlined className="cursor-pointer font-16 color-474f5e" onClick={() => {
                setOpen(true);
                // 初始化表单
                form.setFieldsValue({
                    type:taxes.customTax[index].type.toString(),
                    category:taxes.customTax[index].taxesExtCode,
                });
                // 检查是否存在运费税
                const isFreight = taxes.customTax.find((item:any)=>item.type == "3");
                isFreight ? setIsFreight(true) : setIsFreight(false);
                setPage(1);
                setHasMore(true);
                setLoadingMore(false);
                setCategoryList([]);
                getCategoryList({
                    languages_id: langId,
                    page: "1",
                    limit: "10",
                }).then((res:any) => {
                    const categoryList = res.data.map((item:any)=>({
                        label:item.delimiter + item.title,
                        value:item.id,
                    }));
                    setCategoryList(categoryList || []);
                });
            }} />
            <Modal
                title="编辑自定义税率"
                open={open}
                width={620}
                centered
                onCancel={cancel}
                footer={<Flex justify="flex-end" gap={12}>
                    <DefaultButton text="取消" onClick={cancel} />
                    <PrimaryButton text="提交" onClick={submit} />
                </Flex>}
            >
                <Form form={form} layout="vertical" style={{marginTop:'20px'}}>
                    <Form.Item initialValue="2" label={<div className="font-500">适用内容</div>} name="type">
                        <Radio.Group>
                            <Radio value="2">商品分类</Radio>
                            <Radio value="3" disabled={isFreight}>运费{isFreight && <span>（已添加）</span>}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {type == "2" &&
                    <Form.Item label={<div className="font-500">商品分类</div>} name="category">
                        <ProductCategoriesSelect
                            loading={loadingMore}
                            options={categoryList}
                            hasMore={hasMore}
                            onLoadMore={loadMore} // 直接传入加载函数
                            placeholder="请选择商品分类"
                            style={{ width: "100%",height:"36px" }}
                        />
                    </Form.Item>}
                    {/* <div className="font-500" style={{marginBottom:8}}>适用地区和税率</div> */}
                    {/* <Flex gap={12}>
                        <Form.Item label={false} name="taxZone" style={{flex:1}}>
                            <DefaultSelect options={taxes.zoneList} placeholder="请选择区域" />
                        </Form.Item>
                        <Form.Item label={false} name="taxZone" style={{flex:1}}>
                            <DefaultSelect options={[]} placeholder="请输入" />
                        </Form.Item>
                        <Form.Item label={false} name="taxZone" style={{flex:1}}>
                            <DefaultSelect options={[]} placeholder="请选择适用地区" />
                        </Form.Item>
                    </Flex> */}
                </Form>
            </Modal>
        </>
    )
}
export default CustomTaxEdit