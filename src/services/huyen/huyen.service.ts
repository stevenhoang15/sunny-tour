import { apiService } from "../index";
import { Response } from "@/interface/general";

class HuyenService {
    public async GetDropdown(maTinh: string): Promise<Response> {
        try {
            const response = await apiService.get<Response>(`/Huyen/GetDropdown/${maTinh}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const huyenService = new HuyenService();
