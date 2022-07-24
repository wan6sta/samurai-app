import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authSlice/authSlice'
import { profilePageReducer } from './reducers/profilePageSlice/ProfilePageSlice'
import { pageUsersReducer } from './reducers/usersSlice/usersSlice'

const rootReducer = combineReducers({
	authReducer,
	profilePageReducer,
	pageUsersReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		devTools: true
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
