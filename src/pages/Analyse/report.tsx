import { Button } from "antd";
import './report.scss';
import { Input } from 'antd'

export default function reports() {
  return (
    <div style={{ margin: '24px', display: 'block', height: 'calc(100% - 48px)', paddingBottom: 'unset' }}>
      <div style={{ margin: '0px auto -16px', maxWidth: '1152px' }}>
        <div className="head">
          <span>报告</span>
          <Button type="primary"><span>创建自定义报告</span></Button>
        </div>
        <div></div>
        {/*搜索框*/}
        <div className="searchBox">
          <span style={{ borderRadius: '4px !important', width: '1152px', height: '44px', background:'#ffffff' }}>
            <span style={{ color: '#474f5e', fontSize: '16px' }}></span>
            <Input placeholder="搜索报告标题" />
            <span></span>
          </span>
          <div className="searchInfo">
            <span style={{ color:'#f86140' }}></span>
          </div>
        </div>
        {/*报告结果*/}
        <div className="container">
          <div className="colum" style={{ width: '33.3333%' }}>
            {/*我的收藏*/ }
            <div className="card_Y">
              <div className="title_2">我的收藏</div>
              <div className="info_2">展示你最近收藏的报告</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">购物车分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">购物车放弃报告</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*行为*/}
            <div className="card_Y">
              <div className="title_2">行为</div>
              <div className="info_2">通过行为报告了解用户在站内的转化事件指标，如访客数、加购访客数等。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">按时间趋势分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">按时间趋势分析转化情况</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*洞察*/}
            <div className="card_Y">
              <div className="title_2">洞察</div>
              <div className="info_2">通过用户对商品的浏览、加购行为，洞察商品间的关联关系。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">购物车分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">购物车放弃报告</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*利润*/}
            <div className="card_Y">
              <div className="title_2">利润</div>
              <div className="info_2">了解不同商品、多款式、门店为您的商店带来的利润和利润率。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">按商品分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">按多款式分析</a> 
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*库存*/}
            <div className="card_Y">
              <div className="title_2">库存</div>
              <div className="info_2">了解商品月末库存数量，帮助您实现更高效的库存管理。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">按商品分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">按多款式分析</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
          </div>

          <div className="colum" style={{ width: '33.3333%' }}>
            {/*销售结果*/}
            <div className="card_Y">
              <div className="title_2">我的收藏</div>
              <div className="info_2">展示你最近收藏的报告</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">购物车分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">购物车放弃报告</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*客户*/}
            <div className="card_Y">
              <div className="title_2">行为</div>
              <div className="info_2">通过行为报告了解用户在站内的转化事件指标，如访客数、加购访客数等。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">按时间趋势分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">按时间趋势分析转化情况</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*营销*/}
            <div className="card_Y">
              <div className="title_2">洞察</div>
              <div className="info_2">通过用户对商品的浏览、加购行为，洞察商品间的关联关系。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">购物车分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">购物车放弃报告</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*零售销售额*/}
            <div className="card_Y">
              <div className="title_2">利润</div>
              <div className="info_2">了解不同商品、多款式、门店为您的商店带来的利润和利润率。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">按商品分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">按多款式分析</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*自定义报告*/}
            <div className="card_Y">
              <div className="title_2">库存</div>
              <div className="info_2">了解商品月末库存数量，帮助您实现更高效的库存管理。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">按商品分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">按多款式分析</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
          </div>

          <div className="colum" style={{ width: '33.3333%' }}>
            {/*流量获取*/}
            <div className="card_Y">
              <div className="title_2">我的收藏</div>
              <div className="info_2">展示你最近收藏的报告</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">购物车分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">购物车放弃报告</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*页面*/}
            <div className="card_Y">
              <div className="title_2">行为</div>
              <div className="info_2">通过行为报告了解用户在站内的转化事件指标，如访客数、加购访客数等。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">按时间趋势分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">按时间趋势分析转化情况</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*财务*/}
            <div className="card_Y">
              <div className="title_2">洞察</div>
              <div className="info_2">通过用户对商品的浏览、加购行为，洞察商品间的关联关系。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">购物车分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">购物车放弃报告</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*利润*/}
            <div className="card_Y">
              <div className="title_2">利润</div>
              <div className="info_2">了解不同商品、多款式、门店为您的商店带来的利润和利润率。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">按商品分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">按多款式分析</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
            {/*订单*/}
            <div className="card_Y">
              <div className="title_2">库存</div>
              <div className="info_2">了解商品月末库存数量，帮助您实现更高效的库存管理。</div>
              <div className="analyse">分析报告</div>

              <div>
                <div className="lineWrap">
                  <a className="link_3B">按商品分析</a>
                </div>
                <div className="lineWrap">
                  <a className="link_3B">按多款式分析</a>
                </div>
                <div className="hiddenButton">
                  <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faqWrapper">
        <span style={{ margin: '0 4px', color: '#474f5e' }}>详细了解</span>
        <a className="faqLink">报告</a>
      </div>
    </div>
  )
}
