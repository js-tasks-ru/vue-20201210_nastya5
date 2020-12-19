import {agendaItemTitles, agendaItemIcons } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `
    <div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
      <img class="icon" alt="icon" :src="\`\${item.imageName}\`" />
      </div>
      <div class="meetup-agenda__item-col">{{ item.time }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title" v-html="item.title"></h5>
        <template v-if="item.type === 'talk'">
          <span>{{ item.speaker }}</span>  
          <span class="meetup-agenda__dot"></span><span class="meetup-agenda__lang">{{ item.language}}</span>
        </template>
        </template>
        <p v-if="item.description">{{ item.description }}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    }

  },

  computed: {      
    item(){
      return {
        ...this.agendaItem,
        title: this.agendaItem.title
          ? this.agendaItem.title
          : agendaItemTitles[this.agendaItem.type],
        time: `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`,
        imageName: `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`
      }
    },

  },
};
