import { useMemo, useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  // arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import SortableItem from './SortableItem'
// import { useItemsStore, IFlattenedItem } from '../store/itemsStore'
import { IFlattenedItem, IItem,itemsStore } from "@/store/channel/navList/itemsStore";
import { flatten } from './utils'
import genNewItems from './genNewItems'
import { observer } from 'mobx-react-lite'

const SortableList = ()=>{
//   const items = itemsStore.items
  console.log('items', itemsStore.items)
  const [flattenedItems,setFlattenedItems] = useState(flatten(itemsStore.items as IFlattenedItem[]))
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over == null) return
    if (active.id === over.id) return

    const { ancestorIds: overAncestorIds = [] } = over.data.current || {}
    // const { ancestorIds: activeAncestorIds = [] } = active.data.current || {}
    if (overAncestorIds.includes(active.id)) {
      console.log('Cannot drop item into its descendant')
      return
    }
    console.log('handleDragEnd', active.id, over.id)
    const newItems = genNewItems(
        itemsStore.items,
        flattenedItems,
        active.id.toString(),
        over.id.toString()
    )
    console.log('newItems...', newItems)
    itemsStore.setItems(newItems)
    setFlattenedItems(flatten(itemsStore.items as IFlattenedItem[]))
  }

  if (flattenedItems.length === 0) return null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={flattenedItems}
        strategy={verticalListSortingStrategy}
      >
        {flattenedItems.length &&
          flattenedItems.map((i) => <SortableItem key={i.id} item={i} />)}
      </SortableContext>
    </DndContext>
  )
}

export default observer(SortableList)