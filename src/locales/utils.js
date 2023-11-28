import React from 'react';
import I18n from './I18n';

/**
 * 返回 I18n 组件
 * @param {*} key 对象名(name,title等)
 * @param {*} value
 */
export function get(key, value) {
    return <I18n value={value}>{key}</I18n>;
}
