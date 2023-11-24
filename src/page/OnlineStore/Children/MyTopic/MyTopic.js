import { Button, Row, Col, Progress } from 'antd';
import './MyTopic.scss';

const MyTopic = () => {
    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    return (
        <div className="myTopicContent">
            <Row className="container">
                <Col className="top" style={{ flex: ' 0 0 300px' }}>
                    <h2 className="title">当前主题</h2>
                    <p className="des">这是当前你向客户展示的店面样式</p>
                </Col>
                <Col className="temp" style={{ flex: '1 1 0%' }}>
                    <Row className="top">
                        <Col className="left">
                            <h3>
                                <span
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Arise 1
                                </span>
                            </h3>
                            <p>
                                <span className="topVersion">
                                    当前版本：1.4.31
                                </span>
                                上次修改时间：2023/11/1010：06
                            </p>
                        </Col>
                        <Col className="btn-group">
                            {/* <Select></Select> */}
                            <Button>设计</Button>
                        </Col>
                    </Row>
                    <div className="tempContainer">
                        <div className="container">
                            <div className="middle-wrap">
                                <div className="item-wrap"></div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row
                className="performanceContainer"
                style={{ marginLeft: '-17px', marginRight: '-17px' }}
            >
                <Col
                    style={{
                        paddingLeft: 17,
                        paddingRight: 17,
                        flex: '1 1 300px',
                    }}
                >
                    <h3 className="title">在线商店速度</h3>
                    <p className="text">
                        该评分显示了你的商店对于访客的加载速度
                    </p>
                </Col>
                <Col
                    style={{
                        paddingLeft: 17,
                        paddingRight: 17,
                        flex: '1 1 0%',
                    }}
                >
                    <Row
                        className="performanceDetail"
                        style={{ marginLeft: -8, marginRight: -8 }}
                    >
                        <Col
                            style={{
                                paddingLeft: 8,
                                paddingRight: 8,
                            }}
                        >
                            <Progress
                                type="dashboard"
                                percent={0}
                                strokeColor={twoColors}
                            />
                        </Col>
                        <Col
                            style={{
                                paddingLeft: 8,
                                paddingRight: 8,
                                flex: '1 1 0%',
                            }}
                        >
                            <div>你的在线商店接入速度平分：</div>
                            <div>为什么无法显示评分？</div>
                            <div>
                                商店速度受已安装的应用、已编辑的主题代码以及图像和视频的大小影响。
                            </div>
                        </Col>
                        <Col style={{ marginLeft: 8, marginRight: 8 }}>
                            <Button>查看报告</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row
                className="performanceContainer boosterContainer"
                style={{ marginLeft: -17, marginRight: -17 }}
            >
                <Col>
                    <h3 className="title">Booster插件</h3>
                </Col>
                <Col
                    style={{
                        paddingLeft: 17,
                        paddingRight: 17,
                        flex: '1 1 0%',
                    }}
                >
                    <div>
                        使用性能优化Booster插件提高你的页面速度和转化率，仅需30S完成配置！
                    </div>
                    <div>
                        <Button></Button>
                    </div>
                </Col>
            </Row>
            <Row className="container">
                <Col style={{ flex: '0 0 300px' }}>
                    <h2 className="title">主题库</h2>
                    <p className="des">管理商店可使用的其他主题</p>
                    <div className="left-actions-btn-container">
                        <Button>上传主题</Button>
                    </div>
                </Col>
                <Col style={{ flex: '1 1 0%' }}>
                    <div className="left"></div>
                    <div className="right">
                        <Button>添加主题</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default MyTopic;
