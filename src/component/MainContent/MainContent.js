import { Row, Col } from 'antd';
import ContentTab from '../ContentTab/ContentTab';

import './MainContent.scss';

const MainContent = () => {
    return (
        <div className="mainContent">
            <ContentTab />

            <Row className="">
                <Col className="LeftButton">
                    <Row>
                        <Col></Col>
                    </Row>
                </Col>
                <Col className="RightButton">
                    <Row>
                        <Col></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default MainContent;
