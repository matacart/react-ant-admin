import { Flex, type MenuProps } from 'antd';
import SearchInput from "@/components/Input/SearchInput";
import orderList from "@/store/order/orderList";
import LangSelect from "@/pages/components/LangSelect";
import ButtonDropdownSecondary from "@/components/Dropdown/ButtonDropdownSecondary";
import DropdownSort from '@/components/Dropdown/DropdownSort';
import MoreSelect from './MoreSelect';
import EditTableHead from './EditTableHead';

function RecallOrdersSelectCard() {

    // 排序
    const items:MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div>弃单号（升序）</div>
        ),
      },
      {
        key: '2',
        label: (
          <div>弃单号（降序）</div>
        ),
      },
      {
        key: '3',
        label: (
          <div>创建日期（最旧到最新）</div>
        ),
      },
      {
        key: '4',
        label: (
          <div>创建日期（最新到最旧）</div>
        ),
      },
      {
        key: '5',
        label: (
          <div>客户名称（A-Z）</div>
        ),
      },
      {
        key: '6',
        label: (
          <div>客户名称（Z-A）</div>
        ),
      },
      {
        key: '7',
        label: (
          <div>发送状态（A-Z）</div>
        ),
      },
      {
        key: '8',
        label: (
          <div>发送状态（Z-A）</div>
        ),
      },
      {
        key: '9',
        label: (
          <div>恢复状态（A-Z）</div>
        ),
      },
      {
        key: '10',
        label: (
          <div>恢复状态（Z-A）</div>
        ),
      },
      {
        key: '11',
        label: (
          <div>发送次数（升序）</div>
        ),
      },
      {
        key: '12',
        label: (
          <div>发送次数（降序）</div>
        ),
      },
      {
        key: '13',
        label: (
          <div>弃单金额（升序）</div>
        ),
      },
      {
        key: '14',
        label: (
          <div>弃单金额（降序）</div>
        ),
      },
    ];

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
            <Flex gap={12}>
              <div style={{flex:1}}><SearchInput placeholder={"搜索订单内容"} /></div>
              <ButtonDropdownSecondary menu={{items:controlsItems}} trigger={['click']} text="发送状态" btnStyle={{width:"100px"}} />
              <ButtonDropdownSecondary menu={{items:controlsItems}} trigger={['click']} text="召回状态" btnStyle={{width:"100px"}} />
              <MoreSelect />
              <EditTableHead />
              <LangSelect setLang={setLang} lang={orderList.languages} isLabel={true} />
              <DropdownSort items={items} styled={{maxHeight:"290px",overflowY:"auto"}} />
            </Flex>
          </div>
        </>
    );
}

export default RecallOrdersSelectCard