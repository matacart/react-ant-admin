import styled from "styled-components"

export default function ({icon,price,text,origin,desc}:{
    icon:string,
    price:number,
    text:string
    origin?:number,
    desc?:string,
}) {

    return (
        <Scoped>
            { origin && (
                <div className="introduction-packages__item__charges--previous">
                    {/* {icon+origin+' /'+text} */}
                </div>
            )}
            <div className="currency-component-container">
                <span className="introduction-packages__item__charges--prefix">
                    {icon}
                </span>
                <span className="introduction-packages__item__charges--content">
                    {price}
                </span>
                <span className="introduction-packages__item__charges--suffix">
                </span>
                <span className="introduction-packages__item__charges__period">
                /{text}
                </span>
            </div>
            {
                desc && (
                    <div className="introduction-packages__item__charges--desc">
                        {desc}
                    </div>
                )
            }
        </Scoped>
    )


}

const Scoped = styled.div`
width:100%;
.currency-component-container{
    display: flex;
    justify-content:center;
    margin-bottom:16px;
    .introduction-packages__item__charges{
        &--prefix{
            font-family: 'Roboto';
            color: #00142d;
            font-size: 24px;
            font-style: normal;
            font-weight: 800;
            position: relative;
            top: 2%;
            line-height: 48px;
        }
        &--content{
            font-family: 'Roboto';
            color: #00142d;
            font-size: 40px;
            font-style: normal;
            font-weight: bold;
            -ms-flex-item-align: end;
            align-self: flex-end;
            margin: 0 2px;
            letter-spacing: -0.05em;
            line-height: 150%;
        }
        &--suffix{
            font-family: 'Roboto';
            color: #848e9b;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            -ms-flex-item-align: end;
            align-self: flex-end;
            margin: 0 2px;
            letter-spacing: -0.05em;
            line-height: 50px;
        }
        &__period{
            font-family: 'Roboto';
            color: #848e9b;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            -ms-flex-item-align: end;
            align-self: flex-end;
            margin: 0 2px;
            letter-spacing: -0.05em;
            line-height: 50px;
        }
    }
}

.introduction-packages__item__charges--previous{
    margin-top: 16px;
    display: flex;
    justify-content:center;
    color: #7a8499;
    text-decoration: line-through;
    line-height: 1;
    font-family: 'Roboto';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
}
.introduction-packages__item__charges--desc{
    display: flex;
    justify-content:center;
    color: #7a8499;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin-bottom:4px;
}
`