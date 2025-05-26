
interface TreeNode {
    id: string;
    pid: string;
    sort: string;
    children?: TreeNode[];
    [key: string]: any;
}

// 一维数组转树形数据 pid
export function convertToTree(data: TreeNode[]): TreeNode[] {
    // 创建哈希映射
    const nodeMap = new Map<string, TreeNode>();
    const tree: TreeNode[] = [];
    
    // 第一次遍历创建节点映射
    data.forEach(item => {
      nodeMap.set(item.id, { ...item,value:item.id,title:item.name, children: [] });
    });
  
    // 第二次遍历构建树结构
    data.forEach(item => {
      const node = nodeMap.get(item.id);
      if (item.pid !== '0') {
        const parent = nodeMap.get(item.pid);
        if (parent) {
          parent.children!.push(node!);
          // 按sort值排序子节点
          parent.children!.sort((a, b) => parseInt(a.sort) - parseInt(b.sort));
        }
      } else {
        tree.push(node!);
      }
    });
    // 按sort值排序根节点
    tree.sort((a, b) => parseInt(a.sort) - parseInt(b.sort));
    return tree;
}
  
interface FlatNode extends Omit<TreeNode, 'children'> {
    parentId?: string | number | null;
}
interface EnhancedFlatNode extends FlatNode {
    depth: number;
    path: string[];
}
  // 带层级信息的扁平化实现
  // export function flattenTreeWithDepth(root: TreeNode[]): EnhancedFlatNode[] {
  //   const result: EnhancedFlatNode[] = [];
    
  //   const traverse = (
  //     nodes: TreeNode[],
  //     parentInfo: { id: string | number | null; depth: number; path: string[] }
  //   ) => {
  //     nodes.forEach(node => {
  //       const currentPath = [...parentInfo.path, node.name];
  //       const currentDepth = parentInfo.depth + 1;
        
  //       result.push({
  //         ...node,
  //         parentId: parentInfo.id,
  //         depth: currentDepth,
  //         path: currentPath
  //       });
  
  //       if (node.children) {
  //         traverse(node.children, {
  //           id: node.id,
  //           depth: currentDepth,
  //           path: currentPath
  //         });
  //       }
  //     });
  //   };
  //   traverse(root, { id: null, depth: -1, path: [] });
  //   return result;
  // }
  // 实现方法
export function flattenTreeWithDepth(root: TreeNode[]): FlatNode[] {
    const result: FlatNode[] = [];
    const traverse = (
      nodes: TreeNode[],
      parentInfo: { id: string | null; depth: number; path: string[] }
    ) => {
      nodes.forEach(node => {
        // 使用展开运算符排除children属性
        const { children, ...rest } = node;
        const currentPath = [...parentInfo.path, node.name];
        const currentDepth = parentInfo.depth + 1;
  
        result.push({
          ...rest,
          parentId: parentInfo.id,
          depth: currentDepth,
          path: currentPath
        });
  
        if (children?.length) {
          traverse(children, {
            id: node.id,
            depth: currentDepth,
            path: currentPath
          });
        }
      });
    };
    traverse(root, { id: null, depth: -1, path: [] });
    return result;
}

// 插件数据转化
// 转换函数
export function transformConfig(obj: Record<string, any>){
  return Object.keys(obj).reduce((acc, key) => {
    const configKey = `config[${key}]` as const;
    return {
      ...acc,
      [configKey]: obj[key]
    };
  }, {});
};

// 数组分组 -- 订单
export function groupBy(arr:any[], key:string) {
  const groups = arr.reduce((result, obj) => {
    const groupKey = obj[key];
    (result[groupKey] = result[groupKey] || []).push({...obj,num:0});
    return result;
  }, {});

  // 将对象转换为数组格式
  return Object.entries(groups).map(([groupKey, items]:any) => ({
    groupKey,
    time:items[0].shipment_time,
    total: items.reduce((sum: number, item: any) => sum + parseInt(item["quantity_shipped"] || 0), 0),
    items
  }));

}
