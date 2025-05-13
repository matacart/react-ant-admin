import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getRandomColor } from './utils'
import { IFlattenedItem } from '@/store/channel/navList/itemsStore'

export default function SortableItem(props: { item: IFlattenedItem }) {
  const { item } = props
  const { ancestorIds } = item
  const ancestorIdsLength = item.ancestorIds?.length || 0

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id, data: { ancestorIds } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    padding: '0 8px',
    margin: '8px 4px',
    background: 'white',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    color: getRandomColor(item.id),
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p style={{ paddingLeft: `${ancestorIdsLength * 20}px` }}>
        文档 {item.id}
      </p>
    </div>
  )
}