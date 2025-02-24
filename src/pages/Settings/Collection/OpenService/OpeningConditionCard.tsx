import { Card, Flex, Space, Table, TableProps } from "antd";
import styled from "styled-components";


interface DataType {
    key: string;
    name: string;
    information: string[];
    paymentMethod: string[];
}

function OpeningConditionCard(){

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '公司所在国家/地区',
            dataIndex: 'name',
            key: 'name',
            width:150,
            render: (text) => <div>{text}</div>,
        },
        {
            title: '需要提交的资料',
            dataIndex: 'information',
            key: 'information',
            width:450,
            render: (text) => <div>
                {text.map((item:string)=>(
                    <div>{item}</div>
                ))}
            </div>,
        },
        {
            title: '支持的支付方式',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            width:280,
            render: (text) => <div>
                {text.map((item:string)=>(
                    <div>{item}</div>
                ))}
            </div>,
        },
        {
          title: '操作',
          key: 'action',
          width:120,
          render: (_, record) => (
            <Space size="middle">
              <a>了解更多</a>
              <a>开通</a>
            </Space>
          ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: '中国香港',
            information: [
                "1. 商业登记证（BR)",
                "2. 董事的身份信息（身份证，护照等身份证明文件）",
                "3. 最终受益人身份信息（身份证，护照等身份证明文件）",
                "4. 香港主体的港币银行账户证明文件：如开户证明，银行回执，水单等。（可以是在第三方支付机构开通的虚拟账户，如空中云汇，万里汇等）",
            ],
            paymentMethod: [
                "1. 借记卡/信用卡(支持多币种)：Visa, Master Card, American Express, Diner club, Discover, JCB, UnionPay",
                "2. Apple pay",
                "3. Google Pay",
                "4. Alipay",
                "5.Wechatpay",
                "6. FPS",
            ],
        },
        {
            key: '2',
            name: '美国',
            information: [
                "1. 美国公司注册文件（如：Artical of Incorporation)",
                "2. EIN Verification letter",
                "3. 控制或授权人：身份文件（身份证，护照，驾照等），SSN/ITIN",
                "4. 最终受益人身份信息（身份证，护照等身份证明文件）",
                "5.美国主体的美元银行账户证明文件：如开户证明，银行回执，水单等。（可以是在第三方支付机构开通的虚拟账户，如空中云汇，万里汇等）",
            ],
            paymentMethod: [
                "1. 借记卡/信用卡：Visa, Master Card, American Express, JCB, UnionPay",
                "2. Apple pay",
                "3. Google Pay",
            ],
        },
        {
            key: '3',
            name: '英国',
            information: [
                "1. 英国公司注册机构COMPANIES HOUSE签发的公司文件（公司注册地址不可以是PO BOX地址，公司的状态不可以是休眠状态）",
                "2. 最终受益人身份信息（身份证，护照等身份证明文件）",
                "3. 英国主体的英镑银行账户证明文件：如开户证明，银行回执，水单等。（可以是在第三方支付机构开通的虚拟账户，如空中云汇，万里汇等）",
            ],
            paymentMethod: [
                "1. 借记卡/信用卡(支持多币种)：Visa, Master Card, American Express, UnionPay",
                "2. Apple Pay",
                "3. Google Pay"
            ],
        },
        {
            key: '4',
            name: '澳洲',
            information: [
                "1. ASIC注册证",
                "2. 董事的身份信息（身份证，护照等身份证明文件）",
                "3. 最终受益人身份信息（身份证，护照等身份证明文件）",
                "4. 澳洲主体的澳元银行账户证明文件：如开户证明，银行回执，水单等。（可以是在第三方支付机构开通的虚拟账户，如空中云汇，万里汇等）",
            ],
            paymentMethod: [
                "1. 借记卡/信用卡：Visa, Master Card, American Express",
                "2. Apple Pay",
                "3. Google Pay",
                "4. Zip",
                "5. Afterpay",
            ],
        },
        {
            key: '5',
            name: '新加坡',
            information: [
                "1. ACRA注册证",
                "2. 最终受益人身份信息（身份证，护照等身份证明文件）",
                "3. 新加坡主体的新币银行账户证明文件：如开户证明，银行回执，水单等。（可以是在第三方支付机构开通的虚拟账户，如空中云汇，万里汇等）",
            ],
            paymentMethod: [
                "1. 借记卡/信用卡：Visa, Master Card, American Express, JCB",
                "2. Apple Pay",
                "3. Google Pay",
                "4. Grabpay",
                "5. Paynow",
                "6. Atome",
            ],
        },
    ];

    return (
        <Scoped>
            <Card>
                <div className="font-20 color-242833 font-w-600 title">MataCart Payments 开通条件</div>
                <div className="color-7A8499 desc">开通 MataCart Payments 需具备 6个月历史交易记录（目前 MataCart Payments 只接受有跨境经验的卖家申请，因此需要提供 Paypal 或者其他第三方支付的数据，也可以提供亚马逊平台的经营数据，查看历史交易记录<a>示例</a>。</div>
                <div className="table-box">
                    <Table<DataType> columns={columns} dataSource={data} pagination={false} />
                </div>
                <div className="color-7A8499 annotation-box">
                    <div>注释：</div>
                    <div>1. 最终受益人是指直接或者间接持股25%及以上的自然人。</div>
                    <div>2.以上资料为必须提供的基础资料，风控会根据业务情况要求提供其他一些资质文件</div>
                </div>
                <div className="font-20 color-242833 font-w-600 title">在线注册海外公司</div>
                <div className="color-7A8499 desc">如果有需要，可以通过以下方式注册海外公司</div>
                <div className="registration-method-box">
                    <div>
                        <Flex justify="space-between">
                            <div>
                                <img style={{height:"20px"}} src="https://cdn.myshopline.com/pay/fe-prod/kyc3/assets/IngStart-BAkA0SxJ.webp" />
                            </div>
                            <div><a>了解更多</a></div>
                        </Flex>
                        <div style={{padding:"8px"}} className="color-7A8499">Ingstart拥有一支国际认可的会计师、律师、财务、高级秘书顾问团队，为客户提供全球公司注册、银行开户、年审、税务服务、合规服务等商业咨询，致力于打造一站式企业配套服务的海外商务服务。</div>
                    </div>
                </div>
            </Card>
        </Scoped>
    )
}

export default OpeningConditionCard;

const Scoped = styled.div`
    margin-bottom: 20px;
    .title{
        margin-bottom: 10px;
    }
    .desc{
        margin-bottom: 12px;
    }
    .table-box{
        border: 1px solid #eef1f6;
        border-radius: 4px;
        border-bottom: none;
    }
    .annotation-box{
        margin-top: 12px;
        margin-bottom: 24px;
    }
    .registration-method-box{
        padding: 24px;
        border: 1px solid rgb(215 219 231);
        border-radius: 4px;
    }
`