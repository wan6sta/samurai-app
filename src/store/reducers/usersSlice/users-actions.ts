import { AppDispatch } from '../../store'
import { pageUsersSlice } from './usersSlice'
import { axiosSocial } from '../../../api/axios'

export const setUsersWithFilter =
	(count: number, page: number, term: string, friend: boolean) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(pageUsersSlice.actions.setIsLoading(true))
			const { data } = await axiosSocial.get(
				`/users?count=${count}&page=${page}&term=${term}&friend=${friend}`,
				{
					withCredentials: true,
					headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' }
				}
			)
			if (data.error === null) {
				dispatch(pageUsersSlice.actions.setIsLoading(false))
				dispatch(pageUsersSlice.actions.setError(''))

				dispatch(pageUsersSlice.actions.setUsers(data.items))
				return
			}

			dispatch(pageUsersSlice.actions.setIsLoading(false))
			dispatch(pageUsersSlice.actions.setError('some error'))
		} catch (e: any) {
			dispatch(pageUsersSlice.actions.setError(e.message))
		}
	}

export const setUsersPagination =
	(count: number, page: number, term: string, friend: boolean) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(pageUsersSlice.actions.setIsLoading(true))
			const { data } = await axiosSocial.get(
				`/users?count=${count}&page=${page}&term=${term}&friend=${friend}`,
				{
					withCredentials: true,
					headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' }
				}
			)
			if (data.error === null) {
				dispatch(pageUsersSlice.actions.setIsLoading(false))
				dispatch(pageUsersSlice.actions.setError(''))

				dispatch(pageUsersSlice.actions.setUsersPagiantion(data.items))
				return
			}

			dispatch(pageUsersSlice.actions.setIsLoading(false))
			dispatch(pageUsersSlice.actions.setError('some error'))
		} catch (e: any) {
			dispatch(pageUsersSlice.actions.setError(e.message))
		}
	}

export const setUserFollowOrUnfollow =
	(followType: string, id: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(pageUsersSlice.actions.setIsLoading(true))
			if (followType === 'follow') {
				const { data } = await axiosSocial.post(
					`/follow/${id}`,
					{},
					{
						withCredentials: true,
						headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' }
					}
				)
				if (data.resultCode === 0) {
					dispatch(pageUsersSlice.actions.setIsLoading(false))
					dispatch(pageUsersSlice.actions.setError(''))

					dispatch(pageUsersSlice.actions.setUserFollow(id))
					return
				}
			} else {
				const { data } = await axiosSocial.delete(`/follow/${id}`, {
					withCredentials: true,
					headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' }
				})

				if (data.resultCode === 0) {
					dispatch(pageUsersSlice.actions.setIsLoading(false))
					dispatch(pageUsersSlice.actions.setError(''))

					dispatch(pageUsersSlice.actions.setUserUnFollow(id))
					return
				}
			}

			dispatch(pageUsersSlice.actions.setIsLoading(false))
			dispatch(pageUsersSlice.actions.setError('some error'))
		} catch (e: any) {
			dispatch(pageUsersSlice.actions.setError(e.message))
		}
	}
