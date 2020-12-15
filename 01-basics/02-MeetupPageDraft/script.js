import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

function getMeetupLink() {
  return `${API_URL}/meetups/${MEETUP_ID}`;
}

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const getDateOnlyString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};


export const app = new Vue({
  el: '#app',

  data() {
    return {
      rawMeetup: null,
    };
  },

  async mounted() {
    // Требуется получить данные митапа с API
    this.rawMeetup = await this.getMeetup();
  },

  computed: {
    meetup() {
      return this.rawMeetup
        ? {
          ...this.rawMeetup,
          cover: this.rawMeetup.imageId
            ? getMeetupCoverLink(this.rawMeetup)
            : undefined,
          coverStyle: this.rawMeetup.imageId
            ? {
              '--bg-url': `url(${getMeetupCoverLink(this.rawMeetup)}`,
            }
            : {},
          date: new Date(this.rawMeetup.date),
          localDate: new Date(this.rawMeetup.date).toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          dateOnlyString: getDateOnlyString(new Date(this.rawMeetup.date)),

          agenda: {
            ...this.rawMeetup.agenda.map((agendaItem) => ({
              ...agendaItem,
              title: agendaItem.title
                ? agendaItem.title
                : agendaItemTitles[agendaItem.type],
              time: `${agendaItem.startsAt} - ${agendaItem.endsAt}`,
              imageName: agendaItemIcons[agendaItem.type]
            })),
          },

        } : null;
    },
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()

    async getMeetup() {

      let response = await fetch(getMeetupLink());

      if (response.ok) {
        return await response.json();
      } else {
        console.log("Ошибка HTTP: " + response.status);
        return null;
      }
    },
  },
});

window.app = app;