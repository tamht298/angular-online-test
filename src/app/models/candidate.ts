export class Candidate{
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deleted: boolean;
    
    constructor(firstName: string, lastName: string, gender: string, phone: string, email: string, deleted: boolean){
        this.firstName=firstName;
        this.lastName=lastName;
        this.gender=gender;
        this.phone=phone;
        this.email=email;
        this.deleted=deleted;
    }

}