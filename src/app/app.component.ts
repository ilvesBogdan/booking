import { Component } from '@angular/core';
import * as get from 'src/app/app.getValues';

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
    const [valid, strLenght] = validationOnlyLetter(elem);
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

const eventRemoveAlert = (event: Event) => { undisplayAlert(get.parentElementByEvent(event)) }

function displayAlert(elem: HTMLElement | null | undefined, isRequired: boolean = true) {
  if (elem === null || elem === undefined) return;
  const className: string = isRequired ? "error" : "is-required";
  if (!elem.classList.contains(className))
    elem.classList.add(className);
  elem.addEventListener('change', eventRemoveAlert)
}

function undisplayAlert(elem: HTMLElement | null | undefined) {
  if (elem === null || elem === undefined) return;
  elem.removeEventListener('change', eventRemoveAlert);
  if (elem.classList.contains("error"))
    elem.classList.remove("error");
  if (elem.classList.contains("is-required"))
    elem.classList.remove("is-required");
}

function validationOnlyLetter(elem: HTMLElement | null): [boolean, number] {
  if (elem === null) return [true, 0];
  const str = (<HTMLInputElement>elem).value;
  if (str.length < 1) return [true, str.length];
  const regex = /^[A-Za-zА-Яа-я]+$/;
  return [regex.test(str), str.length];
}