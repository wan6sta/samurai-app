import { AppDispatch } from '../../store'
import { axiosSocial } from '../../../api/axios'
import { IAuthUser } from '../../../models/IAuthUser'
import { authSlice } from './authSlice'

interface IAuthUserFetching {
	data: IAuthUser
	fieldErrors: []
	messages: []
	resultCode: number
}

export const setAuthUser = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(authSlice.actions.authUserFetching())
		const { data } = await axiosSocial.get<IAuthUserFetching>('/auth/me', {
			withCredentials: true,
			headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' }
		})
		if (data.resultCode === 1) {
			dispatch(authSlice.actions.authUserFetchingError('some error'))
			return
		}

		dispatch(authSlice.actions.authUserFetchingSuccess(data.data))
	} catch (e: any) {
		dispatch(authSlice.actions.authUserFetchingError(e.message))
	}
}

export const setAuthUserSignOut = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(authSlice.actions.authUserFetching())
		const { data } = await axiosSocial.delete<IAuthUserFetching>(
			'/auth/login',
			{
				headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' },
				withCredentials: true
			}
		)
		if (data.resultCode === 1) {
			dispatch(authSlice.actions.authUserFetchingError('some error'))
			return
		}
		dispatch(authSlice.actions.authUserSignOut())
	} catch (e: any) {
		dispatch(authSlice.actions.authUserFetchingError(e.message))
	}
}

export const setAuthSignIn =
	(email: string, password: string, rememberMe: boolean) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(authSlice.actions.authUserFetching())

			const { data } = await axiosSocial.post(
				'/auth/login',
				{
					email,
					password,
					rememberMe
				},
				{
					headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' },
					withCredentials: true
				}
			)

			if (data.resultCode === 1 || data.resultCode === 10) {
				dispatch(authSlice.actions.authUserFetchingError('some error'))
				return
			}

			dispatch(setAuthUser())
		} catch (e: any) {
			dispatch(authSlice.actions.authUserFetchingError(e.message))
		}
	}
