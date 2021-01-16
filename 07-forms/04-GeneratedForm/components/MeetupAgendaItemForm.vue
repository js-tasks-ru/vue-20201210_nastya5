<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="agendaItem_.type"
      />
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <app-input
            type="time"
            placeholder="00:00"
            :value="agendaItem_.startsAt"
            @input="handleInputStartsAt($event)"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <app-input
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.endsAt"
          />
        </div>
      </div>
    </div>

    <div v-for="item in specifications" class="form-group" :key="item.field">
      <label class="form-label">{{ item.title }}</label>
      <component
        :is="item.component"
        v-bind="item.props"
        v-bind:[item.model.prop]="agendaItem_[item.field]"
        v-on:[item.model.event]="agendaItem_[item.field] = $event"
      />
    </div>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      agendaItem_: { ...this.agendaItem },
    };
  },

  computed: {
    specifications() {
      return this.$options.fieldSpecifications[this.agendaItem_.type];
    },
  },

  watch: {
    agendaItem_: {
      deep: true,
      handler(newValue) {
        this.$emit(`update:agendaItem`, newValue);
      },
    },
  },

  methods: {
    handleInputStartsAt(value) {
      const MinMinutes = 0;
      const MaxMinutes = 24 * 60;

      const calcMinutes = (value) => {
        let [h, m] = value.split(':');
        h = parseInt(h);
        m = parseInt(m);
        return h * 60 + m;
      };

      const calcTime = (minutes) => {
        let h = Math.floor(minutes / 60)
          .toString()
          .padStart(2, '0');
        let m = (minutes % 60).toString().padStart(2, '0');

        return `${h}:${m}`;
      };

      let newEndsAt =
        calcMinutes(value) +
        calcMinutes(this.agendaItem_.endsAt) -
        calcMinutes(this.agendaItem_.startsAt);

      if (newEndsAt < MinMinutes) {
        newEndsAt = MinMinutes;
      } else if (newEndsAt >= MaxMinutes) {
        newEndsAt -= MaxMinutes;
      }

      this.agendaItem_.startsAt = value;
      this.agendaItem_.endsAt = calcTime(newEndsAt);
    },
  },
};
</script>

<style></style>

