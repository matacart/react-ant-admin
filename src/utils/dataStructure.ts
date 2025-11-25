
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

// 根据时间戳生成id
export function generateId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return timestamp + random;
}

// codeEditor
// 在 treeData 中查找或创建目录结构
export function insertFileInTree(treeData: any[], fileName: string, fileType: string, fullPath: string,filePath:string){
  const newTreeData = JSON.parse(JSON.stringify(treeData));
  // 查找filePath节点
  const sectionsNode = newTreeData.find((node: any) => node.title === filePath);
  if (!sectionsNode) return {
      newTreeData:newTreeData,
      level: 0
  };
  // 处理路径
  if (!fullPath.includes('/')) {
      // 没有目录结构，直接添加到filePath根目录
      sectionsNode.children.push({
          title: fileName + "." + fileType,
          key: filePath + "/" + fileName + "." + fileType + "-1",
          children: undefined,
          level: 1,
          fileType: fileType,
      });
      return {
          newTreeData:newTreeData,
          level: 1
      };
  }
  // 有目录结构，需要处理目录
  const pathParts = fullPath.split('/');
  const actualFileName = pathParts.pop()!; // 文件名
  let currentNodeChildren = sectionsNode.children;
  // 逐级查找或创建目录
  for (const dirName of pathParts) {
      // 查找目录是否存在
      let dirNode = currentNodeChildren.find((node: any) => node.title === dirName);
      if (!dirNode) {
          // 目录不存在，创建新目录
          dirNode = {
              title: dirName,
              key: filePath + "/" + pathParts.slice(0, pathParts.indexOf(dirName) + 1).join('/') + "-folder",
              children: [],
              fileType: undefined,
              level: pathParts.indexOf(dirName) + 1 ,
          };
          currentNodeChildren.push(dirNode);
      }
      // 如果节点没有 children 属性，添加它
      if (!dirNode.children) {
          dirNode.children = [];
      }
      // 移动到下一级
      currentNodeChildren = dirNode.children;
  }
  // 在最终目录中添加文件
  currentNodeChildren.push({
      title: actualFileName + "." + fileType,
      key: filePath + "/" + fullPath + "." + fileType +"-"+ (pathParts.length + 1),
      children: undefined,
      fileType: fileType,
      level: pathParts.length + 1,
  });
  return {
      newTreeData:newTreeData,
      level: pathParts.length + 1
  };
};
