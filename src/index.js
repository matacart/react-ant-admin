import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store/store';
import { Provider } from 'react-redux';
import App from './App';

import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        {/* 挂载状态到全局 */}
        <Provider store={store}>
            <App />
        </Provider>
    </>,
);
