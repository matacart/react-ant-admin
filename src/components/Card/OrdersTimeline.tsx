import React, { ReactNode, useState } from 'react';
import { Timeline, Button, Collapse } from 'antd';
import { CaretDownOutlined, CaretRightOutlined, CheckCircleFilled, ClockCircleFilled, DownOutlined, ExclamationCircleFilled, SyncOutlined, UpOutlined } from '@ant-design/icons';

interface historyinfo {
  state: ReactNode;
  orders_id: string;
  pid: string;
  orders_status_id: string;
  time: string;
  comments: string;
}
const OdersTimeline: React.FC<{ order: { historyinfo: historyinfo[] } }> = ({ order }) => {

  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3); // 初始只显示前五个数据项


  const handleExpand = (index: number) => {
    setExpandedItem(index === expandedItem ? null : index);
  };

  const handleLoadMore = () => {
    // 这里可以添加逻辑来加载更多数据，例如从服务器请求
    setItemsToShow(order?.historyinfo.length || 0); // 显示所有数据项
    setLoadMoreVisible(false); // 隐藏加载更多按钮
  };

  return (
    <Timeline>
      {(order?.historyinfo || []).slice(0, itemsToShow).map((item: historyinfo, index: number) => {
        const ExpandIcon = expandedItem === index ? <CaretDownOutlined /> : <CaretRightOutlined />;
        return (
          <Timeline.Item key={index} dot={index === 3 ? <span style={{ color: '#007bff', fontSize: '1.2em' }}> <SyncOutlined spin /></span> : null}>
            <p onClick={() => handleExpand(index)}>
              {item.orders_status_id}   {ExpandIcon}
              <p style={{ fontSize: '12px', color: '#7A8499' }}>{item.time}</p>
              {expandedItem === index && (
                <div>
                  <p>{item.comments}</p>
                </div>
              )}
            </p>
          </Timeline.Item>
        );
      })}
      {itemsToShow < (order?.historyinfo || []).length && (
        <Button type="link" onClick={handleLoadMore}>
          查看更多记录
        </Button>
      )}
    </Timeline>



















//     <Timeline>
//       <Timeline.Item>
//   <>
//     发货更新电子邮件已发送至chao xu (6546456456@hotmail.com)。
//     <br />
//     <span style={{ fontSize: '12px', color: '#999' }}>2024-07-22 10:44</span>
//     <Button
//       type="link"
//       onClick={() => toggleExpand(0)}
//       style={{ float: 'right' }}
//     >
//       {expandedIndex === 0 ? <UpOutlined /> : <DownOutlined />}
//     </Button>
//     {expandedIndex === 0 && (
//       <Collapse.Panel  key="0" header="重新发送邮件">
//         <Button
//           type="primary"
//           style={{
//             backgroundColor: 'white',
//             marginRight: '12px',
//             width: '90px',
//             height: '36px',
//             fontSize: '14px',
//             border: '1px solid #d9d9d9',
//           }}
//         //   onClick={handleResendEmail}
//         >
//           重新发送
//         </Button>
//       </Collapse.Panel>
//     )}
//   </>
// </Timeline.Item>
//       <Timeline.Item>
//         <>
//           您手动将此订单标记为已付款。
//           <br />
//           <span style={{ fontSize: '12px', color: '#999' }}>2024-07-14 08:52</span>
//           <Button
//             type="link"
//             onClick={() => toggleExpand(1)}
//             style={{ float: 'right' }}
//           >
//             {expandedIndex === 1 ? <UpOutlined /> : <DownOutlined />}
//           </Button>
//           {expandedIndex === 1 && (
//             <Collapse.Panel   key="1 "header="重新标记">
//               {/* Add any actions here */}
//             </Collapse.Panel>
//           )}
//         </>
//       </Timeline.Item>
//       <Timeline.Item>
//         <>
//           您手动归档了该订单。
//           <br />
//           <span style={{ fontSize: '12px', color: '#999' }}>2024-07-13 13:41</span>
//           <Button
//             type="link"
//             onClick={() => toggleExpand(2)}
//             style={{ float: 'right' }}
//           >
//             {expandedIndex === 2 ? <UpOutlined /> : <DownOutlined />}
//           </Button>
//           {expandedIndex === 2 && (
//             <Collapse.Panel  key="2" header="取消归档">
//               {/* Add any actions here */}
//             </Collapse.Panel>
//           )}
//         </>
//       </Timeline.Item>
//       <Timeline.Item>
//         <>
//           发货更新电子邮件已发送至chao xu (6546456456@hotmail.com)。
//           <br />
//           <span style={{ fontSize: '12px', color: '#999' }}>2024-07-13 13:41</span>
//           <Button
//             type="link"
//             onClick={() => toggleExpand(3)}
//             style={{ float: 'right' }}
//           >
//             {expandedIndex === 3 ? <UpOutlined /> : <DownOutlined />}
//           </Button>
//           {expandedIndex === 3 && (
//             <Collapse.Panel  key="3" header="重新发送邮件">
//               <Button type="primary">重新发送</Button>
//             </Collapse.Panel>
//           )}
//         </>
//       </Timeline.Item>
//     </Timeline>
  );
};

export default OdersTimeline;




// {
//   "id": "0",
//   "orders_status_name": "\u5df2\u53d6\u6d88"
// },
// {
//   "id": "1",
//   "orders_status_name": "\u5f85\u5904\u7406"
// },
// {
//   "id": "2",
//   "orders_status_name": "\u5904\u7406\u4e2d"
// },
// {
//   "id": "3",
//   "orders_status_name": "\u5df2\u53d1\u8d27"
// },
// {
//   "id": "4",
//   "orders_status_name": "\u5df2\u66f4\u65b0"
// },
// {
//   "id": "7",
//   "orders_status_name": "\u4ed8\u6b3e\u5931\u8d25"
// },
// {
//   "id": "8",
//   "orders_status_name": "\u4ed8\u6b3e\u6210\u529f"
// },
// {
//   "id": "9",
//   "orders_status_name": "\u5f85\u5b8c\u6210"
// },
// {
//   "id": "10",
//   "orders_status_name": "\u5df2\u5b8c\u6210"
// },
// {
//   "id": "11",
//   "orders_status_name": "\u5f85\u9000\u5355\u7533\u8bf7"
// },
// {
//   "id": "12",
//   "orders_status_name": "\u5df2\u9000\u5355\u7533\u8bf7"
// },
// {
//   "id": "13",
//   "orders_status_name": "\u5f85\u9000\u5355\u786e\u8ba4"
// },
// {
//   "id": "14",
//   "orders_status_name": "\u5df2\u9000\u5355\u786e\u8ba4"
// },
// {
//   "id": "15",
//   "orders_status_name": "\u5f85\u9000\u6b3e"
// },
// {
//   "id": "16",
//   "orders_status_name": "\u5df2\u9000\u6b3e"
// },
// {
//   "id": "17",
//   "orders_status_name": "\u5f85\u9000\u6b3e\u5b8c\u6210"
// },
// {
//   "id": "18",
//   "orders_status_name": "\u5df2\u9000\u5355\u5b8c\u6210"
// }翻译