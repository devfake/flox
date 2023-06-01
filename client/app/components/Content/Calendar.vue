<template>
  <main class="calendar-main no-select" v-hotkey="keymap">
    <transition mode="out-in" name="fade">
      <div class="wrap-content calendar-wrap" v-if=" ! loading">
        <calendar-view
          :show-date="showDate"
          :items="filteredItems"
          @click-item="navigateToItem"
          :starting-day-of-week="1"
          class="theme-default">
          <calendar-view-header
            title="You can also use the arrow keys"
            slot="header"
            slot-scope="t"
            :header-props="t.headerProps"
            @input="setShowDate"
          >
          </calendar-view-header>
        </calendar-view>
      </div>
    </transition>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
  import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
  import http from 'axios';
  import isBetween from 'dayjs/plugin/isBetween';
  import dayjs from 'dayjs';
  import {mapState, mapMutations, mapActions} from 'vuex';
  import MiscHelper from '../../helpers/misc';

  import 'vue-simple-calendar/static/css/default.css';

  dayjs.extend(isBetween);
  
  export default  {
    mixins: [MiscHelper],

    data() {
      return {
        showDate: new Date(),
        items: [],
        filteredItems: []
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading,
      }),

      keymap () {
        return {
          left: this.navigateViaKey,
          right: this.navigateViaKey,
        }
      }
    },
    
    created() {
      this.setPageTitle(this.lang('calendar'));
      this.SET_LOADING(true);
      this.checkForDate();

      http(`${config.api}/calendar`).then(value => {
        this.items = value.data;
        this.SET_LOADING(false);
        this.removeItemsOutsideOfMonth();
      });
    },

    watch: {
      $route() {
        this.checkForDate();
        this.removeItemsOutsideOfMonth();
      }
    },
    
    methods: {
      ...mapMutations([ 'SET_LOADING' ]),
      ...mapActions([ 'setPageTitle' ]),

      removeItemsOutsideOfMonth() {
        const date = dayjs(this.showDate);
        const firstDay = date.startOf('month');
        const lastDay = date.endOf('month');

        this.filteredItems = this.items.filter(item => {
          return dayjs(item.startDate).isBetween(firstDay, lastDay);
        });
      },
      
      navigateViaKey({keyCode}) {
        const date = dayjs(this.showDate);
        
        switch(keyCode) {
          case 37:
            return this.setShowDate(date.subtract(1, 'month'));
          case 39:
            return this.setShowDate(date.add(1, 'month'));
        }
      },
      
      checkForDate() {
        const {date} = this.$route.query;

        if (date) {
          this.showDate = dayjs(date).toDate();
        } else {
          this.showDate = new Date();
        }
      },

      setShowDate(date) {
        date = dayjs(date).format('YYYY-MM-DD');
        
        this.showDate = date;

        this.$router.push({ name: 'calendar', query: {date}});

        this.removeItemsOutsideOfMonth();
      },

      navigateToItem(item) {
        const {tmdb_id, type} = item.originalItem;
        
        this.$router.push(`/${type}/${tmdb_id}`);
      }
    },
    
    components: {
      CalendarView,
      CalendarViewHeader
    }
  }
</script>
