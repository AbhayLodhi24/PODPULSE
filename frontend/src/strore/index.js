import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth.js';
import playerReducer from './player.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        player: playerReducer,
    },
});

export default store ;