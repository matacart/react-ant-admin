import MySelect from "@/components/Select/MySelect";
import { getThemeVersions } from "@/services/y2/api";
import editor from "@/store/theme/editor";
import { history, useSearchParams } from "@umijs/max";
import { Flex } from "antd";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Option {
    value: string;
    label: string;
}

function VersionSelect() {

    const [options,setOptions] = useState<Option[]>([]);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const title = searchParams.get("title");
    const templateName = searchParams.get("templateName") || "";

    const [loading,setLoading] = useState(false);

    const debouncedVersion = debounce(() => {
        setLoading(true);
        getThemeVersions({
            templateId:editor.templateInfo?.themeInfo?.id || "",
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
        <MySelect options={options} value={editor.versionId} onChange={(value)=>{
            history.push(`/theme/editor/${editor.templateInfo.themeInfo.id}/${value}/${editor.languagesId}/${editor.mode}/?templateName=${templateName}&title=${title}`)
        }} />
    </Flex>
}

const Scoped = styled.div`
   
`;


export default VersionSelect;
