
import { Button } from 'antd';
import { styled } from 'styled-components';



export default function BindCard(){

    return (
        <Scoped>
            <div className='noCardTip'>尚未绑定银行卡</div>
            <Button type="primary">
                添加银行卡
            </Button>
            <div className='supportCardPanelWithEmpty'>
                <div className='typography-paragraph-3'>
                    目前支持的银行卡类型
                </div>
                <span className="supportCardImgItem visa">

                </span>
                <span className="supportCardImgItem master">

                </span>
                <span className="supportCardImgItem amex">

                </span>
            </div>
        </Scoped>
    )

}


const Scoped = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 40px 0;
background: #f7f8fb;
border-radius: 6px;
width:100%;
min-width:200px;
.noCardTip{
    color: #7a8499;
    line-height: 20px;
    margin-bottom: 12px;
}
.supportCardPanelWithEmpty{
    display: flex;
    align-items: center;
    margin-top: 20px;
    .supportCardImgItem{
        width: 38px;
        min-width: 38px;
        height: 24px;
        margin-right: 4px;
        background-size: 100% 100%;
        &:first-of-type{
            margin-left: 12px;
        }
    }
    .visa{
        background-image: url(https://cdn.myshopline.com/sl/admin/ec2-shopline-admin-subscription/20240611151750684/imgs/visa.fbcad.svg) !important;
    }
    .master{
        background-image: url(https://cdn.myshopline.com/sl/admin/ec2-shopline-admin-subscription/20240611151750684/imgs/master.6ca08.svg) !important;
    }
    .amex{
        background-image: url(https://cdn.myshopline.com/sl/admin/ec2-shopline-admin-subscription/20240611151750684/imgs/amex.eb824.svg) !important;
    }
}
`