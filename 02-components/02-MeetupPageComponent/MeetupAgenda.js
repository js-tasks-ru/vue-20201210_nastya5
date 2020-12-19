import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template:`
  <div class="meetup-agenda">
    <p v-show="agenda.length===0" class="meetup-agenda__empty">Программа пока пуста, но когда-нибудь в ней бязательно что-нибудь появится!</p>
    <meetup-agenda-item v-for="(agendaItem,name,index) in agenda" :agendaItem="agendaItem" :key="agendaItem.id" />
  </div>`,

  template2: `
    <div class="meetup-agenda">
      <div class="meetup-agenda__item"></div>
    </div>`,

  components:{
    MeetupAgendaItem
  },

  props:{
    agenda: {
      type: Array,
      requred: true,
    },
  },
};

