import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Checkbox, Collapse, CollapseProps, Flex, message, Modal, Table, Tooltip} from "antd";
import styled from "styled-components";
import countries from "@/pages/Channel/OnlineStore/Preferences/Data/countries.json";
import { useEffect, useState } from "react";
import { forEach } from "lodash";
import { getLocale } from "@umijs/max";
import { languageMap } from "@/locales/langMap";
import { CaretRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { addRegionAddressAccess, delRegionAddressAccess, getIPRegionBlackList } from "@/services/y2/api";
import preferences, { IPBlack } from "@/store/channel/preferences/preferences";
import DeleteModal from "@/components/Modal/DeleteModal";

function BlacklistAreaCard() {

    // 获取当前语言
    const language = getLocale();
    // 映射语言到语言代码
    const languageCode = languageMap[language] || language;

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [tableLoading, setTableLoading] = useState(false);

    const [data, setData] = useState<IPBlack[]>([]);
    
    const columns = [
        {
            title: '国家/地区',
            dataIndex: 'country_name',
            key: 'country_name',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (text:any, record:any) => (
                <DeleteModal
                    tElement={
                        <Tooltip title="删除">
                            <DeleteOutlined className="font-16 color-F86140 cursor-pointer" />
                        </Tooltip>
                    }
                    removeFunc={()=>{
                        setLoading(true);
                        delRegionAddressAccess(record.id).then(res=>{
                            if(res.code == 0){
                                message.success("删除成功");
                                setData(data.filter(item => item.id !== record.id))
                            }
                        }).catch(()=>{
                            console.log("删除失败")
                        }).finally(()=>{
                            setLoading(false);
                        })
                    }}
                    loading={loading}
                    title="确认要删除吗？" 
                    content={""}
                    okText="删除"
                />
            )
        }
    ]

    const [selectCountryCodes, setSelectCountryCodes] = useState<string[]>([]);

    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })
    
    const cancel = () => {
        setSelectCountryCodes([]);
        setOpen(false);
    }

    const submit = () => {
        setLoading(true);
        const rules = selectCountryCodes.map(code => {
            if(countries.list.find(item => item.countryCode === code)){
                return {
                    country_code: code,
                    country_name: countries.list.find(item => item.countryCode === code)?.name,
                }
            }
        });
        addRegionAddressAccess({
            rules:JSON.stringify(rules),
        }).then(res => {
            if(res.code == 0){
                // 刷新数据
                getIPBlackList({
                    page:1,
                    limit:10,
                })
            }
        }).catch(()=>{
            message.error("失败");
        }).finally(()=>{
            setLoading(false);
            cancel();
        })
    }

    const getIPBlackList = ({page,limit}:{page:number,limit:number})=>{
        setTableLoading(true);
        getIPRegionBlackList({
            page:page,
            limit: limit,
        }).then((res)=>{
            if(res.code == 0){
                setData(res.data.list);
                setPagination({
                    ...pagination,
                    current: page,
                    pageSize: limit,
                    total: res.data.total,
                })
            }
        }).catch(()=>{
        }).finally(()=>{
            setTableLoading(false);
        })
    }

    // 按regionCode分组国家到Map中
    const regionMap = new Map<string, any[]>();
    forEach(countries.list, (item:any) => {
        // 获取当前语言地区信息作为分组依据
        const regionCode = item.countryInfos[languageCode].regionCode;
        if (!regionMap.has(regionCode)) {
            regionMap.set(regionCode, []);
        }
        const countryList = regionMap.get(regionCode) || [];
        countryList.push({
            ...item,
        });
        regionMap.set(regionCode, countryList);
    });
    const items = Array.from(regionMap).map(([regionCode, countryList]) => ({
        key: regionCode,   
        label: countryList[0].countryInfos[languageCode].region,
        children: (
            <div className="country-list">
                <div className="item-all">
                    <Checkbox onChange={(e)=>{
                        if(e.target.checked){
                            setSelectCountryCodes(prev => [...prev, ...countryList.map((country) => country.countryCode)]);
                        }else{
                            const currentRegionCountryCodes = countryList.map((country) => country.countryCode);
                            setSelectCountryCodes(prev => prev.filter(code => !currentRegionCountryCodes.includes(code)))
                        }
                    }} checked={countryList.every(country => selectCountryCodes.includes(country.countryCode))}>所有{countryList[0].countryInfos[languageCode].region}国家/地区</Checkbox>
                </div>
                {countryList.map((country) => (
                    <div key={country.countryCode} className="item">
                        <Checkbox checked={selectCountryCodes.includes(country.countryCode)} onChange={(e)=>{
                            if(e.target.checked){
                                setSelectCountryCodes(prev => [...prev, country.countryCode]);
                            }else{
                                setSelectCountryCodes(prev => prev.filter(code => code !== country.countryCode));
                            }
                        }}>
                            {country.countryInfos[languageCode].name}
                        </Checkbox>
                    </div>
                ))}
            </div>
        ),
    }))

    useEffect(() => {
        setData(preferences.IPBlackList.data);
    }, [])

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <Flex align="center">
                        <div>访问限制地区黑名单</div>
                    </Flex>
                    <DefaultButton text="添加限制地区" onClick={()=>setOpen(true)} />
                </Flex>
                {/*   */}
                <Table
                    loading={tableLoading}
                    rowKey={(record: IPBlack) => record.id}
                    pagination={{
                        ...pagination,
                        showSizeChanger: false,
                        onChange: (page, pageSize) => {
                            getIPBlackList({
                                page:page,
                                limit: pageSize,
                            })
                        },
                    }}
                    className="table" scroll={{ y: 320 }} columns={columns} dataSource={data} />
            </Card>
            {/* 添加IP地址访问名单弹窗 */}
            <MyModal
                open={open}
                destroyOnHidden={true}
                centered
                title="添加国家/地区"
                width={620}
                onCancel={cancel}
                footer={<Flex justify="end" gap={12}>
                    <DefaultButton text="取消" loading={loading} onClick={cancel} />
                    <DefaultButton text="添加" loading={loading} type="primary" onClick={submit} />
                </Flex>}
            >
                <Collapse
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    className="country-collapse" 
                    items={items} 
                    ghost
                    defaultActiveKey={[]}
                />
            </MyModal>
        </Scoped>
    )
}

export default BlacklistAreaCard

const Scoped = styled.div`
    margin-bottom: 20px;

    .content-warp{
        margin-top: 20px;
    }

    .table{
        margin-top: 20px;
        .ant-table{
            border: 1px solid #eef1f7;
            border-radius: 6px;
            border-bottom: none;
        }
    }
`

const MyModal = styled(Modal)`
    
    .country-collapse{
        max-height: 400px;
        overflow-y: auto;
        background-color: #FFFFFF;

        .country-list{
            .item-all{
                padding-bottom: 12px;
                border-bottom: 1px solid #d7dbe7;
            }
            .item{
                margin-left: 24px;
                border-bottom: 1px solid #d7dbe7;
                padding: 12px 0;
            }
        }
    }
    
`
