export interface IUsersItem {
	name: string
	id: number
	uniqueUrlName: string
	photos: {
		small: string
		large: string
	}
	status: string
	followed: boolean
}
