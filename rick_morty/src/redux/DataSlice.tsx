import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  data: [];
  episodes: [];
  pageNumber: number;
  filterdata: {
    filterdata: [];
    Totalpage: number;
  };
}

const initialState: DataState = {
  data: [],
  episodes: [],
  pageNumber: 1,
  filterdata: { filterdata: [], Totalpage: 1 },
};

const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    datastore: (state, action: PayloadAction<[]>) => {
      state.data = action.payload;
    },
    storeFilterdata: (
      state,
      action: PayloadAction<{ result: []; Totalpage: number }>
    ) => {
      const { result, Totalpage } = action.payload;

      state.filterdata.filterdata = result;
      state.filterdata.Totalpage = Totalpage;
    },
    episodesdata: (state, action: PayloadAction<[]>) => {
      state.episodes = action.payload;
    },
    setpage: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
  },
});

export const dataAction = DataSlice.actions;
export default DataSlice.reducer;
