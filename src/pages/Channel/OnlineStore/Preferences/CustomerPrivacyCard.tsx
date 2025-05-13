import MinDefaultTag from "@/components/Tag/MinDefaultTag";
import { ExportOutlined } from "@ant-design/icons";
import { Card, Checkbox, Divider, Flex, Radio} from "antd";
import styled from "styled-components";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};

function CustomerPrivacyCard() {

    return (
        <Scoped>
            <Card>
                <div className="color-242833">欧盟客户的数据收集限制</div>
                <div className="color-242833 desc">按照欧盟《通用数据保护条例》（GDPR）的规定，必须获得客户的授权才能跟踪其数据。详情了解<a> GDPR协议 <ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></div>
                <div>
                    <Radio.Group
                        style={style}
                        // onChange={(e)=>setAccountVersion(e.target.value)}
                        // value={accountVersion}
                        options={[
                            {
                                value: 1,
                                label: (
                                    <div>
                                        <div className="color-474F5E">默认收集</div>
                                        <div className="color-7A8499">不用征得客户同意收集数据，这可能不符合GDPR的规定，但对分析或营销数据没有影响。</div>
                                    </div>
                                ),
                            },
                            {
                                value: 2,
                                label: (
                                    <Flex vertical>
                                        <div className="color-474F5E">征得同意前部分收集</div>
                                        <div className="color-7A8499">在征得客户同意前收集数据，并且不允许进行营销数据的收集。</div>
                                    </Flex>
                                ),
                            },
                            {
                                value: 3,
                                label: (
                                    <Flex vertical>
                                        <Flex className="color-474F5E" align="center" gap={12}>
                                            <div>征得同意后收集</div>
                                            <MinDefaultTag text="推荐" />
                                        </Flex>
                                        <div className="color-7A8499">在征得客户同意前不会收集数据，这可能符合GDPR的规定，但可能对分析或营销数据有影响。</div>
                                    </Flex>
                                ),
                            }
                        ]}
                    />
                </div>
            </Card>
        </Scoped>
    )
}

export default CustomerPrivacyCard

const Scoped = styled.div`
    margin-bottom: 20px;
    .desc{
        margin-top: 8px;
        margin-bottom: 20px;
    }
    .ant-radio{
        position: relative;
        top: -10px;
    }
`
