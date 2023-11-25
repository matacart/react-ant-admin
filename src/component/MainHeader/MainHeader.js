import { Dropdown, Button } from 'antd';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { GoBack } from '../Icon/Icon';
import './MainHeader.scss';

/**
 * 内容区域头部
 *
 */
const MainHeader = ({
    goBack,
    href,
    title,
    uploadText,
    rButtonText,
    rButtonType = 'primary',
    rHref,
}) => {
    const navigate = useNavigate();

    const items = [
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" to="#">
                    本地导入
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link rel="noopener noreferrer" to="#">
                    表格导入
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link rel="noopener noreferrer" to="#">
                    一键搬家
                </Link>
            ),
        },
    ];

    return (
        <div className="pageHeader">
            <div className="titleGroup">
                {goBack && (
                    <Button
                        icon={<GoBack />}
                        onClick={() => {
                            navigate(href);
                        }}
                        style={{
                            width: 36,
                            height: 36,
                            marginRight: 12,
                            backgroundColor: '#EAEDF1',
                        }}
                    />
                )}

                {title && <h2 className="mc-page-header header">{title}</h2>}

                {uploadText && (
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottom"
                        className="uploadGroup"
                    >
                        <Button type="text" icon={<DownloadOutlined />}>
                            {uploadText}
                        </Button>
                    </Dropdown>
                )}
            </div>

            {rButtonText && (
                <Button
                    type={rButtonType}
                    className="rButton"
                    onClick={() => {
                        navigate(rHref);
                    }}
                >
                    {rButtonText}
                </Button>
            )}
        </div>
    );
};

export default MainHeader;
