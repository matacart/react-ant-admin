import SimpleCard from "@/components/Card/SimpleCard";
import { AutoComplete, Card, Flex, Form, Input, List, Modal, Tooltip, Tree, TreeDataNode, TreeProps } from "antd"
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import DeleteModal from "@/components/Modal/DeleteModal";
import { AddIcon } from "@/components/Icons/Icons";
import { title } from 'process';
import navListStore from "@/store/channel/navList/navListStore";

const x = 3;
const y = 2;
const z = 1;
const defaultData: TreeDataNode[] = [];
const generateData = (_level: number, _preKey?: React.Key, _tns?: TreeDataNode[]) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;

  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);


const MenuItemCard = ()=>{

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [nodeKey,setNodeKey] = useState("")

    // const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

    const [form] = Form.useForm();

    const [hasFormData,setHasFormData] = useState(false)

    const mRef = useRef<HTMLDivElement>(null)

    const options = [
      { 
        value: 'https://www.home.com', 
        label: <Flex align="center" gap={8} style={{padding:"2px 0px"}}>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUuNSA0QTEuNSAxLjUgMCAwMDQgNS41djEzQTEuNSAxLjUgMCAwMDUuNSAyMGgxM2ExLjUgMS41IDAgMDAxLjUtMS41di0xM0ExLjUgMS41IDAgMDAxOC41IDRoLTEzek0xNyA4Ljc1SDdhLjUuNSAwIDAxLS41LS41di0uNWEuNS41IDAgMDEuNS0uNWgxMGEuNS41IDAgMDEuNS41di41YS41LjUgMCAwMS0uNS41em0wIDRIN2EuNS41IDAgMDEtLjUtLjV2LS41YS41LjUgMCAwMS41LS41aDEwYS41LjUgMCAwMS41LjV2LjVhLjUuNSAwIDAxLS41LjV6bS00IDMuNWEuNS41IDAgMDEtLjUuNUg3YS41LjUgMCAwMS0uNS0uNXYtLjVhLjUuNSAwIDAxLjUtLjVoNS41YS41LjUgMCAwMS41LjV2LjV6IiBmaWxsPSIjNDc0RjVFIi8+PC9zdmc+" />
          <div>首页</div>
        </Flex>
      },
      { value: '1',
        label: <Flex align="center" gap={8} style={{padding:"2px 0px"}}>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUuNSA0QTEuNSAxLjUgMCAwMDQgNS41djEzQTEuNSAxLjUgMCAwMDUuNSAyMGgxM2ExLjUgMS41IDAgMDAxLjUtMS41di0xM0ExLjUgMS41IDAgMDAxOC41IDRoLTEzek0xNyA4Ljc1SDdhLjUuNSAwIDAxLS41LS41di0uNWEuNS41IDAgMDEuNS0uNWgxMGEuNS41IDAgMDEuNS41di41YS41LjUgMCAwMS0uNS41em0wIDRIN2EuNS41IDAgMDEtLjUtLjV2LS41YS41LjUgMCAwMS41LS41aDEwYS41LjUgMCAwMS41LjV2LjVhLjUuNSAwIDAxLS41LjV6bS00IDMuNWEuNS41IDAgMDEtLjUuNUg3YS41LjUgMCAwMS0uNS0uNXYtLjVhLjUuNSAwIDAxLjUtLjVoNS41YS41LjUgMCAwMS41LjV2LjV6IiBmaWxsPSIjNDc0RjVFIi8+PC9zdmc+" />
          <div>搜索页</div>
        </Flex> 
      },
      { value: '2',
        label: <Flex align="center" gap={8} style={{padding:"2px 0px"}}>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEzLjUyMiAxOC42NjFsLjEwMi4xMDJhMS41IDEuNSAwIDAwMi4xMjEgMGw1LjUxOC01LjUxOGExLjUgMS41IDAgMDAwLTIuMTIxbC02LjY4NS02LjY4NWExLjUgMS41IDAgMDAtMS4yNzItLjQyNGwtMS4zLjE4NiA2LjU3NSA2LjU3M2EyIDIgMCAwMTAgMi44MjlsLTUuMDU5IDUuMDU4eiIgZmlsbD0iIzQ3NEY1RSIvPjxwYXRoIGQ9Ik0yLjUxNSAxMC44MDhhMS41IDEuNSAwIDAwLjQyNCAxLjI3M2w2LjY4NSA2LjY4NWExLjUgMS41IDAgMDAyLjEyMSAwbDUuNTE4LTUuNTE4YTEuNSAxLjUgMCAwMDAtMi4xMjFsLTYuNjg1LTYuNjg1YTEuNSAxLjUgMCAwMC0xLjI3Mi0uNDI0bC01LjU3Ljc5NWEuNS41IDAgMDAtLjQyNS40MjVsLS43OTYgNS41N3ptMy45OS0xLjNhMS41IDEuNSAwIDExMC0zIDEuNSAxLjUgMCAwMTAgM3oiIGZpbGw9IiM0NzRGNUUiLz48L3N2Zz4=" />
          <div>商品分类</div>
        </Flex> 
      },
      { value: '3',
        label: <Flex align="center" gap={8} style={{padding:"2px 0px"}}>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEzLjUyMiAxOC42NjFsLjEwMi4xMDJhMS41IDEuNSAwIDAwMi4xMjEgMGw1LjUxOC01LjUxOGExLjUgMS41IDAgMDAwLTIuMTIxbC02LjY4NS02LjY4NWExLjUgMS41IDAgMDAtMS4yNzItLjQyNGwtMS4zLjE4NiA2LjU3NSA2LjU3M2EyIDIgMCAwMTAgMi44MjlsLTUuMDU5IDUuMDU4eiIgZmlsbD0iIzQ3NEY1RSIvPjxwYXRoIGQ9Ik0yLjUxNSAxMC44MDhhMS41IDEuNSAwIDAwLjQyNCAxLjI3M2w2LjY4NSA2LjY4NWExLjUgMS41IDAgMDAyLjEyMSAwbDUuNTE4LTUuNTE4YTEuNSAxLjUgMCAwMDAtMi4xMjFsLTYuNjg1LTYuNjg1YTEuNSAxLjUgMCAwMC0xLjI3Mi0uNDI0bC01LjU3Ljc5NWEuNS41IDAgMDAtLjQyNS40MjVsLS43OTYgNS41N3ptMy45OS0xLjNhMS41IDEuNSAwIDExMC0zIDEuNSAxLjUgMCAwMTAgM3oiIGZpbGw9IiM0NzRGNUUiLz48L3N2Zz4=" />
          <div>商品</div>
        </Flex> 
      },
      { value: '4',
        label: <Flex align="center" gap={8} style={{padding:"2px 0px"}}>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUuNSA0QTEuNSAxLjUgMCAwMDQgNS41djEzQTEuNSAxLjUgMCAwMDUuNSAyMGgxM2ExLjUgMS41IDAgMDAxLjUtMS41di0xM0ExLjUgMS41IDAgMDAxOC41IDRoLTEzek0xNyA4Ljc1SDdhLjUuNSAwIDAxLS41LS41di0uNWEuNS41IDAgMDEuNS0uNWgxMGEuNS41IDAgMDEuNS41di41YS41LjUgMCAwMS0uNS41em0wIDRIN2EuNS41IDAgMDEtLjUtLjV2LS41YS41LjUgMCAwMS41LS41aDEwYS41LjUgMCAwMS41LjV2LjVhLjUuNSAwIDAxLS41LjV6bS00IDMuNWEuNS41IDAgMDEtLjUuNUg3YS41LjUgMCAwMS0uNS0uNXYtLjVhLjUuNSAwIDAxLjUtLjVoNS41YS41LjUgMCAwMS41LjV2LjV6IiBmaWxsPSIjNDc0RjVFIi8+PC9zdmc+" />
          <div>自定义页面</div>
        </Flex> 
      },
      { value: '5',
        label: <Flex align="center" gap={8} style={{padding:"2px 0px"}}>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUuNSA0QTEuNSAxLjUgMCAwMDQgNS41djEzQTEuNSAxLjUgMCAwMDUuNSAyMGgxM2ExLjUgMS41IDAgMDAxLjUtMS41di0xM0ExLjUgMS41IDAgMDAxOC41IDRoLTEzek0xNyA4Ljc1SDdhLjUuNSAwIDAxLS41LS41di0uNWEuNS41IDAgMDEuNS0uNWgxMGEuNS41IDAgMDEuNS41di41YS41LjUgMCAwMS0uNS41em0wIDRIN2EuNS41IDAgMDEtLjUtLjV2LS41YS41LjUgMCAwMS41LS41aDEwYS41LjUgMCAwMS41LjV2LjVhLjUuNSAwIDAxLS41LjV6bS00IDMuNWEuNS41IDAgMDEtLjUuNUg3YS41LjUgMCAwMS0uNS0uNXYtLjVhLjUuNSAwIDAxLjUtLjVoNS41YS41LjUgMCAwMS41LjV2LjV6IiBmaWxsPSIjNDc0RjVFIi8+PC9zdmc+" />
          <div>政策</div>
        </Flex> 
      },
      { value: '6',
        label: <Flex align="center" gap={8} style={{padding:"2px 0px"}}>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQgNS4zMTNDNCA0LjU4OCA0LjU0NiA0IDUuMjE5IDRIMTUuNzhDMTYuNDU0IDQgMTcgNC41ODggMTcgNS4zMTN2NC4zMDNjLS4yODQuMTIxLS41NS4yOTgtLjc4My41M0wxMCAxNi4zNjRhMiAyIDAgMDAtLjU4NiAxLjQxNFYxOS45YzAgLjAzMyAwIC4wNjcuMDAzLjFINS4yMTlDNC41NDYgMjAgNCAxOS40MTIgNCAxOC42ODdWNS4zMTN6bTEyLjU5NiA2LjU3NmwuNDA0LS40MDQuMjc4LS4yNzhhMSAxIDAgMDExLjQxNCAwbDEuNDE1IDEuNDE0YTEgMSAwIDAxMCAxLjQxNWwtLjY4My42ODJMMTcgMTIuMjkzbC0uNDA0LS40MDR6bS0uNzA3LjcwN0wxNyAxMy43MDdsMS43MTcgMS43MThMMTcgMTcuMTQyIDE0LjE0MiAyMGwtLjI1My4yNTNhLjUuNSAwIDAxLS4zNTQuMTQ2aC0yLjEyYS41LjUgMCAwMS0uNS0uNDg4di0yLjEzMmEuNS41IDAgMDEuMTQ2LS4zNTRsNC44MjgtNC44Mjl6TTYuNSA4LjVWOWEuNS41IDAgMDAuNS41aDVhLjUuNSAwIDAwLjUtLjV2LS41QS41LjUgMCAwMDEyIDhIN2EuNS41IDAgMDAtLjUuNXptMCA0di41YS41LjUgMCAwMC41LjVoM2EuNS41IDAgMDAuNS0uNXYtLjVhLjUuNSAwIDAwLS41LS41SDdhLjUuNSAwIDAwLS41LjV6IiBmaWxsPSIjNDc0RjVFIi8+PC9zdmc+" />
          <div>博客集合</div>
        </Flex> 
      },
      { value: '7',
        label: <Flex align="center" gap={8} style={{padding:"2px 0px"}}>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQgNS4zMTNDNCA0LjU4OCA0LjU0NiA0IDUuMjE5IDRIMTUuNzhDMTYuNDU0IDQgMTcgNC41ODggMTcgNS4zMTN2NC4zMDNjLS4yODQuMTIxLS41NS4yOTgtLjc4My41M0wxMCAxNi4zNjRhMiAyIDAgMDAtLjU4NiAxLjQxNFYxOS45YzAgLjAzMyAwIC4wNjcuMDAzLjFINS4yMTlDNC41NDYgMjAgNCAxOS40MTIgNCAxOC42ODdWNS4zMTN6bTEyLjU5NiA2LjU3NmwuNDA0LS40MDQuMjc4LS4yNzhhMSAxIDAgMDExLjQxNCAwbDEuNDE1IDEuNDE0YTEgMSAwIDAxMCAxLjQxNWwtLjY4My42ODJMMTcgMTIuMjkzbC0uNDA0LS40MDR6bS0uNzA3LjcwN0wxNyAxMy43MDdsMS43MTcgMS43MThMMTcgMTcuMTQyIDE0LjE0MiAyMGwtLjI1My4yNTNhLjUuNSAwIDAxLS4zNTQuMTQ2aC0yLjEyYS41LjUgMCAwMS0uNS0uNDg4di0yLjEzMmEuNS41IDAgMDEuMTQ2LS4zNTRsNC44MjgtNC44Mjl6TTYuNSA4LjVWOWEuNS41IDAgMDAuNS41aDVhLjUuNSAwIDAwLjUtLjV2LS41QS41LjUgMCAwMDEyIDhIN2EuNS41IDAgMDAtLjUuNXptMCA0di41YS41LjUgMCAwMC41LjVoM2EuNS41IDAgMDAuNS0uNXYtLjVhLjUuNSAwIDAwLS41LS41SDdhLjUuNSAwIDAwLS41LjV6IiBmaWxsPSIjNDc0RjVFIi8+PC9zdmc+" />
          <div>博客</div>
        </Flex> 
      },
    ];
  
    const [gData, setGData] = useState<TreeDataNode[]>([
      {
        title: '首页',
        key: '0',
        children: [
          {
            title: '产品分类',
            key: '1',
            children: [
              { title: '手机', key: '0-0-0' },
              { title: '电脑', key: '0-0-1' }
            ]
          },
          {
            title: '关于我们',
            key: '2',
            children: [
              { title: '公司简介', key: '0-1-0' },
              { title: '联系我们', key: '0-1-1' }
            ]
          }
        ]
      }
    ]);
    const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);

    const onDragEnter: TreeProps['onDragEnter'] = (info) => {
      console.log(info);
      // expandedKeys, set it when controlled is needed
      // setExpandedKeys(info.expandedKeys)
    };

    const onDrop: TreeProps['onDrop'] = (info) => {
      const dropKey = info.node.key;
      const dragKey = info.dragNode.key;
      const dropPos = info.node.pos.split('-');
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1
      const loop = (
        data: TreeDataNode[],
        key: React.Key,
        callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
      ) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children) {
            loop(data[i].children!, key, callback);
          }
        }
      };
      const data = [...gData];

      // Find dragObject
      let dragObj: TreeDataNode;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });

      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
          item.children.unshift(dragObj);
        });
      } else {
        let ar: TreeDataNode[] = [];
        let i: number;
        loop(data, dropKey, (_item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          // Drop on the top of the drop node
          ar.splice(i!, 0, dragObj!);
        } else {
          // Drop on the bottom of the drop node
          ar.splice(i! + 1, 0, dragObj!);
        }
      }
      setGData(data);
    };

    // 删除节点
    const handleRemove = (key: React.Key) => {
      const data = [...gData];
      
      const loop = (nodes: TreeDataNode[]): TreeDataNode[] => {
        return nodes.filter(node => {
          if (node.key === key) return false
          if (node.children) {
            node.children = loop(node.children)
          }
          return true
        })
      }

      setGData(loop(data))
    }

    // 更新后代节点
    const updateNodeData = (key: React.Key, newData: Partial<TreeDataNode>) => {
      
      setGData(prevData => {
        const deepClone = (nodes: TreeDataNode[]): TreeDataNode[] => 
          nodes.map(node => ({
            ...node,
            ...(node.key === key ? newData : {}), // 合并新数据
            children: node.children ? deepClone(node.children) : []
          }));
        return deepClone(prevData);
      });
    };

    const content = (
      <DndScoped>
          <Tree
            className="draggable-tree"
            // defaultExpandedKeys={expandedKeys}
            defaultExpandAll={true}
            draggable
            blockNode
            selectable={false}
            // switcherIcon={<></>}
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            treeData={gData}
            titleRender={(nodeData)=>{
              return (
                <Flex className="item" justify="space-between">
                  <div className="font-w-600">{nodeData.title as string}</div>
                  <Flex style={{marginRight:"12px"}} gap={12}>
                    <Tooltip title="添加子菜单">
                      <div className='wrap' onClick={()=>{
                        setNodeKey(nodeData.key.toString())
                        setIsModalOpen(true)
                      }}>
                        <PlusOutlined className="font-18 color-474F5E cursor-pointer" />
                      </div>
                    </Tooltip>
                    {/*  */}
                    <Tooltip title="编辑">
                      <div className='wrap' onClick={()=>{
                        setNodeKey(nodeData.key.toString())
                        form.setFieldsValue({ 
                          title: nodeData.title,
                          // link: nodeData.link // 根据你的数据结构调整
                        });
                        setHasFormData(true)
                        setIsModalOpen(true)
                      }}>
                        <EditOutlined className="font-18 color-474F5E cursor-pointer" />
                      </div>
                    </Tooltip>
                    {/*  */}
                    <DeleteModal tElement={
                      <Tooltip title="删除">
                        <div className='wrap' onClick={(e) => {
                          // e.stopPropagation()
                        }}>
                          <DeleteOutlined className="font-18 color-F86140 cursor-pointer" />
                        </div>
                      </Tooltip>
                    }
                    removeFunc={()=>{
                      handleRemove(nodeData.key)
                    }} 
                    title="确认要删除此菜单项吗？" 
                    content={""}
                    okText="删除" />
                  </Flex>
                </Flex>
              )
            }}
          />
      </DndScoped>
    )

    return (
      <Scoped ref={mRef}>
        <SimpleCard title={<div>编辑菜单项</div>} content={content} extra={<span onClick={()=>{
          setNodeKey("")
          setIsModalOpen(true)
        }} className="color-356DFF cursor-pointer">添加菜单项</span>} />
        {/*  */}
        <Modal title={hasFormData?"编辑菜单项":"添加菜单项"} centered width={620} open={isModalOpen} onOk={()=>form.submit()} onCancel={()=>{
          form.resetFields()
          setIsModalOpen(false)
          setHasFormData(false)
        }}>
          <Form form={form} initialValues={{
            title: "",
            link: "",
          }} layout="vertical" onFinish={()=>{
            // 编辑
            if(hasFormData){
              updateNodeData(nodeKey, {
                title: form.getFieldValue("title"),
                // link: form.getFieldValue("link")
              })
            }else if(nodeKey && nodeKey!==""){
              // 添加子节点
              const newChild = { title: form.getFieldValue("title"), key: new Date().toString(),children:[] }
              setGData(prevData => {
                const deepUpdate = (nodes: TreeDataNode[]): TreeDataNode[] => 
                  nodes.map(node => ({
                    ...node,
                    children: node.key === nodeKey 
                      ? [...(node.children || []), newChild] // 追加子节点
                      : node.children ? deepUpdate(node.children) : []
                  }));
                  navListStore.setNewListChild(deepUpdate(prevData))
                return deepUpdate(prevData);
                
              });
            }else{
              // 添加根节点
              setGData([
                ...gData,
                { title: form.getFieldValue("title"), key: new Date().toString(),children:[] },
              ])
            }
            form.resetFields()
            setHasFormData(false)
            setIsModalOpen(false)
          }}>
            <Form.Item name="title" label="菜单项标题" rules={[{ required: true, message: '请输入菜单项标题' }]}>
              <Input placeholder="请输入菜单项标题" allowClear />
            </Form.Item>
            <Form.Item name="link" label="跳转链接">
              <AutoComplete
                options={options}
                allowClear
                popupClassName="autoComplete-warp"
                placeholder="输入链接或选择页面"
                getPopupContainer={() => mRef.current!}
                virtual={false}
                filterOption={(inputValue, option) =>
                  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                dropdownRender={(menu) => {
                  return (
                    <div style={{overflow: 'auto', maxHeight: 300}}>
                      {menu}
                    </div>
                  )
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Scoped>
    )
}


export default MenuItemCard

const Scoped = styled.div`
  .autoComplete-warp{
    padding: 0;
  }
`
const DndScoped = styled.div`
  .item{
    border: 1px solid #eef1f6;
    border-radius: 4px;
    height: 60px;
    line-height: 60px;
    padding-left: 24px;
  }
  .ant-tree-switcher{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-tree-switcher:before{
    top:18px;
  }
  .ant-tree-draggable-icon{
    display: none;
  }
`