import DefaultSelect from "@/components/Select/DefaultSelect";
import { Card } from "antd";
import styled from "styled-components";

export default function ErrorPage() {
  return(
    <Scoped>
        <Card>
            <div className="title color-242833"><span className="font-w-600">404</span>错误页面转址选项</div>
            <DefaultSelect
                defaultValue="1"
                style={{ width: 256 }}
                onChange={()=>{}}
                options={[
                    { value: '1', label: '停留在404错误页面' },
                    { value: '2', label: '自动转址至商店首页' },
                ]}
            />
        </Card>
    </Scoped>
    
  );
}

const Scoped = styled.div`
    .title{
        margin-bottom: 8px;
    }
`