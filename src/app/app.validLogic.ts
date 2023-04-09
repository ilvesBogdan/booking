/**
*   Проверяет, содержит ли элемент только буквы, и возвращает результат и количество символов в строке
*   @param elem - HTML элемент, значение которого нужно проверить
*   @returns Массив из двух значений: булево значение (содержит ли элемент только буквы) и число (количество символов в строке)
*/
export const onlyLetter = (elem: HTMLElement | null): [boolean, number] => {
    if (elem === null) return [true, 0];
    const str = (<HTMLInputElement>elem).value;
    if (str.length < 1) return [true, str.length];
    const regex = /^[A-Za-zА-Яа-я]+$/;
    return [regex.test(str), str.length];
}