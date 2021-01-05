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
      view: undefined,
      date: undefined,
      participation: undefined,
      search: undefined,
    };
  },

  /*
  computed: {
    view: {
      get: function () {
        console.log(`get view`);
        return this.view===undefined ? defaultView: this.view;
      },
      set: function (newValue) {
        console.log(`set view: from ${this.view}  to ${newValue}`);
        
        this.view =  newValue;
        this.goToNewLink();
      }
    },
  },*/

  watch: {
    view: function (val) {
      if (val === defaultView) {
        this.view = undefined;
      }
      this.goToNewLink();
    },

    date: function (val) {
      if (val === defaultDate) {
        this.date = undefined;
      }
      this.goToNewLink();
    },

    participation: function (val) {
      if (val === defaultParticipation) {
        this.participation = undefined;
      }
      this.goToNewLink();
    },

    search: function (val) {
      if (val === defaultSearch) {
        this.search = undefined;
      }
      this.goToNewLink();
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
          view: this.view,
          date: this.date,
          participation: this.participation,
          search: this.search,
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
  /*
  beforeRouteEnter(to, from, next) {
    console.log(`beforeRouteEnter: ${to.fullPath}`);

    next((vm) => {
      if (to.query.view) {
        vm.view = to.query.view;
      }

      if (to.query.date) {
        vm.date = to.query.date;
      }

      if (to.query.participation) {
        vm.participation = to.query.participation;
      }

      if (to.query.search) {
        vm.search = to.query.search;
      }
    });
  },*/

  beforeRouteUpdate(to, from, next) {
    console.log(`beforeRouteUpdate: ${to.fullPath}`);

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

    next();
  },
};
</script>

<style scoped></style>
