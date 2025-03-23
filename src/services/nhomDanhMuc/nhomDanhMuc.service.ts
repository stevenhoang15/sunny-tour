import { searchNhomDanhMucData, createEditType } from "@/interface/nhomDanhMuc/nhomDanhMuc";
import { apiService } from "../index";
import { Response } from "@/interface/general";

class NhomDanhMucService {
    public async getDataByPage(searchData: searchNhomDanhMucData): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/DM_NhomDanhMuc/GetData", searchData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Create(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/DM_NhomDanhMuc/Create", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Update(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.put<Response>("/DM_NhomDanhMuc/Update", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Delete(id: string): Promise<Response> {
        try {
            const response = await apiService.delete<Response>("/DM_NhomDanhMuc/Delete/" + id);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Export(searchData: searchNhomDanhMucData): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/DM_NhomDanhMuc/Export", searchData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


}

export const nhomDanhMucService = new NhomDanhMucService();
