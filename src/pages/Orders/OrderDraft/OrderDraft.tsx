
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import OrderDraftList from './OrderDraftList/OrderDraftList';
import { getOrderList } from '@/services/y2/order';
import orderDraftList from '@/store/order/orderDraftList';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import BlankPage from './BlankPage';
  
export default function OrderDraft() {

  const [isSkeleton,setIsSkeleton] = useState(true)

  const [isBlank,setIsBlank] = useState(true)

  useEffect(()=>{
    getOrderList(1,50,"","2",1).then(res=>{
      orderDraftList.setOrderDraftList(res.data);
      (res.data.length && res.data.length) > 0 ? setIsBlank(false) : setIsBlank(true);
    }).catch(error => {
      console.error('Error fetching data:', error);
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


