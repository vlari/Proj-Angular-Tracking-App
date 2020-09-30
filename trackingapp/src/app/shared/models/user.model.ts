export class User {
    name: string;
    lastName: string;
    dateOfBirth: string;
    citizenId: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    DocumentTypeId: number;
    PaymentOptionId: number;
    FacilityId: number;

    constructor(form: any) {
        this.name = form.name;
        this.lastName = form.lastName;
        this.dateOfBirth = form.dateOfBirth;
        this.citizenId = form.citizenId;
        this.email = form.email;
        this.address = form.address;
        this.phone = form.phone;
        this.password = form.password || form.passwordGroup.password;
        this.DocumentTypeId = form.DocumentTypeId;
        this.PaymentOptionId = form.PaymentOptionId;
        this.FacilityId = form.FacilityId;
    }
}
