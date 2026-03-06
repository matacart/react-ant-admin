import styled from "styled-components";
import { observer } from "mobx-react-lite";
import SearchInput from "@/components/Input/SearchInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import innerMsg from "@/store/message/innerMsg/innerMsg";
import { useIntl } from '@umijs/max';


const SelectCard = ()=>{
    const intl = useIntl();

    return (
        <Scoped>
            <SearchInput placeholder={intl.formatMessage({ id: 'innerMsg.selectCard.search.placeholder' })} style={{width:"320px"}}  />
            <DefaultSelect style={{width:"120px"}} value={innerMsg.actionType} options={[
                { value: 'all', label: intl.formatMessage({ id: 'innerMsg.selectCard.filters.all' }) },
                { value: 'read', label: intl.formatMessage({ id: 'innerMsg.selectCard.filters.read' }) },
                { value: 'unread', label: intl.formatMessage({ id: 'innerMsg.selectCard.filters.unread' }) },
            ]} onChange={(value:string)=>{
                innerMsg.setActionType(value)
            }} />
        </Scoped>
    );
}

export default observer(SelectCard)

const Scoped = styled.div`
    display: flex;
    justify-content: space-between;
`;

