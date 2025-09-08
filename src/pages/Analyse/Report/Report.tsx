import SearchInput from "@/components/Input/SearchInput";
import { Button } from "antd";
import { Input } from 'antd'
import { Masonry } from "react-masonry-component2";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Reports() {

  const list = [
    {
      title:"我的收藏",
      desc:"展示您最近收藏的报告。",
      reports:[]
    },
    {
      title:"行为",
      desc:"通过行为报告了解用户在站内的转化事件指标，如访客数、加购访客数等。",
      reports:[
        {
          label:"按时间趋势分析",
          url:"/analyse/reports/flow/time",
          isStars:0
        },
        {
          label:"在线商店访问速度",
          url:"/analyse/reports/behavior/speed",
          isStars:0
        },
      ]
    },
    {
      title:"我的收藏",
      desc:"展示您最近收藏的报告。",
      reports:[]
    },
    {
      title:"我的收藏",
      desc:"展示您最近收藏的报告。",
      reports:[]
    },
    {
      title:"我的收藏",
      desc:"展示您最近收藏的报告。",
      reports:[]
    },
    {
      title:"我的收藏",
      desc:"展示您最近收藏的报告。",
      reports:[]
    }
  ]

  return (
    <Scoped>
      <div style={{ margin: '24px', display: 'block', height: 'calc(100% - 48px)', paddingBottom: 'unset' }}>
      <div style={{ margin: '0px auto -16px', maxWidth: '1152px' }}>
        <div className="head">
          <span>报告</span>
          <Button type="primary"><span>创建自定义报告</span></Button>
        </div>
        <div></div>
        {/*搜索框*/}
        <div className="searchBox">
          <SearchInput text="搜索报告标题" />
        </div>
        {/*报告结果*/}
        <div className="container">
          <Masonry
            direction="column"
            columnsCountBreakPoints={{
              1400: 3,
              1000: 3,
              700: 2,
            }}
          >
            {list.map((item, index) => (
              <div key={index} className="card-report">
                <div className="title">我的收藏</div>
                <div className="info">展示你最近收藏的报告</div>
                <div className="analyse">分析报告</div>

                <div>
                  {item.reports.map((report, index) => (
                    <div key={index} className="lineWrap">
                      <Link to={report.url} className="link">{report.label}</Link>
                    </div>
                  ))}
                  <div className="hiddenButton">
                    <Button type="button"><span style={{ marginRight: '8px', fontWeight: '400', color: '#0066FF' }}>显示全部</span></Button>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>

      <div className="faqWrapper">
        <span style={{ margin: '0 4px', color: '#474f5e' }}>详细了解</span>
        <a className="faqLink">报告</a>
      </div>
    </div>
    </Scoped>
    
  )
}

const Scoped = styled.div`
  .head{
    display:flex;
    -webkit-box-align:center;
    align-items:center;
    -webkit-box-pack:justify;
    justify-content:space-between;
    margin-bottom:20px;
    color:#242833;
    font-size:24px;
    font-weight:600;
    line-height:32px;
  }
  .searchBox{
      margin-bottom:20px;
  }
  .card-report{
      margin-bottom:20px;
      padding:24px;
      border-radius:4px;
      background:#fff;
  }
  .title {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
  }
  .info {
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 20px;
  }
  .analyse {
    font-size: 12px;
    font-weight: 600;
  }
  .lineWrap{
      display:flex;
      -webkit-box-align:center;
      align-items:center;
      -webkit-box-pack:justify;
      justify-content:space-between;
      border-bottom:1px solid #eef1f7;
  }
  .link{
      -webkit-box-flex:1;
      -ms-flex:1;
      flex:1;
      padding:12px 0;
      line-height:20px;
  }
  .hiddenButton{
      display:flex;
      -webkit-box-align:center;
      align-items:center;
      -webkit-box-pack:center;
      justify-content:center;
      padding-top:12px;
  }
  .faqWrapper{
      display:flex;
      padding-top:24px;
      -webkit-box-align:center;
      align-items:center;
      -webkit-box-pack:center;
      justify-content:center;
  }
  .faqLink {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
`