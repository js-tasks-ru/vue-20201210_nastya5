<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const defaultView = 'list';
const defaultDate = 'all';
const defaultParticipation = 'all';
const defaultSearch = '';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      view: defaultView,
      date: defaultDate,
      participation: defaultParticipation,
      search: defaultSearch,
    };
  },

  watch: {
    view: function (val) {
      this.goToNewLink();
    },

    date: function (val) {
      this.goToNewLink();
    },

    participation: function (val) {
      this.goToNewLink();
    },

    search: function (val) {
      this.goToNewLink();
    },

    $route(to, from) {
      //console.log(`watch route: ${to.fullPath}`);

      if (to.query.view) {
        this.view = to.query.view;
      }

      if (to.query.date) {
        this.date = to.query.date;
      }

      if (to.query.participation) {
        this.participation = to.query.participation;
      }

      if (to.query.search) {
        this.search = to.query.search;
      }
    },
  },

  methods: {
    goToNewLink() {
      const isEqualLocation = (location1, location2) => {
        if (location1.path !== location2.path) {
          return false;
        }

        const keys1 = Object.keys(location1.query);
        const keys2 = Object.keys(location2.query);

        if (keys1.length !== keys2.length) {
          return false;
        }

        for (let key of keys1) {
          if (location1.query[key] !== location2.query[key]) {
            return false;
          }
        }

        return true;
      };

      let location = {
        path: '/',
        query: {
          view: this.view !== defaultView ? this.view : undefined,
          date: this.date !== defaultDate ? this.date : undefined,
          participation:
            this.participation !== defaultParticipation
              ? this.participation
              : undefined,
          search: this.search !== defaultSearch ? this.search : undefined,
        },
      };

      if (!isEqualLocation(this.$router.currentRoute, location)) {
        this.$router.push(location);
      }

      /*
      this.$router.push(location).catch((err) => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });*/
    },
  },

  beforeRouteEnter(to, from, next) {
    //console.log(`beforeRouteEnter: ${to.fullPath}`);

    next((vm) => {
      if (to.query.view) {
        vm.view = to.query.view;
      }
      if (to.query.date) {
        vm.date = to.query.date;
      }
      if (to.query.participation) {
        vm.participation;
      }
      if (to.query.search) {
        vm.search = to.query.search;
      }
    });
  },
};
</script>

<style scoped></style>
