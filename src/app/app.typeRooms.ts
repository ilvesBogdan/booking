type RoomType = {
    id: number;
    name: string;
}

export const roomTypes: RoomType[] = [
    {
        id: 0,
        name: 'Стандарт одноместный'
    },
    {
        id: 1,
        name: 'Стандарт двухместный'
    },
    {
        id: 2,
        name: 'Семейный (до 4-х гостей)'
    },
    {
        id: 3,
        name: 'Двухкомнатный (до 6-ти гостей)'
    },
    {
        id: 4,
        name: 'Люкс двухместный'
    }
];

export const roomToTag = (room: RoomType): HTMLOptionElement => {
    const optionElement = document.createElement('option');
    optionElement.setAttribute('id', `id-room-type-${room.id}`);
    optionElement.textContent = room.name;
    return optionElement;
}