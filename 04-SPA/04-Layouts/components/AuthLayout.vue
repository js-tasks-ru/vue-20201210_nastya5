<template>
  <div class="page page_onboarding">
    <section>
      <h2>{{ title }}</h2>
      <slot />
    </section>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
</style>
