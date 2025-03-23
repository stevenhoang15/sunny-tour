import {
  searchGroupRoleData,
  tableGroupRoleDataType,
  createEditType,
} from "@/interface/groupRole/groupRole";
import { apiService } from "../index";
import { ResponsePageList, Response } from "@/interface/general";

class GroupRoleService {
  public async getDataByPage(
    searchData: searchGroupRoleData
  ): Promise<Response<ResponsePageList<tableGroupRoleDataType[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<tableGroupRoleDataType[]>>
      >("/GroupRole/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/GroupRole/Create",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        "/GroupRole/Update",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        "/GroupRole/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDropdown(): Promise<Response> {
    try {
      const res = await apiService.get<Response>("/GroupRole/GetDropdown/");
      return res.data;
    } catch (er) {
      throw er;
    }
  }
}

export const groupRoleService = new GroupRoleService();
