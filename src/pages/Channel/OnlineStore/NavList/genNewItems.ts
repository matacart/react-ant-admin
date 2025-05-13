import { IFlattenedItem, IItem,itemsStore } from "@/store/channel/navList/itemsStore";

let ActiveItem: IItem | null = null

function findActiveItem(items: IItem[], activeId: string) {
  items.forEach((item) => {
    if (item.id === activeId) {
      ActiveItem = { ...item }
      return
    }
    if (item.children) {
      findActiveItem(item.children, activeId)
    }
  })
}

function insertActiveItem(
  items: IItem[],
  activeId: string,
  activeIndex: number,
  overId: string,
  overIndex: number,
  insertFirst: boolean
): IItem[] {
  let hasOverId = false
  const newItems = items.map((item): IItem & { isActive?: boolean } => {
    if (item.id === activeId) {
      return { ...item, isActive: true } // 标记 active 以便后面 filter
    }
    if (item.id === overId) {
      hasOverId = true
    }
    return {
      ...item,
      children: item.children
        ? insertActiveItem(
            item.children,
            activeId,
            activeIndex,
            overId,
            overIndex,
            insertFirst
          )
        : item.children,
    }
  })

  if (hasOverId && ActiveItem) {
    const overItemIndex = newItems.findIndex((item) => item.id === overId)
    // console.log('overItemIndex', overItemIndex, insertFirst, ActiveItem)
    if (overItemIndex === 0 && insertFirst) {
      newItems.unshift(ActiveItem)
    } else if (overItemIndex > -1) {
      const startIndex =
        activeIndex < overIndex ? overItemIndex + 1 : overItemIndex
      newItems.splice(startIndex, 0, ActiveItem)
    }
  }

  return newItems.filter((item) => !item.isActive)
}

export default function genNewItems(
  items: IItem[],
  flattenedItems: IFlattenedItem[],
  activeId: string,
  overId: string
): IItem[] {
  const activeIndex = flattenedItems.findIndex((i) => i.id === activeId)
  const overIndex = flattenedItems.findIndex((i) => i.id === overId)

  let insertFirst = false
  if (activeIndex < overIndex) {
    const over = flattenedItems[overIndex]
    const nextOver = flattenedItems[overIndex + 1]
    console.log('nextOver', nextOver)
    if (nextOver && nextOver.ancestorIds?.includes(over.id)) {
        console.log('nextOver', nextOver)
        overId = nextOver.id
        insertFirst = true
    }
  }

  // 1. Find the active item
  ActiveItem = null
  findActiveItem(items, activeId)
  if (ActiveItem === null) {
    return items
  }

  // 2. Insert the active item into the new position, and return the new items
  const newItems = insertActiveItem(
    items,
    activeId,
    activeIndex,
    overId,
    overIndex,
    insertFirst
  )

  // 3. Return the new items
  return newItems
}