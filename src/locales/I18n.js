import { FormattedMessage, useIntl } from 'react-intl';

const I18n = ({ id, value, defMsg }) => {
    // isAuto：为true时，将自动查找value在语言包里的key值，将其置于组件的id中（有待完善）
    const isAuto = false;
    const intl = useIntl();

    /**
     * 使用 FormattedMessage 组件的形式无法完美适配项目中的业务，最后决定改成 useIntl.formatMessage 方式 解决适配问题
     */
    // return (
    //     <FormattedMessage
    //         id={children}
    //         defaultMessage={defMsg}
    //         values={value}
    //     />
    // );

    return intl.formatMessage({
        id,
        defaultMessage: { defMsg },
        values: { value },
    });
};

export default I18n;
