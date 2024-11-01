import type { CollapseProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
export default function Collapse({ items }: {
    items: CollapseProps['items']
}) {

    console.log('111111111111212312313')
    console.log(items)
    
    return (
        <>
            {items?.map((item, index) => (
                <>
                    <div className="header" style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div className="title">{item.label}</div>
                        <DownOutlined />
                    </div>
                </>
            ))}
        </>
    )
}