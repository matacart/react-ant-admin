import MySelect from "@/components/Select/MySelect";
import { getThemeVersions } from "@/services/y2/api";
import codeEditor from "@/store/theme/codeEditor";
import { Flex } from "antd";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Option {
    value: string;
    label: string;
}

function VersionSelect() {

    const [options,setOptions] = useState<Option[]>([]);

    const [loading,setLoading] = useState(false);

    const debouncedVersion = debounce(() => {
        // 商品分类搜索
        setLoading(true);
        getThemeVersions({
            templateId:codeEditor.templateInfo?.id || "",
            page:1,
            limit:10,
        }).then(res => {
            const newOptions = res.data.map((item:any) => {
                return {
                    value: item.id,
                    label: item.version,
                }
            });
            setOptions(newOptions);
        }).finally(() => {
            setLoading(false);
        });
    }, 300);

    useEffect(()=>{
        debouncedVersion();
    },[]);

    return <Flex align="center">
        <div>版本：</div>
        <MySelect options={options} value={codeEditor.versionId} onChange={(value:string)=>{
            codeEditor.setVersionId(value);
        }} />
    </Flex>
}

const Scoped = styled.div`
   
`;


export default observer(VersionSelect);
