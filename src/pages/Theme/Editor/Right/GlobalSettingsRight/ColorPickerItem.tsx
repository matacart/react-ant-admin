import { useIntl } from "@umijs/max";
import { ColorPicker, Flex } from "antd";
import { memo } from "react";

const ColorPickerItem = memo(({settingsData,setSettingsData,res}:any)=>{

    const intl = useIntl();

    const handleColorChange = (newColor: any) => {
        const hexColor = newColor.toHexString(); // 转为十六进制字符串

        // 使用函数式状态更新确保获取最新状态
        setSettingsData((prevSettingsData: any) => {
            const updatedSettingsData = {
                ...prevSettingsData,
                [res.id]: {
                    ...prevSettingsData[res.id],
                    value: hexColor
                }
            };
            return updatedSettingsData;
        });
    };

    return (
        <div className="item" key={res.id}>
            <Flex gap={8} align="center">
                <div>
                    <ColorPicker value={settingsData[res.id]?.value ?? res.default} onChange={handleColorChange}>
                        <div className="color-picker" style={{backgroundColor:settingsData[res.id]?.value ?? res.default}}></div>
                    </ColorPicker>
                </div>
                <div>
                    <div>{intl.formatMessage({id: res.label})}</div>
                    <div style={{height:"18px"}} className="font-12 color-7A8499">{settingsData[res.id]?.value ?? res.default}</div>
                </div>
            </Flex>
            {res.info && <div style={{marginTop:"4px"}} className="color-7A8499 font-12">{intl.formatMessage({id: res.info})}</div>}        
        </div>
    )
},(prevProps, nextProps)=>{
    // 自定义比较函数，仅当相关属性变化时才重新渲染
    return (
        prevProps.settingsData[prevProps.res.id]?.value === nextProps.settingsData[nextProps.res.id]?.value
    );
})

export default ColorPickerItem;
