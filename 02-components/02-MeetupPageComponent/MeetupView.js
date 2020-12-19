import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',
  
  template: `
    <div>
      <meetup-cover :title=meetup.title :link="meetupCoverLink"/>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :description=meetup.description />
            <h3>Программа</h3>
            <meetup-agenda :agenda="meetup.agenda" />
          </div>
          <meetup-info :place=meetup.place :organizer=meetup.organizer :date="new Date(meetup.date)" />
        </div>
      </div>
    </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },
  
  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    meetupCoverLink() {
      return getMeetupCoverLink(this.meetup)
    },

  },
};
