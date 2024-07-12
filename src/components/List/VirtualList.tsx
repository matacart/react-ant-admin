import React,{ useEffect, useRef, useState } from 'react';
import './style';
import styled from 'styled-components';
interface IVirtualList {
  total: number; //总条数
  presetItemHeight: number; //预设item的高度
  itemRender: (index:any) => JSX.Element;
}
let cacheContentHeight = [] as Array<number>;

export const VirtualList = (props: IVirtualList) => {
  const virtualRef = useRef<HTMLDivElement>(null); //滚动盒子ref
  const contentRef = useRef<HTMLDivElement>(null); //内容盒子ref

  const [startIndex, setStartIndex] = useState(0); //展示的第一个index
  const [endIndex, setEndIndex] = useState(0); //展示的最后一个index
  const [virtualBoxHeight, setVirtualBoxHeight] = useState(0); //低层的占位盒子总高度

  useEffect(() => {
    //页面初始化并添加监听滚动事件
    init();
    document.getElementById('virtual-scroll')?.addEventListener('scroll', bindHandleScroll);
    return () => {
      //销毁监听事件并重置缓存的高度数据数组
      document.getElementById('virtual-scroll')?.removeEventListener('scroll', bindHandleScroll);
      cacheContentHeight = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ['mount']);

  useEffect(() => {
    //监听startIndex, endIndex改变时，改变dom更新后的高度数据
    updateCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIndex, endIndex]);

  let show_num = 0; //初始计算一屏需要展示的数量

  const init = () => {
    console.log('初始化');
    setStartIndex(0);
    const { presetItemHeight } = props;
    const height = virtualRef.current?.clientHeight || 0;
    const showNum = Math.ceil(height / presetItemHeight) + 2;
    show_num = showNum;
    setEndIndex(showNum);
    setVirtualBoxHeight(0);
    initCached();
    setTimeout(() => {
      console.dir(contentRef.current?.clientHeight);
    }, 200);
  };

  const bindHandleScroll = (event:any) => {
    const scrollTop = event.target.scrollTop;
    const { total } = props;
    let num = 0; //需要增删的量
    let height_count = 0;
    for (let index = 0; index < cacheContentHeight.length; index++) {
      height_count += cacheContentHeight[index];
      if (height_count > scrollTop) {
        num = index - 1;
        break;
      }
    }
    if (num < total) {
      setStartIndex(Math.max(num - 2, 0));
      setEndIndex(Math.min(show_num + num + 0, total)); //如果需要额外展示更多，这里可以额外加值
    }
  };

  const initCached = () => {
    //初始化缓存高度
    const { presetItemHeight, total } = props;
    cacheContentHeight = [];
    for (let i = 0; i < total; ++i) {
      cacheContentHeight[i] = presetItemHeight;
    }
    updateCache();
  };

  const updateCache = () => {
    //更新缓存高度
    //获取已更新的节点，并获取其高度并将其相加到总高度中
    const nodes: NodeListOf<any> = contentRef.current?.childNodes || ([] as any);
    nodes.forEach((node: HTMLDivElement) => {
      if (!node) {
        return;
      }
      const index = Number(node.dataset.index);
      const { height = props.presetItemHeight } = node.getBoundingClientRect();
      cacheContentHeight[index] = height;
    });
    setVirtualBoxHeight(cacheContentHeight?.reduce((v, v2) => Number(v) + Number(v2)));
  };

  const getVirtualContentTop = () => {
    //更新节点后重新改变transform的值
    let top = 0;
    const newCache = Array.from(cacheContentHeight);
    newCache.length = startIndex;
    if (newCache.length > 1) {
      top = newCache.reduce((v, v2) => v + v2);
    } else {
      top = newCache[0];
    }
    return startIndex == 0 ? 0 : top;
  };

  return (
    <>
      <div ref={virtualRef} id="virtual-scroll" className="virtual-scroll-box">
        <div className="virtual-top-box" style={{ height: virtualBoxHeight }}></div>
        <div
          ref={contentRef}
          className="virtual-content"
          style={{ transform: `translate3d(0, ${getVirtualContentTop()}px, 0)` }}
        >
          {Array.from({ length: endIndex - startIndex }).map((_v, i) => {
            return (
              <div className="virtual-item" key={i} data-index={startIndex + i}>
                {props.itemRender(startIndex + i)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};


styled.div`
.virtual-scroll-box{
    width: inherit;
    height: inherit;
    overflow: hidden auto;
    position: relative;
  }
  .virtual-content{
    width: inherit;
    position: absolute;
    left: 0;
    top: 0;
  }
`