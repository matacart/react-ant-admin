import NumberInput from "@/components/Input/NumberInput";
import { memo, useEffect, useState } from "react";

type RuleCellProps = {
  currencyCode: string;
  value: string;
  onCommit: (currencyCode: string, value: number) => void;
};

export const RuleCell = memo(function RuleCell({ currencyCode, value, onCommit }: RuleCellProps) {

    const [local, setLocal] = useState<string | number>(value);

    // 外部数据变化（重置 / 重新拉取）时同步
    useEffect(() => {
        setLocal(value);
    }, [value]);

    const handleChange = (val: number) => {
        if (val === undefined || val === null || Number.isNaN(val)) return;
        onCommit(currencyCode, val);
    };

    return (
        <NumberInput
            style={{width: "100%",maxWidth: "300px",height: "36px"}} 
            value={local}
            min={0.01}
            max={1000000}
            onChange={handleChange}
        />
    );
});