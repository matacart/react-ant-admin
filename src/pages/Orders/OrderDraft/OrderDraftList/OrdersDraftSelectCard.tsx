import type { MenuProps } from 'antd';
import SearchInput from "@/components/Input/SearchInput";
import orderList from "@/store/order/orderList";
import ButtonDropdownSecondary from "@/components/Dropdown/ButtonDropdownSecondary";

function OrdersDraftSelectCard() {

    const controlsItems: MenuProps['items'] = [
      {
        label: <div>未结</div>,
        key: '1',
      },
      {
        label: <div>已完成</div>,
        key: '2',
      },
    ];

    const setLang = (lang:string)=>{
      orderList.setLanguages(lang)
    }

    return (
        <>
          <div className="Orders-select">
              <div
                className="Orders-select-items-wrap"
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap', // 不换行
                  gap: '12px 12px',
                  justifyContent: 'flex-start', // 从左开始排列
                  marginBottom: '10px',
                }}
              >
              <div style={{flex:1}}><SearchInput placeholder={"查询草稿单号或采购订单编号（仅B2B订单有）"} /></div>
              <ButtonDropdownSecondary menu={{items:controlsItems}} trigger={['click']} text="状态" btnStyle={{width:"100px"}} />
            </div>
          </div>
        </>
    );
}

export default OrdersDraftSelectCard