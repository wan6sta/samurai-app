import { IUserMoreInfo } from '../../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IProfileState {
	user: IUserMoreInfo | null
	authUser: IUserMoreInfo | null
	isLoading: boolean
	error: string
	isAuthUserMoreInfoSet: boolean
}

const initialState: IProfileState = {
	user: null,
	authUser: null,
	isLoading: false,
	error: '',
	isAuthUserMoreInfoSet: false
}

export const profilePageSlice = createSlice({
	name: 'profile page slice',
	initialState,
	reducers: {
		setAuthUserMoreInfo: (state, action: PayloadAction<IUserMoreInfo>) => {
			state.authUser = action.payload
			state.isAuthUserMoreInfoSet = true
		},
		setUserProfile: (state, action: PayloadAction<IUserMoreInfo>) => {
			state.user = action.payload
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		},
		setUserStatus: (state, action: PayloadAction<string>) => {
			if (state.user) {
				state.user.status = action.payload
			}
		},
		deleteUserInfo: (state) => {
			state.error = ''
			state.user = null
			state.authUser = null
			state.isAuthUserMoreInfoSet = false
		}
	}
})

export const profilePageReducer = profilePageSlice.reducer
