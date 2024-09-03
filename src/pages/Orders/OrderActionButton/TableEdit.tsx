import React, { useState } from 'react';
import { Button, ConfigProvider, Drawer } from 'antd';
import { Collapse } from 'antd';
import './Drawer.scss'
import { useIntl } from '@umijs/max';


export default function TableEdit(){
  const intl = useIntl();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button size="large" onClick={showDrawer}>
        {intl.formatMessage({ id: 'order.button.edittable' })}
      </Button>
      <Drawer
        title="编辑表头"
        open={open}
        onClose={onClose}
        footer={
            <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
            }}
          >
            <Button type="default" onClick={onClose}>
              重置
            </Button>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button type="default" onClick={onClose}>
                取消
              </Button>
              <Button type="primary" onClick={onClose} style={{ marginLeft: '8px' }}>
                更新
              </Button>
            </div>
          </div>
        }
      >
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerPadding: '12px 40px 12px 16px',
                contentPadding: '0 40px 0 16px',
                headerBg: '',
              },
            },
          }}
        >
          <Collapse
            style={{
              color: '#242833',
              lineHeight: 1.5715,
              fontSize: '16px',
              fontWeight: 500,
              paddingBlock: 0,
            }}
            expandIconPosition={'end'}
            defaultActiveKey={['1']}
            ghost
            // items={items}
            size="small"
          />
        </ConfigProvider>
      </Drawer>
    </>
  );
}
