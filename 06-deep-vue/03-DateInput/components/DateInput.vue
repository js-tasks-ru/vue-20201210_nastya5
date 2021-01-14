<template>
  <AppInput
    :type="type"
    :value="value_"
    @change="handleChange($event)"
    v-bind="$attrs"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

const getFormatedDate = (date, type, useSeconds) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  const hh = date.getUTCHours().toString().padStart(2, '0');
  const mm = date.getUTCMinutes().toString().padStart(2, '0');
  const ss = date.getUTCSeconds().toString().padStart(2, '0');

  if (type == 'time') {
    return useSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
  } else if (type == 'datetime-local') {
    return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
  } else {
    return `${YYYY}-${MM}-${DD}`;
  }
};

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    valueAsNumber: {
      type: Number,
    },
    valueAsDate: {
      type: Date,
    },
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
  },

  computed: {
    useSeconds() {
      return (this.type=='time') && !!this.$attrs['step'] && parseInt(this.$attrs['step']) !== 60;
    },

    value_() {
      return !!this.valueAsNumber
        ? getFormatedDate(new Date(this.valueAsNumber), this.type, this.useSeconds)
        : !!this.valueAsDate
        ? getFormatedDate(this.valueAsDate, this.type, this.useSeconds)
        : this.value;
    },
  },

  methods: {
    handleChange(event) {
      let valueAsNumber;
      let valueAsDate;

      if (['time', 'datetime-local'].includes(this.type)){
        valueAsNumber = event.target.valueAsNumber;
        valueAsDate = new Date(valueAsNumber);
      } else {
        valueAsDate = event.target.valueAsDate;
        valueAsNumber = +valueAsDate;
      }

      this.$emit('update:valueAsNumber', valueAsNumber);
      this.$emit('update:valueAsDate', valueAsDate);
      this.$emit('update:value', event.target.value);
    },
  },
};
</script>

<style scoped></style>
