import { Space } from 'antd';
import DataCard from './DataCard';
import ShopTimeDisplay from './ShopTimeDisplay';
import TextCard from './TextCard';
import { useIntl } from '@umijs/max';
import OpenStoreGuidance from './OpenStoreGuidance';

export default () => {

  const init = useIntl();

  return (
    <div 
      style={{
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
      <div className="content" style={{
        maxWidth: '1000px',
        width: '100%',
        height: '100vh',
      }}>
        <Space direction="vertical"
        size="large"
        style={{
          width: '100%',
        }}
        >
          <ShopTimeDisplay />
          <DataCard />
          <OpenStoreGuidance />
          <TextCard
            title={init.formatMessage({ id: 'textCard.package.title' })}
            contentText={
              <>
                <span dangerouslySetInnerHTML={{ __html: init.formatMessage({ id: 'textCard.package.content' }) }} />
              </>
            }
            buttonContents={[
              {
                text: init.formatMessage({ id: 'textCard.package.button' }),
                url: '/stores-subscriptions/list/paid'
              }
            ]}
          />
          <TextCard
            title={init.formatMessage({ id: 'textCard.domain.title' })}
            contentText={
              <>
                <span dangerouslySetInnerHTML={{ __html: init.formatMessage({ id: 'textCard.domain.content' }) }} />
              </>
            }
            buttonContents={[
              {
                text: init.formatMessage({ id: 'textCard.domain.button' }),
                url: '/settings/domain'
              }
            ]}
          >
          </TextCard>
        </Space>
      </div>
    </div>
  );
};