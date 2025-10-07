import { Input, Button, Select, MenuProps, Flex, Tag } from "antd";
import { useEffect, useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons";
import TableListCard from "./TableListCard";
import { getAddWarehouseList, getPurchaseList, selectSupplier } from "@/services/y2/api";
import purchaseOrderList from "@/store/product/purchaseOrder/purchaseOrderListStore";
import { observer } from "mobx-react-lite";
import DropdownSort from "@/components/Dropdown/DropdownSort";
import SelectCheckBox from "@/components/Select/SelectCheckBox";
import SelectCheckBox2 from "@/components/Select/SelectCheckBox2";

const { Search } = Input;

function SelectCard(){

    const [language, setLanguage] = useState("2");

    const [loading, setLoading] = useState(false);

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

    // 排序
    const items:MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div>创建时间（由近到远）</div>
        ),
      },
      {
        key: '2',
        label: (
          <div>创建时间（由远到近）</div>
        ),
      },
      {
        key: '3',
        label: (
          <div>预期到达时间（由近到远）</div>
        ),
      },
      {
        key: '4',
        label: (
          <div>预期到达时间（由远到近）</div>
        ),
      },
      {
        key: '5',
        label: (
          <div>供应商(A-Z)</div>
        ),
      },
      {
        key: '6',
        label: (
          <div>供应商(Z-A)</div>
        ),
      },
      {
        key: '7',
        label: (
          <div>收货地(A-Z)</div>
        ),
      },
      {
        key: '8',
        label: (
          <div>收货地(Z-A)</div>
        ),
      },
      {
        key: '9',
        label: (
          <div>状态升序</div>
        ),
      },
      {
        key: '10',
        label: (
          <div>状态降序</div>
        ),
      },
  ];

    const handleOrderNumberClose = ()=>{
      // purchaseOrderStore.setTagsStatus("")
      purchaseOrderList.setTagsOrderNumber("")
      selecterPurchaseOrderList("",purchaseOrderList.tagsStatusValues,purchaseOrderList.tagsSupplierValues,purchaseOrderList.tagsPlaceOfReceiptValues)
    }

    // 关闭状态标签
    const handleStatusClose = ()=>{
      setStatusOptions([
        { value: '1', label: '草稿',checked:false },
        { value: '2', label: '已订购',checked:false },
        { value: '3', label: '部分收货',checked:false },
        { value: '4', label: '收货完成',checked:false },
        { value: '0', label: '已关闭',checked:false }
      ])
      purchaseOrderList.setTagsStatus("")
      purchaseOrderList.setTagsStatusValues("")
      selecterPurchaseOrderList(purchaseOrderList.tagsOrderNumber,"",purchaseOrderList.tagsSupplierValues,purchaseOrderList.tagsPlaceOfReceiptValues)
    }
    // 
    const handleSupplierClose = ()=>{
      purchaseOrderList.setTagsSupplier("")
      purchaseOrderList.setTagsSupplierValues("")
      selecterPurchaseOrderList(purchaseOrderList.tagsOrderNumber,purchaseOrderList.tagsStatusValues,"",purchaseOrderList.tagsPlaceOfReceiptValues)
    }

    const handlePlaceOfReceiptClose = ()=>{
      purchaseOrderList.setTagsPlaceOfReceipt("")
      purchaseOrderList.setTagsPlaceOfReceiptValues("")
      selecterPurchaseOrderList(purchaseOrderList.tagsOrderNumber,purchaseOrderList.tagsStatusValues,purchaseOrderList.tagsSupplierValues,"")
    }


    // 筛选采购订单
    const selecterPurchaseOrderList = (orderNumber?:string,status?:string,supplier?:string,warehouse?:string)=>{
      getPurchaseList(orderNumber,status,supplier,warehouse).then(res=>{
        console.log(res)
        if(res.code === 0){
          setPurchaseorderData(res.data)
        }else if(res.code == 201){
          // 无数据
          setPurchaseorderData([])
        }
      })
    }

    const firstUpdate = useRef(true);
    useEffect(()=>{
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }else{
        let newTagsStatus = ""
        let statusValues:string[] = []
        statusOptions.forEach(item=>{
          if(item.checked){
            newTagsStatus+=item.label+","
            statusValues.push(item.value)
          }
        })
        purchaseOrderList.setTagsStatus(newTagsStatus.substring(0,newTagsStatus.length-1))
        purchaseOrderList.setTagsStatusValues(statusValues.join(","))
        selecterPurchaseOrderList(purchaseOrderList.tagsOrderNumber,statusValues.join(","),purchaseOrderList.tagsSupplierValues,purchaseOrderList.tagsPlaceOfReceiptValues)
      }

    },[statusOptions])

    
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
      // getPurchaseList().then(res=>{
      //   console.log(res)
      //   if(res.code === 0){
      //     setPurchaseorderData(res.data)
      //   }
      // })
      selecterPurchaseOrderList(purchaseOrderList.tagsOrderNumber,purchaseOrderList.tagsStatusValues,purchaseOrderList.tagsSupplierValues,purchaseOrderList.tagsPlaceOfReceiptValues)
    },[])

    return (
        <> 
            <div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'12px 12px',justifyContent:'space-between',marginBottom:'12px'}}>
                    <div className="products-select-items-left" style={{display:'flex',flexWrap:'wrap',gap:'12px 12px'}}>
                        <div><Input style={{height:"36px"}} prefix={<SearchOutlined />} value={purchaseOrderList.tagsOrderNumber} onChange={(e)=>{
                          purchaseOrderList.setTagsOrderNumber(e.target.value)
                        }} placeholder="采购单号" /></div>
                        <SelectCheckBox options={statusOptions} setOptions={()=>{}} placeholder="状态" style={{ width: "180px", height: "36px" }} />
                        <Select
                            value={"供应商"}
                            style={{ width: 180,height:"36px" }}
                            showSearch
                            dropdownStyle={{padding:"6px 0"}}
                            dropdownRender={(menu) => (
                              <>
                                {menu}
                              </>
                            )}
                            
                            onChange={(value,option)=>{
                              purchaseOrderList.setTagsSupplier(option.label)
                              purchaseOrderList.setTagsSupplierValues(value)
                              selecterPurchaseOrderList(purchaseOrderList.tagsOrderNumber,purchaseOrderList.tagsStatusValues,value,purchaseOrderList.tagsPlaceOfReceiptValues)
                            }}
                            options={supplierList}
                        />
                        <Select
                            value={"收货地"}
                            style={{ width: 180,height:"36px" }}
                            showSearch
                            dropdownStyle={{padding:"6px 0"}}
                            dropdownRender={(menu) => (
                              <>
                                {menu}
                              </>
                            )}
                            onChange={(value,option)=>{
                              purchaseOrderList.setTagsPlaceOfReceipt(option.label)
                              purchaseOrderList.setTagsPlaceOfReceiptValues(value)
                              selecterPurchaseOrderList(purchaseOrderList.tagsOrderNumber,purchaseOrderList.tagsStatusValues,purchaseOrderList.tagsSupplierValues,value)
                            }}
                            options={placeOfReceiptList}
                        />
                    </div>
                    <div className="products-select-items-right" style={{display:'flex',flexWrap:'wrap',gap:'12px 12px'}}>
                      <DropdownSort items={items} styled={{maxHeight:"290px",overflowY:"auto"}} />
                    </div>
                </div>
                {/* 标签 */}
                <Flex style={{marginBottom:"10px"}}>
                  {purchaseOrderList.tagsOrderNumber !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={handleOrderNumberClose}>
                      <span className="color-474F5E font-14">
                        采购单号：{purchaseOrderList.tagsOrderNumber}
                      </span>
                  </Tag>}

                  {purchaseOrderList.tagsStatus !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={handleStatusClose}>
                      <span className="color-474F5E font-14">
                        状态：{purchaseOrderList.tagsStatus}
                      </span>
                  </Tag>}
                  
                  {purchaseOrderList.tagsSupplier !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={handleSupplierClose}>
                      <span className="color-474F5E font-14">
                        供应商：{purchaseOrderList.tagsSupplier}
                      </span>
                  </Tag>}

                  {purchaseOrderList.tagsPlaceOfReceipt !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={handlePlaceOfReceiptClose}>
                      <span className="color-474F5E font-14">
                        收货地：{purchaseOrderList.tagsPlaceOfReceipt}
                      </span>
                  </Tag>}
                  
                </Flex>
                <TableListCard purchaseorderData={PurchaseorderData}/>
            </div>
        </>
    );
}


export default observer(SelectCard);
