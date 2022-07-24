import { IUsersItem } from '../../../models/IUsersItem'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserState {
	users: IUsersItem[]
	isLoading: boolean
	error: string
}

const initialState: IUserState = {
	users: [],
	isLoading: false,
	error: ''
}

export const pageUsersSlice = createSlice({
	name: 'pageUsersSlice',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<IUsersItem[]>) => {
			state.users = action.payload
		},
		setUsersPagiantion: (state, action: PayloadAction<IUsersItem[]>) => {
			state.users = [...state.users, ...action.payload]
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setUserFollow: (state, action) => {
			state.users.forEach(user => {
				if (user.id === action.payload) {
					user.followed = true
				}
			})
		},
		setUserUnFollow: (state, action) => {
			state.users.forEach(user => {
				if (user.id === action.payload) {
					user.followed = false
				}
			})
		}
	}
})

export const pageUsersReducer = pageUsersSlice.reducer
