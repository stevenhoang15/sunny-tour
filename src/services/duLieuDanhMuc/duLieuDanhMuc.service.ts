import { searchDuLieuDanhMucData, createEditType } from "@/interface/duLieuDanhMuc/duLieuDanhMuc";
import { apiService } from "../index";
import { Response } from "@/interface/general";

class DuLieuDanhMucService {
    public async getDataByPage(searchData: searchDuLieuDanhMucData): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/DM_DuLieuDanhMuc/GetData", searchData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Create(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/DM_DuLieuDanhMuc/Create", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Update(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.put<Response>("/DM_DuLieuDanhMuc/Update", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Delete(id: string): Promise<Response> {
        try {
            const response = await apiService.delete<Response>("/DM_DuLieuDanhMuc/Delete/" + id);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Export(searchData: searchDuLieuDanhMucData): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/DM_DuLieuDanhMuc/Export", searchData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async GetDropdown(groupCode: string): Promise<Response> {
        try {
            const response = await apiService.get<Response>(`/DM_DuLieuDanhMuc/GetDropdown/${groupCode}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async GetDropdownCode(groupCode: string): Promise<Response> {
        try {
            const response = await apiService.get<Response>(`/DM_DuLieuDanhMuc/GetDropdownCode/${groupCode}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const duLieuDanhMucService = new DuLieuDanhMucService();
