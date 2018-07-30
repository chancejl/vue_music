import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommond from 'components/recommond/recommond'
import Rank from 'components/rank/rank'
import Singer from 'components/singer/singer'
import Search from 'components/search/search'
import SingerDetial from 'components/singer-detial/singer-detial'
import Disc from 'components/disc/disc'
import RankDetail from 'components/rank-detail/rank-detail';
import User from 'components/user/user';
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/recommond',
      component: Recommond,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetial
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/user',
      component:User
    },
    {
      path: '*',
      redirect: '/recommond'
    }
  ]
})
