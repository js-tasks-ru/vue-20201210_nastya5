<!--
<template>
  <button
    class="button"
    :class="{ button_block: block }"
    v-bind="$attrs"
    v-on="$listeners"
    :href="$attrs['href']"
    :target="$attrs['target']"
  >
    <slot />
  </button>
</template>-->

<script>

export default {
  name: 'BaseButton',

  inheritAttrs: false,

  props: {
    block: {
      type: Boolean,
    },
    tag: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'a', 'router-link'].includes(value),
    },
  },

  render(h) {
    return h(
      this.tag==='router-link'? 'a' : this.tag,
      {
        class: {
          button: true,
          button_block: this.block,
        },
        on: this.$listeners,
        attrs: {... this.$attrs, href: this.tag==='router-link'? this.$attrs['to'] : this.$attrs['href'] },
      },
      this.$slots.default,
    );
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
