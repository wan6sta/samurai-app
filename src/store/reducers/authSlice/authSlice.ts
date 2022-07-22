import { IAuthUser } from '../../../models/IAuthUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAuthState {
	authUser: IAuthUser
	isLoading: boolean
	error: string
	isLogin: boolean
}

const initialState: IAuthState = {
	authUser: {
		id: null,
		email: null,
		login: null
	},
	isLoading: false,
	error: '',
	isLogin: false
}

export const authSlice = createSlice({
	name: 'auth slice',
	initialState,
	reducers: {
		authUserFetching: (state) => {
			state.isLogin = false
			state.isLoading = true
		},
		authUserFetchingSuccess: (state, action: PayloadAction<IAuthUser>) => {
			state.isLoading = false
			state.error = ''
			state.authUser = action.payload
			state.isLogin = true
		},
		authUserFetchingError: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.isLogin = false
			state.error = action.payload
		},
		authUserSignOut: (state) => {
			state.isLoading = false
			state.error = ''
			state.authUser = {}
			state.isLogin = false
		}
	}
})

export const authReducer = authSlice.reducer
