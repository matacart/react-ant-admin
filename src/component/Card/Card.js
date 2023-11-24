import { Card as AntdCard, Form, Input, Typography } from 'antd';
import UploadImg from '../../component/UploadImg/UploadImg';

/**
 * 卡片的二次封装
 *
 * @param {{title: ReactNode, name: NamePath, child: ReactNode, extra: ReactNode, headStyle: CSSProperties, bodyStyle: CSSProperties, style: CSSProperties, bordered: boolean, loading:boolean}} props
 *
 */
const Card = ({ props }) => {
    const {
        title = '',
        name = '',
        child = null,
        extra = '',
        headStyle = {
            padding: '0 24px',
            fontWeight: 500,
        },
        bodyStyle = {},
        style = { marginBottom: 20, borderRadius: 6 },
        bordered = false,
        loading = true,
    } = props;

    return (
        <>
            <AntdCard
                title={title}
                name={name}
                extra={extra}
                headStyle={headStyle}
                bodyStyle={bodyStyle}
                bordered={bordered}
                // loading={loading}
                style={style}
            >
                {child}
            </AntdCard>
        </>
    );
};

export default Card;
