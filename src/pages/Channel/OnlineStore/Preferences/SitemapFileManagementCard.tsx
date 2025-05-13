import DefaultButton from "@/components/Button/DefaultButton";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Switch, Tooltip} from "antd";
import styled from "styled-components";

function SitemapFileManagementCard() {

    return (
        <Scoped>
            <Card className="card1">
                <Flex justify="space-between" align="center">
                    <div>
                        <Flex align="center">
                            <div>默认Sitemap</div>
                            <Tooltip title="MataCart平台自动生成并维护您的在线商店的 sitemap.xml。每当您添加或删除页面、商品、博客文章等时，会自动更新 Sitemap，这确保了您的网站内容能够及时被搜索引擎发现和索引。 请谨慎关闭它，可能会出现搜索引擎蜘蛛无法通过sitemap爬行，影响您网站在搜索结果中的排名和可见性。">
                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </Flex>
                        <div className="font-12">当前地址：<span className="color-356DFF">https://www.demo.matacard.com/sitemap.xml</span></div>
                    </div>
                    <div>
                        <Switch defaultChecked />
                    </div>
                </Flex>
            </Card>
            <Card className="card2">
                <Flex justify="space-between">
                    <Flex align="center">
                        <div>自定义Sitemap(0/10)</div>
                        <Tooltip title="您可以通过手动创建并上传自己生成的 Sitemap 文件（须为xml格式）到您的网站，而不是依赖于MataCart平台自动生成的 Sitemap，更灵活地管理和控制搜索引擎对您网站的爬行和索引。">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </Flex>
                    <DefaultButton text="上传Sitemap.xml" />
                </Flex>
            </Card>
        </Scoped>
    )
}

export default SitemapFileManagementCard

const Scoped = styled.div`
    margin-bottom: 20px;

    .card2{
        margin-top: 20px;
    }
`
