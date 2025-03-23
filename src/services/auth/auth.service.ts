import { LoginType, UserType, createEditType } from "@/interface/auth/User";
import { apiService } from "../index";
import { Response } from "@/interface/general";

class AuthService {
  public async login(formData: LoginType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/Account/Login",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  public async getInfo(): Promise<Response<UserType>> {
    try {
      const response = await apiService.get<Response<UserType>>("/Account/GetInfo");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async register(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/Account/Register",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
