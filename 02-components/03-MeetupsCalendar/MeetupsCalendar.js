/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMounthHandler"></button>
          <div>{{ title }}</div>
          <button class="rangepicker__selector-control-right" @click="nextMounthHandler"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <template class="rangepicker__row" v-for="week in monthTable">
          <div v-for="date in week" class="rangepicker__cell" :class=" !isActiveDate(date) ?  \`rangepicker__cell_inactive\` : '' ">
            {{new Date(date).getDate()}}
            <a v-for="meetup in getMeetupsForDate(date)" class="rangepicker__event">{{ meetup.title }}</a>
          </div>
        </template>
      </div>
    </div>
  </div>`,

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  data: () => ({
    date: new Date(new Date(new Date().setDate(1)).setHours(0, 0, 0, 0)), // 1 day of current month, time = 0:0:0:0:
  }),

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed:
  {
    title() {
      return this.date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long'
      });
    },

    monthTable() {      
      const Monday = 1;
      const LastDayOfWeek = 7;

      const getLocalDay = (date) => {
        let day = date.getDay();
        if (day == 0) { 
          day = LastDayOfWeek;
        }
        return day;
      };

      let table = new Array();

      let date = new Date(this.date);
      while (date.getDay() !== Monday) { // to find start date
        date.setDate(date.getDate() - 1);
      }

      for (let week = 0; ;) {
        if (!table[week]) {
          table[week] = new Array();
        }

        let dayOfWeek = getLocalDay(date);
        table[week][dayOfWeek-1] = date;

        if (dayOfWeek === LastDayOfWeek) {
          week++;
        }

        date = new Date(new Date(date).setDate(date.getDate() + 1)); 
        if ((getLocalDay(date) === Monday) && (date.getMonth() != this.date.getMonth())) { // if next date is equal Monday of next month
          break;
        }
      }

      return table;
    },
  },

  // Методы понадобятся для переключения между месяцами
  methods: {
    isActiveDate(date) {
      return new Date(date).getMonth() == this.date.getMonth();
    },

    prevMounthHandler(e) {
      this.date = new Date(new Date(this.date).setMonth(this.date.getMonth() - 1));
    },

    nextMounthHandler(e) {
      this.date = new Date(new Date(this.date).setMonth(this.date.getMonth() + 1));
    },

    getMeetupsForDate(date) {
      return this.meetups.filter(meetup =>
        //new Date((new Date(meetup.date)).setHours(0,0,0,0)) === date // It does not work :(
        (new Date((new Date(meetup.date)).setHours(0, 0, 0, 0))).getTime() === date.getTime()
      );
    }
  },
};

