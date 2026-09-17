import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice"

// redux-persist нужен для сохранения состояния между обновлениями страницы
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

// хранилище localforage (больше, чем localstotage): позволяет сохранять картинки
import localforage from 'localforage';  
const storage = {
    getItem: async (key) => {
        const value = await localforage.getItem(key);
        return value;
    },
    setItem: async (key, value) => {
        await localforage.setItem(key, value);
    },
    removeItem: async (key) => {
        await localforage.removeItem(key);
    },
};


const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, notesReducer);

export const store = configureStore({
    reducer: {
        notes: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

/*export default configureStore({   //без localstorage
    reducer: {
        notes: notesReducer,
    },
})*/

export const persistor = persistStore(store);