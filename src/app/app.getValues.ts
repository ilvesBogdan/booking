/**
*   Получает родительский элемент от элемента, который инициировал событие.
*   @param {Event} event - Событие, вызванное элементом.
*   @returns {HTMLElement | null} - Родительский элемент или null, если элемент отсутствует.
*/
export const parentElementByEvent = (event: Event): HTMLElement | null => {
    const element = <HTMLElement>event.target;
    if (element === null) return null;
    return element.parentElement
}

/**
*   Преобразует значение элемента типа "date" в объект типа "Date"
*   @param {HTMLElement | null} elem - элемент, значение которого необходимо преобразовать в объект типа "Date"
*   @returns {Date | undefined} объект типа "Date" или undefined, если элемент не найден
*/
export const date = (elem: HTMLElement | null): Date | undefined => {
    if (elem === null) return;
    return new Date((<HTMLInputElement>elem).value);
}

/**
*   Получает числовое значение из элемента типа "number"
*   @param {HTMLElement | null} elem - элемент, из которого необходимо получить числовое значение
*   @returns {number | undefined} числовое значение или undefined, если элемент не найден
*/
export const number = (elem: HTMLElement | null): number | undefined => {
    if (elem === null) return;
    return (<HTMLInputElement>elem).valueAsNumber;
}

/**
*   Получает id выбранного элемента в списке (элемент типа "select")
*   @param {HTMLElement | null} elem - элемент типа "select", id которого необходимо получить
*   @returns {string | undefined} id выбранного элемента или undefined, если элемент не найден
*/
export const selectedElement = (elem: HTMLElement | null): string | undefined => {
    if (elem === null) return;
    const select = <HTMLSelectElement>elem;
    const selectedOption = select.options[select.selectedIndex];
    return selectedOption.id;
}

/**
*   Получает булево значение из элемента типа "checkbox"
*   @param {HTMLElement | null} elem - элемент типа "checkbox", значение которого необходимо получить
*   @returns {boolean | undefined} булево значение или undefined, если элемент не найден
*/
export const checked = (elem: HTMLElement | null): boolean | undefined => {
    if (elem === null) return;
    return (<HTMLInputElement>elem).checked;
}