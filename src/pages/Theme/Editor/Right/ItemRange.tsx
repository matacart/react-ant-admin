import MyInput from "@/components/Input/MyInput"
import { useIntl } from "@umijs/max";
import { Flex, Slider } from "antd"

function ItemRange({item}:{item:any}){

    const intl = useIntl();

    return (
        <Flex gap={20}>
            <Slider
                // defaultValue={item.default}
                // value={componentsData[item.id]?.value ?? undefined}
                style={{flex:1}}
                min={item?.min}
                max={item?.max}
                onChange={async (value:number)=>{
                    
                }}
            />
            {/* suffix={ item.unit && intl.formatMessage({id: item.unit})} defaultValue={item.default} */}
            <MyInput style={{ width: "80px",height:"36px" }} suffix={ item?.unit && intl.formatMessage({id: item.unit})} value={""}  />
        </Flex>
    )
}

export default ItemRange