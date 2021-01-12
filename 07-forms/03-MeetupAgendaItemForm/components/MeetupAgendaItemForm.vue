<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="agendaItem_.type">
        <option
          v-for="{ value, text } in getAgendaItemTypes()"
          :value="value"
          :key="value"
        >
          {{ text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            :value="agendaItem_.startsAt"
            @input="handleInputStartsAt($event.target.value)"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.endsAt"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">
        {{
          isTalk
            ? 'Тема'
            : isOther
            ? 'Заголовок'
            : 'Нестандартный текст (необязательно)'
        }}
      </label>
      <input class="form-control" v-model="agendaItem_.title" />
    </div>

    <div class="form-group" v-if="isTalk">
      <label class="form-label">Докладчик </label>
      <input class="form-control" v-model="agendaItem_.speaker" />
    </div>

    <div class="form-group" v-if="isTalk || isOther">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="agendaItem_.description"
      ></textarea>
    </div>
    <div class="form-group" v-if="isTalk">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="agendaItem_.language">
        <option
          v-for="{ value, text } in getTalkLanguages()"
          :value="value"
          :key="value"
        >
          {{ text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

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

  watch: {
    agendaItem_: {
      deep: true,
      handler(newValue) {
        this.$emit(`update:agendaItem`, newValue);
      },
    },
  },

  computed: {
    isTalk() {
      return this.agendaItem_.type === 'talk';
    },
    isOther() {
      return this.agendaItem_.type === 'other';
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

    getAgendaItemTypes() {
      return getAgendaItemTypes();
    },
    getTalkLanguages() {
      return getTalkLanguages();
    },
  },
};
</script>

<style></style>
