<template>
  <button type="button" @click="localCount++">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  data() {
    return {
      localCount: 0,
    };
  },
 
  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        if (this.localCount!==newValue) {
          this.localCount = newValue;
        }
      },
    },

    localCount: {
      handler(newValue) {
        this.$emit(`increment`, newValue);
      },
    },
  },
  
};
</script>

<style></style>
