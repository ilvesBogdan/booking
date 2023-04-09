interface User {
    firstName: string;
    lastName: string;
    patronymicName: string;
    birthday: string;
}

export interface Reservation {
    roomTypeId: number;
    countOfGuests: number;
    startDate: string;
    endDate: string;
    withAnimal: boolean;
    user: User;
}