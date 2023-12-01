import { useIntl, FormattedMessage } from 'react-intl';

/**
 * 二次封装 useIntl hook，便于后续维护和更改。针对的场景是组件且不能渲染 react-dom 的元素或属性。
 * @param {*} id 对象名(name,title等)
 * @param {*} values
 */
export const useGetIntl = () => {
    const intl = useIntl();
    return {
        ...intl, // 保留原有的 useIntl 返回的对象，里面包含此次封装目的的主要对象：formatMessage
        get: (key, value) => {
            // 在 formatMessage 函数的内部其实是将结果返回了的，所以我们也必须将结果返回，不然就得不到正常值
            return intl.formatMessage({ id: key, values: value });
        },
    };
};

/**
 * 二次封装 <FormattedMessage> 组件，便于后续维护和更改。针对的场景是非组件的函数中。其原因是：在非组件中，无法调用 react hook
 * @param {*} id 对象名(name,title等)
 * @param {*} values
 */
export const GetIntl = (key, value) => {
    return <FormattedMessage id={key} values={value} />;
};
