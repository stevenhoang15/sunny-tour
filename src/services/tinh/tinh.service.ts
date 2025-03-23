import { apiService } from '../index'
import { DropdownOptionAntd, Response } from '@/interface/general'

class TinhService {
  public async GetDropdown(): Promise<Response<DropdownOptionAntd[]>> {
    try {
      const response = await apiService.get<Response<DropdownOptionAntd[]>>(
        '/Tinh/GetDropdown'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const tinhService = new TinhService()
