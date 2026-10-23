import { ConfigProvider, InputNumber, InputNumberProps } from "antd";
import { useEffect, useState } from "react";

interface PriceInputProps extends InputNumberProps {
    // 如果还有其他自定义属性可以加在这里
    isFixed?: boolean;
}

const PriceInput = ({isFixed,onBlur,...props}:PriceInputProps) => {
    
    const [isFocused, setIsFocused] = useState(false);

    return (
        <ConfigProvider
            theme={{
                token: {
                    /* 这里是你的全局 token */
                    borderRadius:4
                },
            }}
        >
            <InputNumber
                style={{ width: '100%',height:"36px" }}
                {...props}
                max="999999999" 
                min="0"
                suffix={(!isFocused && isFixed) ? <span style={{ color: '#bfbfbf', fontSize: 12 }}>已固定</span> : null}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    setIsFocused(false);
                    onBlur?.(e);
                }}
            />
        </ConfigProvider>
    );
};

export default PriceInput;