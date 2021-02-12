import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { comparePathname } from '@/utils/functions';

export interface ITabItem {
	path: string;
	title: string;
	showInTabs?: boolean;
	hidden?: boolean;
	pin?: boolean;
}

export interface ILayoutState {
	tabsList: ITabItem[];
}

const initialState: ILayoutState = {
	tabsList: [],
};

export const removeTabItemsAsync = createAsyncThunk('', async (list) => {
	await fetch('/');
	console.log(list);
});

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		setTabsList(state: ILayoutState, action: PayloadAction<ITabItem[]>) {
			state.tabsList = action.payload;
		},
		addTabItem(state: ILayoutState, action: PayloadAction<ITabItem>) {
			if (action.payload && action.payload.path) {
				const flag = state.tabsList.some((item) => comparePathname(item.path, action.payload.path));
				if (!flag) {
					state.tabsList = [...state.tabsList, action.payload];
				}
			}
		},
		removeTabItems(state: ILayoutState, action: PayloadAction<ITabItem[]>) {
			if (Array.isArray(action.payload) && action.payload.length) {
				const paths = action.payload.map((item) => item.path.replace(/\/$/, ''));
				state.tabsList = state.tabsList.filter((item) => !paths.includes(item.path.replace(/\/$/, '')));
			}
		},
	},
});

export const { setTabsList } = layoutSlice.actions;

export default layoutSlice.reducer;
