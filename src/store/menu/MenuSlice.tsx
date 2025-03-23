import { UserType } from "@/interface/auth/User";
import { Response } from "@/interface/general";
import { MenuDataType } from "@/interface/menu/menu";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface StateType {
  menuData: MenuDataType[] | null;
}

const initialState: StateType = {
  menuData: null,
};

export const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuData: (
      state: StateType,
      action: PayloadAction<Response<UserType>>
    ) => {
      const userMenuData = action.payload.data?.menuData || [];
      state.menuData = userMenuData;
    },
    resetMenuData: (state: StateType) => {
      state.menuData = null; // Xóa menu khi logout
    },
  },
});

export const { setMenuData, resetMenuData } = MenuSlice.actions;

export default MenuSlice.reducer;
