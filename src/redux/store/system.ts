import { createSlice } from '@reduxjs/toolkit';

export interface ISystemState {
	systemName: string;
}

const initialState: ISystemState = {
	systemName: '我是系统名称',
};

export const systemSlice = createSlice({
	name: 'system',
	initialState,
	reducers: {},
});

// export const {  } = systemSlice.actions;

export default systemSlice.reducer;
