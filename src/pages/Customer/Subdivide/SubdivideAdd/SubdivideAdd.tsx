import { ArrowLeftOutlined, ExportOutlined, ImportOutlined } from '@ant-design/icons'
import { Button, Card, Drawer, Dropdown, Flex, Form, Input, MenuProps, message, Select, Space } from 'antd'
import styled from 'styled-components';
import ScreeningConditionCard from './ScreeningConditionCard';
import CustomerListCard from "../../Components/CustomerListCard"
import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@/components/Icons/Icons';
import ButtonDropdown from '@/components/Dropdown/ButtonDropdown';

// 客户细分 -- 细分/草稿
function SubdivideAdd(){

  const navigate = useNavigate();

  const controlsItems: MenuProps['items'] = [
    {
      label: <div>导出</div>,
      key: '1',
    },
    {
      label: <div>重命名</div>,
      key: '2',
    },
    {
      label: <div className='color-F86140'>删除</div>,
      key: '3',
    }
  ];

  return (
      <Scoped>
        <div className='mc-layout-wrap'>
          <div className="mc-layout">
            <div className="mc-header">
              <div className="mc-header-left">
                <div className="mc-header-left-secondary" onClick={()=>{
                  navigate('/customer/persona/list')
                }}>
                  <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                </div>
                <Flex align='center' className="mc-header-left-content">
                  <div style={{marginRight:"4px"}}>客户细分：High-value</div>
                  {/* <WarningTag text='草稿' /> */}
                </Flex>
              </div>
              <Flex gap={12} align='center' >
                <DefaultButton icon={<AddIcon className='font-16' />} text="添加细分" />
                <ButtonDropdown menu={{items:controlsItems}} text="其它操作" />
                <PrimaryButton text="使用细分" />
              </Flex>
            </div>
            <div className='mc-layout-main'>
                <div className='mc-layout-content'>
                  <ScreeningConditionCard />
                  <CustomerListCard />
                </div>
            </div>
            {/* <Divider/>
            <div className='mc-footer'>
                <Button type='primary' onClick={async ()=>{
                }}>创建</Button>
            </div> */}
          </div>
        </div>
      </Scoped>
  )
}

export default SubdivideAdd

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;

            display: flex;
            justify-content: space-between;
            align-content: center;
    
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
    
                &-content {
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
        }
        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px

        }
    }
}
`