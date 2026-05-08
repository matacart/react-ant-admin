import { createStyles } from 'antd-style';
import { SelectLang } from '@umijs/max';
import { i18n } from './Lang';

const useStyles = createStyles(({ token }) => {
    return {
        lang: {
        width: 42,
        height: 42,
        lineHeight: '42px',
        right: 16,
        borderRadius: token.borderRadius,
        ':hover': {
            backgroundColor: token.colorBgTextHover,
        },
        },
    };
});

// 国际化组件
const MinLang = () => {
    const { styles } = useStyles();
    return (
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang reload={false} postLocalesData={()=>i18n}
        />}
      </div>
    );
};

export default MinLang;