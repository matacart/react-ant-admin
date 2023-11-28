import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const I18n = ({ children, value, defMsg }) => {
    // isAuto：为true时，将自动查找value在语言包里的key值，将其置于组件的id中（有待完善）
    const isAuto = false;
    const intl = useIntl();

    return (
        <FormattedMessage
            id={children}
            defaultMessage={defMsg}
            values={value}
        />
    );
};

export default I18n;
