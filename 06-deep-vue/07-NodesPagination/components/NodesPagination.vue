<script>
export default {
  name: 'NodesPagination',

  props: {
    page: Number,
    perPage: Number,
  },

   render(h) {
    if(Array.isArray(this.$slots.default)){
      return h('div', this.$slots.default.slice((this.page-1)*this.perPage, this.page*this.perPage));
    } else {
      return h('div', this.$slots.default);
    }
  },

};
</script>

<style scoped></style>
