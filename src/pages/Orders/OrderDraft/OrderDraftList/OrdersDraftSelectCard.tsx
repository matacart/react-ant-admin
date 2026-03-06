import type { MenuProps } from 'antd';
import { useIntl } from '@umijs/max';
import SearchInput from "@/components/Input/SearchInput";
import ButtonDropdownSecondary from "@/components/Dropdown/ButtonDropdownSecondary";

function OrdersDraftSelectCard() {

    const intl = useIntl();

    const controlsItems: MenuProps['items'] = [
      {
        label: <div>{intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.ordersDraftSelectCard.pending' })}</div>,
        key: '1',
      },
      {
        label: <div>{intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.ordersDraftSelectCard.completed' })}</div>,
        key: '2',
      },
    ];

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
              <div style={{flex:1}}><SearchInput placeholder={intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.ordersDraftSelectCard.searchPlaceholder' })} /></div>
              <ButtonDropdownSecondary menu={{items:controlsItems}} trigger={['click']} text={intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.ordersDraftSelectCard.status' })} btnStyle={{width:"100px"}} />
            </div>
          </div>
        </>
    );
}

export default OrdersDraftSelectCard