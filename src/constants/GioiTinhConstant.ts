import { createConstant } from './Constant'
const GioiTinhConstant = createConstant(
  {
    Nam: 1,
    Nu: 2,
    Khac: 0
  },
  {
    1: { displayName: 'Nam' },
    2: { displayName: 'Nữ' },
    0: { displayName: 'Khác' },
  }
)
export default GioiTinhConstant
