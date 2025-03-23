export default interface EntityType {
  id: string;
}

export interface Response<T = any> {
  data: T;
  status?: boolean;
  message?: string;
  errors?: string[] | null;
}

export interface ResponsePageList<T = any> {
  items: T;
  pageIndex?: int;
  pageSize?: int;
  totalCount?: int;
  totalPage?: int;
}

export interface ResponsePageInfo {
  pageIndex?: int;
  pageSize?: int;
  totalCount?: int | 0;
  totalPage?: int | 0;
}

export interface SearchBase {
  pageIndex?: int | 1;
  pageSize?: int | 20;
}
export interface DropdownOption {
  text: string;
  value: string;
  label?: string;
  note?: string;
  selected?: boolean;
  disabled?: boolean;
}

export interface DropdownOptionAntd {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}
export interface DropdownTreeOptionAntd {
  value: string;
  title: string;
  children: DropdownTreeOptionAntd[];
}

export interface DataToSend {
  IdFile: string; // Id của file (giả sử là chuỗi)
  collection: ColumnConfig[]; // Cấu hình cột, là một mảng các đối tượng
}
