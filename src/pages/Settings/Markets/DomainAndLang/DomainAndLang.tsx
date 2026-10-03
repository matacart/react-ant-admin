import { getMarketConfigV2 } from "@/services/y2/apiSaleMarket";
import { useParams } from "@umijs/max";
import { useEffect } from "react";

function DomainAndLang() {

    const { marketId="", langId="" } = useParams()

    useEffect(() => {
        getMarketConfigV2({
            marketId: marketId,
            languages_id: langId,
        })
    }, [])

    return (
        <>
            <h1>市场域名和语言配置</h1>
        </>
    )
}

export default DomainAndLang;