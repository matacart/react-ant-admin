import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';
import routeMap from './router/routeMap';
import { RouterProvider } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Intl from './locales/Intl';
import { AntdLanguageMap } from './constant/Page';
import { JudgingLanguage } from './util/utils';

// state 数据映射
const mapStateToProps = state => {
    const stateLocale = state.page.locale;
    return { stateLocale };
};

function App({ stateLocale }) {
    const { locale, messages } = Intl(JudgingLanguage(stateLocale));

    return (
        <IntlProvider locale={locale} messages={messages}>
            <ConfigProvider locale={AntdLanguageMap[locale]}>
                <RouterProvider router={routeMap} />
            </ConfigProvider>
        </IntlProvider>
    );
}

export default connect(mapStateToProps)(App);
