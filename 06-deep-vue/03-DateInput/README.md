# DateInput

Для начала требуется выбрать, какую дату использовать, если переданы и `valueAsDate`, и `valueAsNumber`. Создадим вычисляемое свойство date, которое получает дату следующим образом:

```javascript
return (this.valueAsNumber ? new Date(this.valueAsNumber) : null) || this.valueAsDate;
```

Далее можно получать форматированные строки для дат в разном формате:

```javascript
dateValue() {
  const YYYY = this.date.getUTCFullYear();
  const MM = (this.date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = this.date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
},

timeValue() {
  const HH = this.date.getUTCHours().toString().padStart(2, '0');
  const MM = this.date.getUTCMinutes().toString().padStart(2, '0');
  return `${HH}:${MM}`;
},

timeWithSecondsValue() {
  const SS = this.date.getUTCSeconds().toString().padStart(2, '0');
  return `${this.timeValue}:${SS}`;
},
```

Теперь нужный формат можно выбрать в соответствии со значением `type`:
```javascript
inputValue() {
  // Если дата не передана, то передаем value, как есть
  if (!this.date) {
    return this.value;
  }
  if (this.type === 'date') {
    return this.dateValue;
  } else if (this.type === 'time') {
    // Не забываем про секунды, если step не кратен 60-ти секундам
    return (this.$attrs['step'] && this.$attrs['step'] % 60 !== 0) ? this.timeWithSecondsValue : this.timeValue;
  } else if (this.type === 'datetime-local') {
    return `${this.dateValue}T${this.timeValue}`;
  }
  return null;
},
```

Значение `value` для `AppInput` готово. Добавим простой метод, который будет обработчиком события `input`.

```javascript
handleUpdate($event) {
  this.$emit('update:valueAsNumber', $event.target.valueAsNumber);
  // Не забываем, что valueAsDate отсутствует в datetime-local
  this.$emit(
      'update:valueAsDate',
      this.type !== 'datetime-local'
        ? $event.target.valueAsDate
        : new Date($event.target.valueAsNumber),
    );
},
```

Всё готово, передаём на `AppInput`. Чтобы `value` не было в общих `$attrs` добавим его в список параметров.

Полное решение:

```html
<template>
  <AppInput
    v-bind="$attrs"
    v-on="$listeners"
    :value="inputValue"
    :type="type"
    @input.native="handleUpdate"
  >
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot"/>
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
    },
    value: {},
    valueAsDate: {
      type: Date,
    },
    valueAsNumber: {
      type: Number,
    },
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: undefined,
        change: undefined,
      };
    },

    date() {
      return (
        (this.valueAsNumber ? new Date(this.valueAsNumber) : null) ||
        this.valueAsDate
      );
    },

    dateValue() {
      const YYYY = this.date.getUTCFullYear();
      const MM = (this.date.getUTCMonth() + 1).toString().padStart(2, '0');
      const DD = this.date.getUTCDate().toString().padStart(2, '0');
      return `${YYYY}-${MM}-${DD}`;
    },

    timeValue() {
      const HH = this.date.getUTCHours().toString().padStart(2, '0');
      const MM = this.date.getUTCMinutes().toString().padStart(2, '0');
      return `${HH}:${MM}`;
    },

    timeWithSecondsValue() {
      const SS = this.date.getUTCSeconds().toString().padStart(2, '0');
      return `${this.timeValue}:${SS}`;
    },

    inputValue() {
      if (!this.date) {
        return this.value;
      }
      if (this.type === 'date') {
        return this.dateValue;
      } else if (this.type === 'time') {
        return (this.$attrs['step'] && this.$attrs['step'] % 60 !== 0) ? this.timeWithSecondsValue : this.timeValue;
      } else if (this.type === 'datetime-local') {
        return `${this.dateValue}T${this.timeValue}`;
      }
      return null;
    },
  },

  methods: {
    handleUpdate($event) {
      this.$emit('update:valueAsNumber', $event.target.valueAsNumber);
      this.$emit(
        'update:valueAsDate',
        this.type !== 'datetime-local'
          ? $event.target.valueAsDate
          : new Date($event.target.valueAsNumber),
      );
    },
  },
};
</script>

<style scoped></style>

```
