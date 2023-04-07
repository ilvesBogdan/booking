import { Component, ElementRef } from '@angular/core';

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
  actionButton = submitEvent
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

  const validName = validationOnlyLetter(elemName);
  if (validName) undisplayAlert(elemName?.parentElement);
  else displayAlert(elemName?.parentElement);
  
  const validSurname = validationOnlyLetter(elemSurname);
  if (validSurname) undisplayAlert(elemSurname?.parentElement);
  else displayAlert(elemSurname?.parentElement);
  
  const validPatronymic = validationOnlyLetter(elemPatronymic);
  if (validPatronymic) undisplayAlert(elemPatronymic?.parentElement);
  else displayAlert(elemPatronymic?.parentElement);
}

function displayAlert(elem: HTMLElement | null | undefined) {
  if (elem === null || elem === undefined) return;
  if (!elem.classList.contains("error"))
    elem.classList.add("error");
}

function undisplayAlert(elem: HTMLElement | null | undefined) {
  if (elem === null || elem === undefined) return;
  if (elem.classList.contains("error"))
    elem.classList.remove("error");
}

function validationOnlyLetter(elem: HTMLElement | null): boolean {
  if (elem === null) return true;
  const str = elem.textContent;
  if (str === null) return true;
  const regex = /^[A-Za-zА-Яа-я]+$/;
  return regex.test(str);
}