import { logout } from '@/services/y2/api';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel,useIntl } from '@umijs/max';
import { Popover, Spin } from 'antd';
import { createStyles } from 'antd-style';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import UserCard from './../Card/UserCard';
import styled from 'styled-components';
import cookie from 'react-cookies'


export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.name}</span>;
};

const useStyles = createStyles(({ token }) => {
  // console.log(token)
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   * 清除token
   */
  const loginOut = async () => {
    await logout();
    cookie.remove("token",{path:"/"})
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/signIn' && !redirect) {
      history.replace({
        pathname: '/user/signIn',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const { styles } = useStyles();

  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        localStorage.removeItem('token');
        return;
      };
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems = [
    // ...(menu
    //   ? [
    //       {
    //         key: 'center',
    //         icon: <UserOutlined />,
    //         label: intl.formatMessage({id:'pages.user.center'}),
    //       },
    //       {
    //         key: 'settings',
    //         icon: <SettingOutlined />,
    //         label: intl.formatMessage({id:'pages.user.settings'}),
    //       },
    //       {
    //         type: 'divider' as const,
    //       },
    //     ]
    //   : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: "123",
    },

  ];
  // ,avatar:null
  const content = (
    <UserCard currentUser={{...currentUser}}/>
  );
  return (
    // <HeaderDropdown
    //   menu={{
    //     selectedKeys: [],
    //     onClick: onMenuClick,
    //     items: menuItems,
    //   }}
    // >
    // </HeaderDropdown>
    <Popover trigger="hover" styles={{ body: {
      padding:0
    } }} arrow={false} content={content}><div>{children}</div></Popover>
  );
};
