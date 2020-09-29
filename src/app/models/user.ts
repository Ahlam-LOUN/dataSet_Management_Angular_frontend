export class User {
    userId: string;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    admin:string;
}
export interface TodoListResponse {
    content: User[];
    totalElements: number;
}
