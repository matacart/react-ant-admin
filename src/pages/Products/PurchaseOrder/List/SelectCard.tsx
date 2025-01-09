import { Input, Button, Select, Dropdown, MenuProps, Flex, Tag } from "antd";
import { useEffect, useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons";
import TableListCard from "./TableListCard";
import MySelect from "@/components/Select/MySelect";
import { getAddWarehouseList, getPurchaseList, selectSupplier } from "@/services/y2/api";
import { set } from 'lodash';
import purchaseOrderStore from "@/store/product/purchaseOrder/purchaseOrderStore";
import { observer } from "mobx-react-lite";

const { Search } = Input;

function SelectCard(){
    const [language, setLanguage] = useState("2");

    const [supplierList,setSupplierList] = useState([])

    const [placeOfReceiptList,setPlaceOfReceiptList] = useState([]);

    const [PurchaseorderData,setPurchaseorderData] = useState();

    // const [tagsStatus,setTagsStatus] = useState("");
    // const [tagsSupplier,setTagsSupplier] = useState("");
    // const [tagsPlaceOfReceipt,setTagsPlaceOfReceipt] = useState("");

    // 状态
    const [statusOptions,setStatusOptions] = useState([
      { value: '1', label: '草稿',checked:false },
      { value: '2', label: '已订购',checked:false },
      { value: '3', label: '部分收货',checked:false },
      { value: '4', label: '收货完成',checked:false },
      { value: '0', label: '已关闭',checked:false }
    ])

    // 关闭状态标签
    const handleStatusClose = ()=>{
      setStatusOptions([
        { value: '1', label: '草稿',checked:false },
        { value: '2', label: '已订购',checked:false },
        { value: '3', label: '部分收货',checked:false },
        { value: '4', label: '收货完成',checked:false },
        { value: '0', label: '已关闭',checked:false }
      ])
      purchaseOrderStore.setTagsStatus("")
    }
    // 
    const handleSupplierClose = ()=>{
      purchaseOrderStore.setTagsSupplier("")
    }

    const handlePlaceOfReceiptClose = ()=>{
      purchaseOrderStore.setTagsPlaceOfReceipt("")
    }

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
    ];

    useEffect(()=>{

      // 获取供应商
      selectSupplier().then(res=>{
        if(res.code == 0){
          let newList:any = []
          res.data.forEach((e:any) => {
            newList.push({
              label:e.name,
              value:e.id
            })
          });
          setSupplierList(newList)
        }
      })
      // 获取收货地
      getAddWarehouseList().then(res=>{
        if(res.code == 0){
          let newList:any = []
          res.data.forEach((e:any) => {
            newList.push({
              label:e.name,
              value:e.id
            })
          })
          setPlaceOfReceiptList(newList)
        }
      })

      // 获取采购订单列表--条件
      getPurchaseList().then(res=>{
        console.log(res)
        if(res.code === 0){
          setPurchaseorderData(res.data)
        }
      })
    },[])



    const firstUpdate = useRef(true);
    useEffect(()=>{

      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }else{
        let newTagsStatus = ""
        statusOptions.forEach(item=>{
          if(item.checked){
            newTagsStatus+=item.label+","
          }
        })
        purchaseOrderStore.setTagsStatus(newTagsStatus.substring(0,newTagsStatus.length-1))
      }
    },[statusOptions])

    // 筛选采购订单
    const selecterSupplierList = ()=>{
      getPurchaseList().then(res=>{
        console.log(res)
        if(res.code === 0){
          setPurchaseorderData(res.data)
        }
      })
    }

    return (
        <> 
            <div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'12px 12px',justifyContent:'space-between',marginBottom:'12px'}}>
                    <div className="products-select-items-left" style={{display:'flex',flexWrap:'wrap',gap:'12px 12px'}}>
                        <div><Input prefix={<SearchOutlined />} placeholder="Basic usage" /></div>
                        <MySelect options={statusOptions} setStatusOptions={setStatusOptions} text="状态" style={{width:"180px"}}/>
                        <Select
                            value={"供应商"}
                            style={{ width: 180 }}
                            showSearch
                            dropdownStyle={{padding:"6px 0"}}
                            dropdownRender={(menu) => (
                              <>
                                {menu}
                              </>
                            )}
                            onChange={(value,option)=>{
                              purchaseOrderStore.setTagsSupplier(option.label)
                              // setTagsSupplier(option.label)
                            }}
                            options={supplierList}
                        />
                        <Select
                            value={"收货地"}
                            style={{ width: 180 }}
                            showSearch
                            dropdownStyle={{padding:"6px 0"}}
                            dropdownRender={(menu) => (
                              <>
                                {menu}
                              </>
                            )}
                            onChange={(value,option)=>{
                              purchaseOrderStore.setTagsPlaceOfReceipt(option.label)
                            }}
                            options={placeOfReceiptList}
                        />
                    </div>
                    <div className="products-select-items-right" style={{display:'flex',flexWrap:'wrap',gap:'12px 12px'}}>
                        <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} arrow>
                            <Button>排序</Button>
                        </Dropdown>
                    </div>
                </div>
                {/* 标签 */}
                <Flex style={{marginBottom:"10px"}}>
                  {purchaseOrderStore.tagsStatus !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={handleStatusClose}>
                      <span className="color-474F5E font-14">
                        状态：{purchaseOrderStore.tagsStatus}
                      </span>
                  </Tag>}
                  
                  {purchaseOrderStore.tagsSupplier !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={handleSupplierClose}>
                      <span className="color-474F5E font-14">
                        供应商：{purchaseOrderStore.tagsSupplier}
                      </span>
                  </Tag>}

                  {purchaseOrderStore.tagsPlaceOfReceipt !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={handlePlaceOfReceiptClose}>
                      <span className="color-474F5E font-14">
                        收货地：{purchaseOrderStore.tagsPlaceOfReceipt}
                      </span>
                  </Tag>}
                  
                </Flex>
                <TableListCard purchaseorderData={PurchaseorderData}/>
            </div>
        </>
    );
}


export default observer(SelectCard);
