import type {UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import type {FlattenedItem, TreeItem, TreeItems} from '../../../../../../store/channel/navList/navgate';
import navgate from "@/store/channel/navList/navgate";

// 根据拖拽偏移量计算层级深度
function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}
function getMaxDepth({previousItem}: {previousItem: FlattenedItem}) {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
}
function getMinDepth({nextItem}: {nextItem: FlattenedItem}) {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
}
// 计算拖拽时的目标位置、层级深度和父节点
export function getProjection(
  items: FlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
) {
  const overItemIndex = items.findIndex(({id}) => id === overId);
  const activeItemIndex = items.findIndex(({id}) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({nextItem});
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  return {depth, maxDepth, minDepth, parentId: getParentId()};

  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  }
}

// 将嵌套树结构扁平化为一维数组
function flatten(
  items: TreeItems,
  parentId: UniqueIdentifier | null = null,
  depth = 0
): FlattenedItem[] {
  return items.reduce<FlattenedItem[]>((acc, item, index) => {
    return [
      ...acc,
      {...item, parentId, depth, index},
      ...flatten(item.children, item.id, depth + 1),
    ];
  }, []);
}
export function flattenTree(items: TreeItems): FlattenedItem[] {
  return flatten(items);
}

// 将扁平数组重新构建为嵌套树结构
export function buildTree(flattenedItems: FlattenedItem[]): TreeItems {
  const root: TreeItem = {id: 'root', children: []};
  const nodes: Record<string, TreeItem> = {[root.id]: root};
  const items = flattenedItems.map((item) => ({...item, children: []}));

  for (const item of items) {
    const {id, children} = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);

    nodes[id] = {id, children};
    parent.children.push(item);
  }

  return root.children;
}
// 查找指定节点
export function findItem(items: TreeItem[], itemId: UniqueIdentifier) {
  return items.find(({id}) => id === itemId);
}
// 查找指定节点
export function findItemDeep(
  items: TreeItems,
  itemId: UniqueIdentifier
): TreeItem | undefined {
  for (const item of items) {
    const {id, children} = item;

    if (id === itemId) {
      return item;
    }

    if (children.length) {
      const child = findItemDeep(children, itemId);

      if (child) {
        return child;
      }
    }
  }

  return undefined;
}
// 移除指定节点及其子节点
export function removeItem(items: TreeItems, id: UniqueIdentifier) {
  const newItems = [];
  for (const item of items) {
    if (item.id === id) {
      !item.isNew && navgate.setRemoveItems([...navgate.removeItems,{
        ...item,
        status:"-1",
      }]);
      continue;
    }
    if (item?.children?.length) {
      item.children = removeItem(item.children, id);
    }
    newItems.push(item);
  }

  return newItems;
}
// 添加子节点
export function addItem(items: TreeItems, parentId: UniqueIdentifier,newItem:TreeItem): TreeItems {
  const newItems = items.map(item => {
    if (item.id === parentId) {
      // 如果找到目标父节点，将新项目添加到其子节点数组中
      return {
        ...item,
        children: [...item.children, newItem]
      };
    } else if (item.children.length > 0) {
      // 递归处理子节点，查找目标父节点
      return {
        ...item,
        children: addItem(item.children, parentId, newItem)
      };
    }
    return item;
  });
  return newItems;
}
// 修改节点属性 -- 折叠状态
export function setProperty<T extends keyof TreeItem>(
  items: TreeItems,
  id: UniqueIdentifier,
  property: T,
  setter: (value: TreeItem[T]) => TreeItem[T]
) {
  for (const item of items) {
    if (item.id === id) {
      item[property] = setter(item[property]);
      continue;
    }

    if (item.children.length) {
      item.children = setProperty(item.children, id, property, setter);
    }
  }

  return [...items];
}

// 更新节点属性
export function updateItem(items: TreeItems, id: UniqueIdentifier, newItem:TreeItem): TreeItems{
  const newItems = items.map(item => {
    if (item.id === id) {
      // 更新节点
      return {
        ...item, // 保留原有属性
        ...newItem, // 覆盖新属性
        id:item.id, // 确保ID不变
        children: item.children // 保留原有子节点
      };
    } else if (item?.children && item.children.length > 0) {
      return {
        ...item,
        children: updateItem(item.children, id, newItem),
      };
    }else{
      return item;
    }
  })
  return newItems;
}

function countChildren(items: TreeItem[], count = 0): number {
  return items.reduce((acc, {children}) => {
    if (children.length) {
      return countChildren(children, acc + 1);
    }

    return acc + 1;
  }, count);
}
// 计算节点子元素数量
export function getChildCount(items: TreeItems, id: UniqueIdentifier) {
  const item = findItemDeep(items, id);

  return item ? countChildren(item.children) : 0;
}
// 过滤掉指定父节点的所有子节点
export function removeChildrenOf(
  items: FlattenedItem[],
  ids: UniqueIdentifier[]
) {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
}



/**
 * 递归转换对象中的字段名
 * @param {Object|Array} data - 要转换的数据
 * @param {Object} fieldMap - 字段映射对象 {原字段名: 新字段名}
 * @returns {Object|Array} 转换后的数据
 */
export function transformFields<T>(data: T, fieldMap: Record<string, string>): any {
  if (Array.isArray(data)) {
    return data.map(item => transformFields(item, fieldMap));
  }
  if (data && typeof data === 'object') {
    const result: Record<string, any> = {};
    // 遍历原对象的所有字段
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const newKey = fieldMap[key] || key; // 获取新字段名，没有映射则保持原样
        // 递归处理子对象或数组
        if ((key !== 'name') && (Array.isArray(data[key]) || (data[key] && typeof data[key] === 'object'))) {
          result[newKey] = transformFields(data[key], fieldMap);
        } else {
          result[newKey] = data[key];
        }
      }
    }
    // 处理特殊情况：补上title字段 和 img字段
    result.title = (result?.languagesId ? result.name[result.languagesId] : result.name?.default) || "";
    result.img = result.image?.src || "";
    return result;
  }
  return data;
}
