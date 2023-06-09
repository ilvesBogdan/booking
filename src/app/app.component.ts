import { Component, AfterViewInit } from '@angular/core';
import * as get from 'src/app/app.getValues';
import * as validation from 'src/app/app.validLogic';
import { Reservation } from 'src/app/app.sendData';
import { roomTypes, roomToTag } from 'src/app/app.typeRooms';

@Component({
  selector: 'app-main-from',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements AfterViewInit {
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

  ngAfterViewInit() {
    // Заполняем выпадающий список типами номеров
    (() => {
      const select = document.getElementById("room-type");
      if (select === null) return;
      roomTypes.forEach((room) => {
        select.appendChild(roomToTag(room));
      })
    })();
    setInterierRoomImage(1);
  }

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

  // Поля с вводом даты, обязательные для заполнения
  [elemDateOfBirth, elemArrivalDate, elemDepartureDate].forEach((elem) => {
    if ((<HTMLInputElement>elem).value) undisplayAlert(elem?.parentElement);
    else displayAlert(elem?.parentElement);
  })

  // Поллучаем тип номера
  const roomTypeId = ((): number | undefined => {
    const str = get.selectedElement(elemRoomType);
    if (str === undefined) return undefined;
    return parseInt(str.match(/\d+/)![0], 10)
  })();
  if (roomTypeId === undefined) {
    alert("Ошибка получения данных о типе номера.")
    return;
  }

  // Получаем кол-во гостей
  const countOfGuests = get.number(elemNumberOfGuests);
  if (countOfGuests === undefined) {
    alert("Ошибка получения данных о количестве гостей.")
    return;
  }

  // Получаем дату заселения
  const startDate = ((): string | undefined => {
    const date = get.date(elemArrivalDate);
    if (date === undefined) return undefined;
    return date.toISOString().slice(0, 10);
  })();
  if (startDate === undefined) {
    alert("Ошибка получения данных о заезде.")
    return;
  }

  // Получаем дату выселения
  const endDate = ((): string | undefined => {
    const date = get.date(elemDepartureDate);
    if (date === undefined) return undefined;
    return date.toISOString().slice(0, 10);
  })();
  if (endDate === undefined) {
    alert("Ошибка получения данных о выезде.")
    return;
  }

  // Получаем можно ли с животными
  const withAnimal = get.checked(elemWithAnAnimals);
  if (withAnimal === undefined) {
    alert("Ошибка получения данных о заселении с животным.")
    return;
  }

  // Данные о пользователе
  const firstName = (<HTMLInputElement>elemName).value;
  const lastName = (<HTMLInputElement>elemSurname).value;
  const patronymicName = (<HTMLInputElement>elemPatronymic).value;
  const birthday = ((): string | undefined => {
    const date = get.date(elemDateOfBirth);
    if (date === undefined) return undefined;
    return date.toISOString().slice(0, 10);
  })();
  if (birthday === undefined) {
    alert("Ошибка получения данных о дате рождения постояльца.")
    return;
  }

  // Проверка заполнености полей перед оправкой
  if (document.querySelectorAll(".error, .is-required").length)
    return;

  const reservation: Reservation = {
    roomTypeId: roomTypeId,
    countOfGuests: countOfGuests,
    startDate: startDate,
    endDate: endDate,
    withAnimal: withAnimal,
    user: {
      firstName: firstName,
      lastName: lastName,
      patronymicName: patronymicName,
      birthday: birthday
    }
  };

  // Отправка данных на сервер
  console.log(reservation);
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
      setInterierRoomImage(1);
      break;
    case "id-room-type-1":
      if (parseInt(elemNumberOfGuests.value) > 2)
        elemNumberOfGuests.value = "2"
      elemNumberOfGuests.max = "2";
      elemNumberOfGuests.disabled = false;
      elemWithAnAnimals.disabled = false;
      setInterierRoomImage(2);
      break;
    case "id-room-type-2":
      if (parseInt(elemNumberOfGuests.value) > 4)
        elemNumberOfGuests.value = "4"
      elemNumberOfGuests.max = "4";
      elemNumberOfGuests.disabled = false;
      elemWithAnAnimals.disabled = false;
      setInterierRoomImage(3);
      break;
    case "id-room-type-3":
      if (parseInt(elemNumberOfGuests.value) > 6)
        elemNumberOfGuests.value = "6"
      elemNumberOfGuests.max = "6";
      elemNumberOfGuests.disabled = false;
      elemWithAnAnimals.disabled = false;
      setInterierRoomImage(4);
      break;
    case "id-room-type-4":
      if (parseInt(elemNumberOfGuests.value) > 2)
        elemNumberOfGuests.value = "2"
      elemNumberOfGuests.max = "2";
      elemNumberOfGuests.disabled = false;
      elemWithAnAnimals.disabled = true;
      elemWithAnAnimals.checked = false;
      setInterierRoomImage(5);
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

const setInterierRoomImage = (key: number) => {
  const foto: {[key: number]: string} = {
    1: "url('http://www.rigaland-hotel.ru/images/standart_single_img_1.jpg')",
    2: "url('http://www.krist.ru/files/mToursNomersGallery/3465/5b498f384cdceca02fb5336f6c8b63af_46823_.jpg')",
    3: "url('https://hotels.his-j.com/image/hotel/AMS/AMS00572-07.jpg')",
    4: "url('https://bigfoto.name/uploads/posts/2021-11/1638216411_56-bigfoto-name-p-dizain-proekt-gostinichnogo-nomera-v-stile-62.jpg')",
    5: "url('https://i.pinimg.com/originals/20/04/f5/2004f5b16df6796305584a576b553019.jpg')",
  };
  const fotoElement = <HTMLElement>document.querySelector("main > section");
  fotoElement.style.backgroundImage = foto[key];
}