/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMonthHandler"></button>
          <div>{{ title }}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonthHandler"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <template class="rangepicker__row" v-for="week in monthTable">
          <div v-for="date in week" class="rangepicker__cell" :class="{ 'rangepicker__cell_inactive': !isActiveDate(date) }">
            {{ new Date(date).getDate() }}
            <a v-for="meetup in meetupsByDay.get(date)" class="rangepicker__event">{{ meetup.title }}</a>
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

    meetupsByDay(){
      return this.meetups.reduce((m, meetup) => {
        let key = (new Date(meetup.date)).setHours(0, 0, 0, 0);
        m.set(key, [... (m.get(key) || []), meetup]);
        return m;
      }, new Map());
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
      while (date.getDay() != Monday) { // to find start date
        date.setDate(date.getDate() - 1);
      }

      for (let week = 0; ;) {
        let dayOfWeek = getLocalDay(date);
        if ((dayOfWeek == Monday) && (date.getMonth() !== this.date.getMonth()) && (date>this.date)) { // if  date is equal Monday of next month
          break;
        }

        if (!table[week]) {
          table[week] = new Array();
        }
        
        table[week][dayOfWeek-1] = date.getTime();

        if (dayOfWeek == LastDayOfWeek) {
          week++;
        }

        date = new Date(new Date(date).setDate(date.getDate() + 1)); 
      }

      return table;
    },

  },

  // Методы понадобятся для переключения между месяцами
  methods: {
    isActiveDate(date) {
      return new Date(date).getMonth() === this.date.getMonth();
    },

    prevMonthHandler(e) {
      this.date = new Date(new Date(this.date).setMonth(this.date.getMonth() - 1));
    },

    nextMonthHandler(e) {
      this.date = new Date(new Date(this.date).setMonth(this.date.getMonth() + 1));
    },
  },
};

