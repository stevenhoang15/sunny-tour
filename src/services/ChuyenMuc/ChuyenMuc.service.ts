import {
  ChuyenMucType,
  createEditType,
  searchChuyenMucData,
} from '@/interface/ChuyenMuc/ChuyenMuc'
import { apiService } from '..'
import { DropdownOption, DropdownTreeOptionAntd, Response } from '@/interface/general'

class ChuyenMucService {
  public async GetData(searchData: searchChuyenMucData): Promise<Response> {
    try {
      const respoonse = await apiService.post<Response<ChuyenMucService>>(
        '/ChuyenMuc/GetData',
        searchData
      )
      return respoonse.data
    } catch (err) {
      throw err
    }
  }

  public async Create(form: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/ChuyenMuc/Create',
        form
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async Update(form: createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>('/ChuyenMuc/Update', form)
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        '/ChuyenMuc/Delete/' + id
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async GetDropDown(): Promise<Response<DropdownOption[]>> {
    try {
      const response = await apiService.get<Response<DropdownOption[]>>(
        '/ChuyenMuc/GetDropDown'
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async GetTreeDropDown(): Promise<Response<DropdownTreeOptionAntd[]>> {
    try {
      const response = await apiService.get<Response<DropdownTreeOptionAntd[]>>(
        '/ChuyenMuc/GetTreeDropdown'
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async GetChuyenMucByCode(code: string): Promise<Response<string>> {
    try {
      const response = await apiService.get<Response<string>>(
        '/ChuyenMuc/GetChuyenMucByCode?code=' + code
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/ChuyenMuc/export')
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const chuyenMucService = new ChuyenMucService()
