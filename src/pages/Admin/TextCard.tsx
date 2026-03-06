import { Card } from "antd";
import { ReactNode } from "react";
import { Flex, Button } from 'antd'
import { Link } from "@umijs/max"
import DefaultButton from "@/components/Button/DefaultButton";
 
export type ButtonContent={
    text:string,
    url: string
}

export type CardContent = {
    title: string,
    contentText: ReactNode,
    buttonContents: ButtonContent[]
}
    

export default function TextCard(cardContent: CardContent): ReactNode {
    const { title, contentText, buttonContents } = cardContent;
    return (
        <>
            <Card title={title}>
                {contentText}
                <Flex gap="small" wrap style={{
                    marginTop:'20px'
                }}>
                    {
                        buttonContents.map((buttonContent,index)=>{
                            return(
                                <div key={index}>
                                    <Link  to={buttonContent.url}>
                                        <DefaultButton key={index} text={buttonContent.text} />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </Flex>
            </Card>
        </>
    )
}