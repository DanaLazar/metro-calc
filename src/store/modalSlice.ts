import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ModalType = "save" | "clear" | null;

export interface ModalState {
  type: ModalType;
  isOpen: boolean;
}

const initialState: ModalState = {
  type: null,
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.type = action.payload;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.type = null;
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
