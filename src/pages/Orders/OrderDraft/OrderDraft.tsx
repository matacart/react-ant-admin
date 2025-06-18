
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import OrderDraftList from './OrderDraftList/OrderDraftList';
import { getOrderList } from '@/services/y2/order';
import orderDraftList from '@/store/order/orderDraftList';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import BlankPage from './BlankPage';
import { getOrderDraftList } from '@/services/y2/api';
  
export default function OrderDraft() {

  const [isSkeleton,setIsSkeleton] = useState(true)

  const [isBlank,setIsBlank] = useState(true)

  useEffect(()=>{

    // ----
    getOrderDraftList().then(res=>{
      orderDraftList.setOrderDraftList(res.data);
      (res.data.length && res.data.length) > 0 ? setIsBlank(false) : setIsBlank(true);
    }).catch(err=>{
      console.error('Error fetching data:', err);
    }).finally(()=>{
      setIsSkeleton(false)
    })
  },[])

  return (
    <Scoped>
      {isSkeleton?<SkeletonCard />:<>
        {isBlank?<BlankPage />:<OrderDraftList />}
      </>}
    </Scoped>
  )
}

const Scoped = styled.div`
  


`


