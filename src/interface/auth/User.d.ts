import dayjs from "dayjs";
import { SearchBase } from "../general";
import { MenuDataType } from "../menu/menu";

export interface LoginType {
  username?: string;
  password?: string;
}

export interface UserType {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  gender?: number;
  picture?: string | null;
  listRole?: string[];
  donViId?: string | null;
  isSSO?: boolean | null;
  isHasRole?: boolean | null;
  anhDaiDien?: string | null;
  tenDonVi_txt?: string | null;
  menuData?: MenuDataType[] | null;
}

export interface LoginResponseType {
  user?: UserType;
  token?: string | "";
  refreshToken?: string;
  expire?: string;
  isSSO?: boolean;
}

export interface searchUserData extends SearchBase {
  name?: string;
  email?: string;
  userName?: string;
  diaChi?: string;
  departmentId?: string;
}

export interface tableUserDataType {
  id?: string;
  userName?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  diaChi?: string | null;
  ngaySinh?: any | null;
  lockoutEnabled?: boolean;
  donViId?: string | null;
  gender?: string;
  picture?: string | null;
  tenDonVi_txt?: string | null;
  gioiTinh_txt?: string | null;
  vaiTro_response?: string | null;
  vaiTro_txt_response?: string[];
  vaiTro?: string[];
  listPhongBan: string[];
  groupRole_response?: string[];
  groupRole_txt?: string;
  departmentId?: string;
  department_txt?: string;
}

export interface createEditType {
  id?: string;
  userName: string;
  matKhau?: string;
  name: string;
  email: string;
  vaiTro: string[];
  phoneNumber?: string;
  ngaySinh?: string | dayjs;
  gender?: number;
  diaChi?: string;
}

export interface DataToSend {
  IdFile: string; // Id của file (giả sử là chuỗi)
  collection: ColumnConfig[]; // Cấu hình cột, là một mảng các đối tượng
}

export interface tableConfigImport {
  order: number;
  columnName?: string;
  displayName?: string;
}

export interface ImportResponse {
  data?: tableUserDataType[]; // Thay đổi kiểu dữ liệu tùy thuộc vào kết quả trả về của API
}

export interface tableUserDataTypeTrue {
  name?: string;
  gender: number;
  picture?: string;
  type?: string;
  permissions?: string;
  donViId?: string;
  ngaySinh?: Date;
  diaChi?: string;
  isUpdateNewPass?: boolean;
  isSSO?: boolean;
  id: string;
  email?: string;
  userName?: string;
}
export interface BuocXuLyAndListNhanSuDto {
  listNhanSu: tableUserDataType[];
  idBuocXuLy: string; // GUID thường được sử dụng dưới dạng string
  tenBuocXuLy: string;
}