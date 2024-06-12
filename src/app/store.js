import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/user/userSlice";
import inventoryReducer from "./features/inventory/inventorySlice";
import examReducer from "./features/exam/examSlice";

const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  exam: examReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const presistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
