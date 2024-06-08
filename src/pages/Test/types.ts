import { UploadProps } from 'antd/lib/upload';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { ReactNode } from 'react';

export type Props = {
  onChange: (params: { fileList: UploadFile[] }) => void;
  children?: ReactNode;
} & UploadProps

type SortableParams = {
  props: Omit<Props, 'onChange'>;
  onPreview: (file: UploadFile) => void;
  onRemove: (file: UploadFile) => void | boolean;
}

export type SortableItemParams = {
  item: UploadFile;
} & SortableParams

export type SortableListParams = {
  onChange: (info: UploadChangeParam) => void;
  items: UploadFile[];
} & SortableParams



/* 拖动的时候的样式 */
.SortableHelper {
    box-shadow: rgba(0, 0, 0, 0.075) 0 1px 6px, rgba(0, 0, 0, 0.075) 0 1px 4px;
    background-color: lightgreen;
 }
