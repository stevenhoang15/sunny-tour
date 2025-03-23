import { createEditType, DataToSend, searchUserData, tableUserDataType } from '@/interface/auth/User';
import { apiService } from '../index'
import { DropdownOptionAntd, Response, ResponsePageList } from '@/interface/general'

class UserService {
  public async getDataByPage(
    searchData: searchUserData
  ): Promise<Response<ResponsePageList<tableUserDataType[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<tableUserDataType[]>>
      >('/User/GetData', searchData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>('/User/Create', formData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>('/User/Update', formData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>('/User/Delete/' + id)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Lock(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>('/User/Lock/' + id)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/User/export')
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportTemplateImport(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/User/exportTemplateImport'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDataImportView(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/User/import')
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async saveImport(form: DataToSend): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/User/importExcel',
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDropdown(): Promise<Response<DropdownOptionAntd[]>> {
      try {
        const response = await apiService.get<Response<DropdownOptionAntd[]>>(
          '/User/GetDropDown'
        )
        return response.data
      } catch (error) {
        throw error
      }
    }
}

export const userService = new UserService()
