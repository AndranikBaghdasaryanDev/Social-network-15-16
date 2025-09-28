export interface IUser{
	id:number
	name:string
	surname:string
	login:string
	password:string
	picture:string | null
	isPrivate:number
}

export type NewUser = Omit<IUser,'id'>	
export type AuthUser = Pick<IUser,"login" | "password">
export interface IResponse<T = unknown>{
	status:string
	message?: string
	payload:T
}
export interface IContext{
	account : IUser
	setAccount:(user:IUser) => void
}
export interface IUpdateLogin{
	newLogin:string
	password:string
}
export interface IUpdatePassword{
	oldPassword:string
	newPassword:string
}
export interface IPreviewPost{
	image:string
	text:string
}
export interface IPosts{
	id:number
	title:string
	picture:string
	userId:number
	likes:any[]
}