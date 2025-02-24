import TinyMce from "@/components/MCE/TinyMce";
import { DownOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Dropdown, Flex, MenuProps, Space } from "antd";
import { useState } from "react";
import styled from "styled-components";


const JapaneseTemplate = `
    <p class="c4 c6"><span class="c12">特定商取引法に基づく表記</span></p><p class="c0 c4 c5 c9"><br></p><ol class="c1 lst-kix_list_1-0 start" start="1"><li class="c0 c3 li-bullet-0"><span class="c7">事業者の名称</span></li></ol><p class="c0 c4"><span class="c2">［お客様の氏名又は（法人の場合）貴社の法人名称を記載してください。］</span></p><p class="c0 c4 c5"><br></p><ol class="c1 lst-kix_list_1-0" start="2"><li class="c0 c3 li-bullet-0"><span class="c7">代表取締役又は事業責任者の氏名</span></li></ol><p class="c0 c4"><span class="c2">［代表取締役又は責任者の氏名を記載してください。］</span></p><p class="c0 c4 c5"><br></p><ol class="c1 lst-kix_list_1-0" start="3"><li class="c0 c3 li-bullet-0"><span class="c7">住所</span></li></ol><p class="c0 c4"><span class="c2">［住所を記入してください。］</span></p><p class="c0 c4 c5"><br></p><ol class="c1 lst-kix_list_1-0" start="4"><li class="c0 c3 li-bullet-0"><span class="c7">電話番号</span></li></ol><p class="c0 c4"><span class="c2">［番号を記入してください。］</span></p><p class="c0 c5"><br></p><ol class="c1 lst-kix_list_1-0" start="5"><li class="c0 c3 li-bullet-0"><span class="c7">メールアドレス</span></li></ol><p class="c0 c4"><span class="c2">［メールアドレスを挿入してください］</span></p><p class="c0 c5"><br></p><ol class="c1 lst-kix_list_1-0" start="6"><li class="c0 c3 li-bullet-0"><span class="c7">商品の販売価格又はサービスの対価</span></li></ol><p class="c0 c4"><span class="c2">各商品ごとに税込価格で表示</span></p><p class="c0 c4 c5"><br></p><ol class="c1 lst-kix_list_1-0" start="7"><li class="c0 c3 li-bullet-0"><span class="c7">商品の送料</span></li></ol><p class="c0 c4"><span class="c2">［送料を記入してください。］</span></p><p class="c0 c5"><br></p><ol class="c1 lst-kix_list_1-0" start="8"><li class="c0 c3 li-bullet-0"><span class="c7">商品代金又はサービスの対価の支払時期及び方法</span></li></ol><p class="c0 c4"><span class="c2">［</span><span class="c11">支払い方法、支払い時期をご記入ください</span><span class="c2">］</span></p><p class="c0 c4"><span class="c2">支払時期は、クレジットカード会社又は決済機関により異なるため、クレジットカード会社又は決済機関にお問い合わせください。</span></p><p class="c0 c4 c5"><br></p><ol class="c1 lst-kix_list_1-0" start="9"><li class="c0 c3 li-bullet-0"><span class="c7">商品の引渡時期若しくは権利の移転時期又は役務の提供時期</span></li></ol><p class="c0 c4"><span class="c2">［ご記載ください。］</span></p><p class="c0 c4 c5"><br></p><ol class="c1 lst-kix_list_1-0" start="10"><li class="c0 c3 li-bullet-0"><span class="c7">返品ポリシー</span></li></ol><p class="c0 c5"><br></p><p class="c0"><span class="c11">商品の返品、交換はお客様のもとに商品到着後、7日以内にお申し出いただいた場合、当社の規定に基づきお受けいたします。</span></p><p class="c0 c5"><br></p><p class="c0"><span class="c2">返品の対象となるには、商品が未使用な状態で、商品タグが付いており、元のパッケージの状態で、商品を受け取った時と同じ状態である必要があります。領収書又は購入証明書も必要となります。</span></p><p class="c0 c5"><br></p><p class="c0"><span class="c2">返品を開始するには、［連絡先のメールアドレスを指定してください］にご連絡ください。返品が承認された場合は、返送ラベルと、荷物の送付方法と送付先の指示をお送りします。先に返品要求をご連絡頂いていない商品の返品は受け付けておりません。</span></p><p class="c0 c5"><br></p><p class="c0"><span class="c2">返品に関するご質問はいつでも［連絡先のメールアドレスをご記入ください］までお問い合わせください。</span></p><p class="c0 c5"><br></p><p class="c0"><span class="c2">損傷等の問題がある場合</span></p><p class="c0"><span class="c2">荷物をお受け取り次第、商品をご確認の上、不良品、破損品、又は間違った商品が届いた場合は直ちにご連絡ください。当社が問題を評価し、ご対応を検討することができます。</span></p><p class="c0 c5"><br></p><p class="c0"><span class="c2">返品不可の商品</span></p><p class="c0"><span class="c2">生鮮品（食物、花、植物等）、オーダーメイド品等の特注品、美容品等の身の回り品は返品できません。危険物、引火性液体、ガス類の返品も受け付けておりません。ご不明な点やご不明な点がございましたらご連絡ください。</span></p><p class="c0 c5"><br></p><p class="c0"><span class="c2">また、セール品やギフトカードの返品はお受けできません。</span></p><p class="c0 c5"><br></p><p class="c0"><span class="c2">交換</span></p><p class="c0"><span class="c2">商品の交換ではなく、お客様のお持ちの商品を返品し、返品が受諾されたうえで、新しい商品を別途購入する方がより速い手続になります。</span></p><p class="c0 c5"><br></p><p class="c0"><span class="c2">返金</span></p><p class="c0"><span class="c2">返品商品を受け取り、検品した後、返金が承認されるかどうかをお知らせします。承認された場合には、元の支払方法のとおりに自動的に返金されます。お客様の銀行やクレジットカード会社においても、返金処理に時間がかかる場合があることはご了承ください。</span></p>
`
const englishTemplate = `
    <div class="lake-content"><p id="u474a0728" class="ne-p"><span class="ne-text">We have a 30-day return policy, which means you have 30 days after receiving your item to request a return. <br><br></span><span class="ne-text">To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase. <br><br></span><span class="ne-text">To start a return, you can contact us at [please indicate your contact email address]. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted. <br><br></span><span class="ne-text">You can always contact us for any return question at [please indicate your contact email address].<br><br></span><strong><span class="ne-text">Damages and issues</span></strong><span class="ne-text"> <br></span><span class="ne-text">Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.<br><br></span><strong><span class="ne-text">Exceptions / non-returnable items</span></strong><span class="ne-text"> <br></span><span class="ne-text">Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item. <br><br></span><span class="ne-text">Unfortunately, we cannot accept returns on sale items or gift cards.<br><br></span><strong><span class="ne-text">Exchanges</span></strong><span class="ne-text"> <br></span><span class="ne-text">The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.<br><br></span><strong><span class="ne-text">Refunds</span></strong><span class="ne-text"> <br></span><span class="ne-text">We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.</span></p></div>
`

function RefundPolicy() {

    const [refundPolicyText,setRefundPolicyText] = useState("")

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div onClick={()=>setRefundPolicyText(englishTemplate)}>创建英文模版</div>
          ),
        },
        {
          key: '2',
          label: (
            <div onClick={()=>setRefundPolicyText(JapaneseTemplate)}>创建日文模版</div>
          ),
        },
    ];
    

    return (
        <Scoped>
            <Card>
                <div className="color-242833 font-16 font-w-600" style={{ marginBottom: 16 }}>退款政策</div>
                <TinyMce refundPolicyText={refundPolicyText} />
                <div style={{marginTop:8}}>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Button style={{height:36}}>
                            <Space>
                                替换为模板
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
            </Card>
        </Scoped>
    )
}

export default RefundPolicy

const Scoped = styled.div`
    /* margin-bottom: 20px; */
`
