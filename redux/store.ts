// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import rootReducer from "@/redux/reducer";
import { PersistPartial } from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootPersistState = ReturnType<typeof rootReducer> &
  Partial<PersistPartial>;

// persist 설정 – 여기서 'auth' 슬라이스만 영속화합니다.
const persistConfig: PersistConfig<RootPersistState> = {
  key: "root",
  storage: AsyncStorage as any, // AsyncStorage는 비동기라 any로 캐스팅
  whitelist: ["auth"],
};

const persistedReducer = persistReducer<RootPersistState>(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // redux-persist 관련 액션들을 직렬화 검사에서 제외
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

// 타입 정의
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
