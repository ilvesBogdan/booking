import { Component } from '@angular/core';
import * as get from 'src/app/app.getValues';
import * as validation from 'src/app/app.validLogic';

@Component({
  selector: 'app-main-from',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'booking';
  labelName = 'Имя';
  labelSurname = 'Фамилия';
  labelPatronymic = 'Отчество';
  labelDateOfBirth = 'Дата рождения';
  labelNumberOfGuests = 'Количество гостей';
  labelRoomType = 'Тип номера';
  labelArrivalDate = 'Дата заезда';
  labelDepartureDate = 'Дата выезда';
  labelWithAnAnimals = 'С животным';
  labelButton = 'Забронировать';

  getCurrentDate = getCurrentDate;
  changeTypeRoom = changeTypeRoom;
  actionButton = submitEvent;
}

const submitEvent = () => {
  const elemName = document.getElementById("name");
  const elemSurname = document.getElementById("surname");
  const elemPatronymic = document.getElementById("patronymic");
  const elemDateOfBirth = document.getElementById("date-of-birth");
  const elemNumberOfGuests = document.getElementById("number-of-guests");
  const elemRoomType = document.getElementById("room-type");
  const elemArrivalDate = document.getElementById("arrival-date");
  const elemDepartureDate = document.getElementById("departure-date");
  const elemWithAnAnimals = document.getElementById("with-animals");

  // Текстовые поля, обязательные для заполнения
  [elemName, elemSurname, elemPatronymic].forEach((elem) => {
    const [valid, strLenght] = validation.onlyLetter(elem);
    if (strLenght < 1) {
      displayAlert(elem?.parentElement, false);
      return;
    }
    if (valid) undisplayAlert(elem?.parentElement);
    else displayAlert(elem?.parentElement);
  });

  // Получаем дату рождения
  get.date(elemDateOfBirth);

  // Получаем кол-во гостей
  get.number(elemNumberOfGuests);

  // Поллучаем тип номера
  get.selectedElement(elemRoomType);

  // Получаем можно ли с животными
  get.checked(elemWithAnAnimals);
}

const eventRemoveAlert = (event: Event) => { undisplayAlert(get.parentElementByEvent(event)) };

const getCurrentDate = (days: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const changeTypeRoom = () => {
  const elemNumberOfGuests = <HTMLInputElement>document.getElementById("number-of-guests");
  const elemWithAnAnimals = <HTMLInputElement>document.getElementById("with-animals");
  switch (get.selectedElement(document.getElementById("room-type") as HTMLElement)) {
    case "id-room-type-0":
      elemNumberOfGuests.value = "1";
      elemNumberOfGuests.max = "1";
      elemNumberOfGuests.disabled = true;
      elemWithAnAnimals.disabled = false;
      break;
    case "id-room-type-1":
      if (parseInt(elemNumberOfGuests.value) > 2)
        elemNumberOfGuests.value = "2"
      elemNumberOfGuests.max = "2";
      elemNumberOfGuests.disabled = false;
      elemWithAnAnimals.disabled = false;
      break;
    case "id-room-type-2":
      if (parseInt(elemNumberOfGuests.value) > 4)
        elemNumberOfGuests.value = "4"
      elemNumberOfGuests.max = "4";
      elemNumberOfGuests.disabled = false;
      elemWithAnAnimals.disabled = false;
      break;
    case "id-room-type-3":
      if (parseInt(elemNumberOfGuests.value) > 6)
        elemNumberOfGuests.value = "6"
      elemNumberOfGuests.max = "6";
      elemNumberOfGuests.disabled = false;
      elemWithAnAnimals.disabled = false;
      break;
    case "id-room-type-4":
      if (parseInt(elemNumberOfGuests.value) > 2)
        elemNumberOfGuests.value = "2"
      elemNumberOfGuests.max = "2";
      elemNumberOfGuests.disabled = false;
      elemWithAnAnimals.disabled = true;
      elemWithAnAnimals.checked = false;
      break;
  }
}

const displayAlert = (elem: HTMLElement | null | undefined, isRequired: boolean = true) => {
  if (elem === null || elem === undefined) return;
  const className: string = isRequired ? "error" : "is-required";
  if (!elem.classList.contains(className))
    elem.classList.add(className);
  elem.addEventListener('change', eventRemoveAlert)
}

const undisplayAlert = (elem: HTMLElement | null | undefined) => {
  if (elem === null || elem === undefined) return;
  elem.removeEventListener('change', eventRemoveAlert);
  if (elem.classList.contains("error"))
    elem.classList.remove("error");
  if (elem.classList.contains("is-required"))
    elem.classList.remove("is-required");
}