import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex, message, Modal, Select, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import accountManagement from "@/store/shops/accountManagementStore";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { history, useModel,useIntl } from '@umijs/max';
import { delLoginRecord, logout } from "@/services/y2/api";
import cookie from 'react-cookies'
import { stringify } from "querystring";


interface DataType {
    key: string;
    os: string;
    browser: string;
    time:string;
    address: string;
}

function LoginDevice() {

    const [modal, contextHolder] = Modal.useModal();

    const confirm = (record) => {
        modal.confirm({
          title: '确认要登出此设备吗？',
          icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
          content: '登出此设备后，此设备再次登录需重新输入账号和密码。',
          centered: true,
          okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
          okText: '确认',
          cancelText: '取消',
          onOk() {
            console.log(record.id)
            delLoginRecord(record.id).then(res=>{
                console.log(res)
                res.code == 0 && message.success("移除成功")

                const newData = [...data]
                newData.splice(newData.findIndex(item => item.id === record.id), 1);
                setData(newData)
            })
          }
        });
    };

    const confirmCurrent = () => {
        modal.confirm({
          title: '确认要登出当前设备吗？',
          icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
          content: '登出当前设备后，您需要重新输入账号和密码进行登录。',
          centered: true,
          okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
          okText: '确认',
          cancelText: '取消',
          async onOk() {
            // 退出登录 -- 清除缓存
            sessionStorage.removeItem("domain");
            await logout();
            let test = window.location.hostname == "localhost" ? "localhost" : window.location.hostname.slice(window.location.hostname.indexOf("."))
            cookie.remove("token",{domain:test,path:"/"})
            const { search, pathname } = window.location;
            const urlParams = new URL(window.location.href).searchParams;
            /** 此方法会跳转到 redirect 参数所在的位置 */
            const redirect = urlParams.get('redirect');
            // Note: There may be security issues, please note
            if (window.location.pathname !== '/user/signIn' && !redirect) {
                history.replace({
                    pathname: '/user/signIn',
                    search: stringify({
                        redirect: pathname + search,
                    }),
                });
            }
          },
        });
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '设备/IP',
            dataIndex: 'os',
            key: 'os',
            render: (value,record) => <>
                <div className="table-item">
                    {record.os}上的{record.browser}
                    {record.key == "0" && <span className="font-12">当前</span>}
                    {/* {record.key} */}
                    
                </div>
            </>,
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'age',
            render: (value,record) => <>
                <div>{dayjs(value*1000).format("YYYY-MM-DD HH:mm:ss")}</div>
            </>,
        },
        {
            title: '地点',
            dataIndex: 'address',
            key: 'address',
            render: (value,record) => <>
                {/* <div>...</div> */}
            </>,
        },
        {
            title: '状态',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <>
                <SuccessTag text="正常" />
            </>,
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (value,record) => <>
                <Button onClick={()=>record.key == "0"?confirmCurrent:confirm(record)}>移除</Button>
            </>,
        },
    ];

    // const data: DataType[] = [
    //     {
    //       key: '1',
    //       name: '设备/IP',
    //       time: "2025-01-01",
    //       address: '中国 北京市',
    //       controls: "hhh"
    //     },
    //     {
    //       key: '2',
    //       name: 'Windows上的Edge',
    //       time: "2025-01-01",
    //       address: '中国 上海市',
    //       controls: "hhh",
    //     },
    //     {
    //       key: '3',
    //       name: 'Windows上的Google',
    //       time: "2025-01-11",
    //       address: '中国 深圳市',
    //       controls: "hhh",
    //     },
    // ];
    const [data,setData] = useState([])

    useEffect(()=>{
        console.log("loginRecord",accountManagement.loginRecord)
        if(accountManagement.loginRecord!==null && accountManagement.loginRecord.length!==0){
            console.log(accountManagement.loginRecord)
            const newData = accountManagement.loginRecord.map((item:any,index:string)=>{
                console.log(item)
                return {
                    key:index,
                    id:item.id,
                    os:item.os,
                    browser:item.browser,
                    time:item.create_time,
                    status:item.status,
                    addressIp:item.ip_address,
                }
            })
            setData(newData)
        }
    },[])
    
    return (
        <Scoped>
            <Card>
                <div className="color-242833">已登录过的设备</div>
                <div className="font-12 color-7A8499">仅记录最近10条的设备登录情况</div>
                <Divider className="divider" />
                <div>
                    <Table<DataType> columns={columns} dataSource={data} pagination={false} />
                </div>
            </Card>
            {/*  */}
            {contextHolder}
        </Scoped>
    )

}

export default LoginDevice;

const Scoped = styled.div`
    margin-bottom: 20px;

    .divider{
        margin:20px 0;
    }

    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
    .table-item{
        span{
            margin-left: 8px;
            padding: 1px 8px;
            background-color: #f0f3f9;
            border: 1px solid #d7dbe7;
            border-radius: 999px;
        }
    }
`
