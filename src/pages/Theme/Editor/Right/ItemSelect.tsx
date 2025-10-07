import MySelect from "@/components/Select/MySelect"

function ItemSelect(){

    return (
        <MySelect style={{height:"36px"}}  onChange={async (value:any)=>{
            
        }} />
    )
}

// options={item.options.map((item:any)=>{
//     return {value:item.value,label:intl.formatMessage({id: item.label})}
// })}

export default ItemSelect