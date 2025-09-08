
import { BackIcon, DownIcon, EditorCategoryIcon, EditorHomeIcon, RightIcon } from '@/components/Icons/Icons';
import SuccessTag from '@/components/Tag/SuccessTag';
import editor from '@/store/theme/editor';
import { Button, Dropdown, Flex, MenuProps, Space, Tag, Tooltip } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const [actItem,setActItem] = useState({
        icon:<EditorHomeIcon/>,
        title:"首页",
        key:"1",
    });

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Link to="home" onClick={()=>setActItem({
                icon:<EditorHomeIcon />,
                title:"首页",
                key:"1",
            })}>
                <Flex align='center' gap={8}>
                    <EditorHomeIcon className='font-24' />首页
                </Flex>
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to="allCollections" onClick={()=>setActItem({
                icon:<EditorCategoryIcon />,
                title:"分类页",
                key:"2",
            })}>
              <Flex align='center' gap={8}>
                    <EditorCategoryIcon className='font-24' />分类页
                </Flex>
            </Link>
          ),
        },
    ];

    const style: React.CSSProperties = {
        width: 200,
        padding: "6px 0",
      };

    return(
        <Scoped className='font-14'>
            {/* left */}
            <Tooltip title="返回管理后台" placement="right">
                <div className='header-left cursor-pointer' onClick={()=>navigate(`/website/shopSetting`)}>
                    <BackIcon className='font-20' />
                </div>
            </Tooltip>
            <Flex className='header-main' justify='space-between'>
                {/* left */}
                <Flex gap={8} align='center'>
                    <div className='font-w-600' style={{marginLeft:"16px"}}>Modern1<span style={{marginLeft:"6px"}}>1.4.37</span></div>
                    <SuccessTag text="已启用" />
                </Flex>
                <Flex>
                    <Dropdown menu={{ items,style }} trigger={["click"]} onOpenChange={(open) => setMenuOpen(open)}>
                        <Space>
                            <Flex align='center' gap={8} className='cursor-pointer'>
                                <Flex align='center' className='font-24'>{actItem.icon}</Flex>
                                <div>{actItem.title}</div>
                                <DownIcon className={menuOpen?'rotated-up':'rotated-down'} />
                            </Flex>
                        </Space>
                    </Dropdown>
                </Flex>
                <Flex className='header-main-right'>
                    <div className='prev-btn'>预览</div>
                    <Button type="primary" className='font-14 save-btn' onClick={()=>{
                        console.log(editor.templateData)
                    }}>保存</Button>
                </Flex>
            </Flex>
        </Scoped>
    )
        
}

const Scoped = styled.div`
    display: flex;
    height: 52px;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    .header-left{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        border-right: 1px solid rgba(5, 5, 5, 0.06);
    }
    .header-main{
        flex: 1;
        .rotated-up{
            transform: rotate(180deg);
            transition: transform 0.3s ease;
        }
        .rotated-down{
            transform: rotate(0deg);
            transition: transform 0.3s ease;
        }

        .header-main-right{
            .prev-btn{
                align-items: center;
                border-left: 1px solid #eaedf1;
                cursor: pointer;
                display: flex;
                height: 100%;
                justify-content: center;
                padding-left: 30px;
                padding-right: 30px;
                /* padding: 8px 12px 8px 8px; */
                transition: .3s;
                white-space: nowrap;
            }
            .save-btn{
                border: 0;
                border-radius: 0;
                height: 100%;
                padding-left: 20px;
                padding-right: 20px;
            }
        }
    }
`