import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGlobalState {
	permissions: string[];
}

const initialState: IGlobalState = {
	permissions: ['admin', '张三', '李四'],
};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setPermissions(state: IGlobalState, action: PayloadAction<string[]>) {
			state.permissions = action.payload;
		},
	},
});

export const { setPermissions } = globalSlice.actions;

export default globalSlice.reducer;
