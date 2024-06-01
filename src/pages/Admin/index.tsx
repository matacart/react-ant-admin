import Callapse from '@/components/Card/OpenStoreGuidance';
import { Card, Space } from 'antd';
import styles from './index.scss';
import DataCard from '@/components/Card/DataCard';
import TextCard, {ButtonContent,CardContent} from '@/components/Card/TextCard'

export default () => {



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
          <DataCard/>
          <Callapse/>
          <TextCard
            title="为您的店铺选择套餐"
            contentText={
              <>
              立即付费解锁更多功能，享受更好的服务和支持。已支持以下付款方式：<br/>
              √ 银联支付（借记卡及信用卡，支持自动扣费）<br/>
              √ 信用卡支付（Visa、JCB、MasterCard、American Express，支持自动扣费）<br/>
              √ 微信支付
              </>
            }
            buttonContents={[
              {
                text: '选择套餐',
                url: '#'
              }
            ]}
          />
          <TextCard
            title='您的店铺还未绑定域名！'
            contentText={
              <>
                一个好的域名，助您的品牌深入人心。您可以在Godaddy、阿里云等域名服务商购买域名后，解析域名并绑定到MataCart后台。
              </>
            }
            buttonContents={[
              {
                text: '点击设置',
                url: '#'
              }
            ]}
          >

          </TextCard>
          
        </Space>
      </div>
    </div>
  );
};