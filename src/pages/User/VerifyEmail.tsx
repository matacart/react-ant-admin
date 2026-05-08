import MyButton from '@/components/Button/MyButton';
import { getVerifyEmailStatus } from '@/services/y2/api';
import { useIntl, useParams } from '@umijs/max';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { history } from '@umijs/max';


export default function VerifyEmail() {

    //国际化
    const intl = useIntl();

    const { message } = App.useApp();

    const searchParams = new URLSearchParams(window.location.search);
    const lang = searchParams.get('lang');
    const token = searchParams.get('token');

    console.log(lang,token);



    const [serverEmail,setServiceEmail] = useState<any>({});

    // 激活客服邮箱
    const activateEmail = () => {
        // activateServiceVerifyEmail().then(res=>{
        //     setServiceEmail(res.data);
        // })
    }
    
    useEffect(() => {
        getVerifyEmailStatus().then(res=>{
            setServiceEmail(res.data);
        })
    }, []);
    // serverEmail?.is_verified
    return (
        <Scoped>
            {true ? <>
                <h3 className='title'>{intl.formatMessage({ id: 'user.verifyEmail.verified' })}</h3>
                <div className='color-7A8499 font-16'>{intl.formatMessage({ id: 'user.verifyEmail.canLogin' }, { email:serverEmail?.service_email || '' })}</div>
                <MyButton type='primary' className='btn font-16 font-w-600' text={intl.formatMessage({ id: 'user.verifyEmail.login' })} onClick={()=>history.push("/")} />
            </>:<>
                <h3 className='title'>{intl.formatMessage({ id: 'user.verifyEmail.title' })}</h3>
                <div className='color-7A8499 font-16'>{intl.formatMessage({ id: 'user.verifyEmail.confirm' }, { email:serverEmail?.service_email || '' })}</div>
                <MyButton type='primary' className='btn font-16 font-w-600' text={intl.formatMessage({ id: 'user.verifyEmail.verify' })} />
            </>}
        </Scoped>
    )
}

const Scoped = styled.div`
    .title{
        font-size: 24px;
        color: #242833;
        margin-bottom: 12px;
    }
    .btn{
        margin-top: 48px;
        width: 100%;
        height: 42px;
    }
`