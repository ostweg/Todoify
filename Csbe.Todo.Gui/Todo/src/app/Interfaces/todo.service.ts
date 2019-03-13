
export interface TodoService {
  id?:number,
  name:string,
  user_ID:number,
  createdBy?:string,
  ShortDescription:string,
  Importance:string,
  isComplete:boolean,
  finishDate:Date
}
