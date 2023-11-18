export interface employeeType {
    firstName: string;
    lastName: string;
    gender: true;
    dayOfBirth: string;
    email: string;
    phoneNumber: string;
    password: string;
    avatarUrl: string;
    active: boolean;
    address: {
        specificAddress: string;
        wards: string;
        districts: string;
        province: string;
    };
    roleId: number;
}
