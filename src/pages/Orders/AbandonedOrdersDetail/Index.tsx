import { getAbandonedOrderDetail } from "@/services/y2/ApiAbandonedOrder";
import { useParams } from "@umijs/max";
import { useEffect } from "react";

const Index = () => {

    const { id } = useParams();


    useEffect(()=>{
        getAbandonedOrderDetail({
            languages_id:"2",
            seq:id,
        }).then(res=>{
            console.log(res);
        })
    },[id])


    return (
        <>
            {id}
        </>
    );
};

export default Index;