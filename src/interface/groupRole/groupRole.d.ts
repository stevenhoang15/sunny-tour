export interface tableGroupRoleDataType {
  id: string;
  name: string;
  code: string;
  idRoles?: string[];
  nameVaiTro: string[];
}

export interface createEditType {
  id?: string;
  name: string;
  code: string;
  idRoles: string;
  codeVaiTro?: string[];
}

export interface searchGroupRoleData {
  name?: string;
  code?: string;
}
