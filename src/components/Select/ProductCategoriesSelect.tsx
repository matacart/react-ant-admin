import { ConfigProvider, Flex, Select, SelectProps, Spin } from "antd";
import { debounce } from "lodash";
import { useCallback, useMemo, useRef, useEffect } from "react";

interface MySelectProps extends SelectProps {
  Ref?: React.RefObject<HTMLElement>;
  loading?: boolean;          // 是否正在加载更多
  hasMore?: boolean;          // 是否还有更多数据
  onLoadMore?: () => void;    // 加载更多回调
}

function ProductCategoriesSelect({
  Ref,
  loading = false,
  options,
  hasMore = true,
  onLoadMore,
  ...restProps // 透传其他属性（如 placeholder, style, value 等）
}: MySelectProps) {
  // 用 ref 保存最新的 onLoadMore，避免防抖函数因 onLoadMore 变化而重建
  const onLoadMoreRef = useRef(onLoadMore);
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  // 滚动事件处理
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (!target) return;
        const { scrollTop, clientHeight, scrollHeight } = target;
        // 滚动到底部（留 5px 容差）
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            // 只有在未加载且还有更多数据时才触发
            if (!loading && hasMore && onLoadMoreRef.current) {
            onLoadMoreRef.current();
            }
        }
    },
    [loading, hasMore] // 依赖 loading 和 hasMore，变化时重建函数
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          paddingXXS: 0,
        },
      }}
    >
        <Select
            {...restProps}
            options={options}
            onPopupScroll={handleScroll} // 绑定滚动事件
            popupRender={(menu) => (
                <div style={{padding:"8px 0"}}>
                    {menu}
                    {loading && (
                        <Flex align="center" justify="center" style={{ padding: '10px' }}>
                            <Spin />
                        </Flex>
                    )}
                </div>
            )}
        />
    </ConfigProvider>
  );
}

export default ProductCategoriesSelect;