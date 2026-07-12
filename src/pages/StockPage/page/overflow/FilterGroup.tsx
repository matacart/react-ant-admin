import DefaultSelect from "@/components/Select/DefaultSelect";
import MySelect from "@/components/Select/MySelect";
import { Flex } from "antd";
import { useState } from "react";

function FilterGroup() {

    const [location, setLocation] = useState("0");
    const [dateRange, setDateRange] = useState("0");


    const locationOptions = [
        {
            label:"默认地点",
            value:"0"
        },
        {
            label:"发货地点1",
            value:"1"
        },
    ];

    const dateRangeOptions = [
        {
            label:"全部",
            value:"0"
        },
        {
            label:"过去7天",
            value:"7"
        },
        {
            label:"过去15天",
            value:"15"
        },
        {
            label:"过去30天",
            value:"30"
        }
    ];

    const handleLocation = (value: string) => {
        setLocation(value);
    }

    const handleDateRange = (value: string) => {
        setDateRange(value);
    }


  return (
    <Flex align="center" gap={20}>
        <Flex align="center" gap={8}>
            地点<DefaultSelect options={locationOptions} value={location} onChange={handleLocation} placeholder="请选择" style={{width:"220px"}} />
        </Flex>
        <Flex align="center" gap={8} >
            日期范围<DefaultSelect options={dateRangeOptions} value={dateRange} onChange={handleDateRange} placeholder="请选择" style={{width:"220px"}} />
        </Flex>
    </Flex>
  )
}


export default FilterGroup;
