<template lang="pug">
#v-app
//  .-work(v-for='(work, i) in works',:class='workClass(i)')
//    .-backgrounds
//      div(v-for='i in nBackgrounds',:style='eachBackground(work, i)')
//    .-content
//      .-time {{ work.semester }} {{ work.year }}
//      .-title {{ work.title }}
//      .-description {{ work.description }}
//  #work-index {{ String(activeWork + 1).padStart(2, 0) }}
//  a#go-button(:href='works[activeWork].url') #[i.fas &#xf061;]
//  button#prev-button(@click='prevWork'): i.fas
//  button#next-button(@click='nextWork'): i.fas
</template>

<script>
import _ from 'underscore'
import works from './works'
// import '@fortawesome/fontawesome-free/css/all.css'

export default {

  data() {
    return {
      activeWork: (() => {
        if ('Web' === weex.config.env.platform) {
          const mat = location.hash.match(/^#(\d+)$/)
          return mat ? parseInt(mat[1]) - 1 : 0
        }

        return 0
      })(),
      nBackgrounds: 5,
      orientation: undefined,
      works: works
    }
  },

  created() {
    if ('Web' === weex.config.env.platform) {
      window.addEventListener('keydown', this.onKeydown)
      window.addEventListener('resize', this.onResize)
      window.addEventListener('mousewheel', this.onMousewheel)
    }

    this.onResize()
  },

  destroyed() {
    if ('Web' === weex.config.env.platform) {
      window.removeEventListener('keydown', this.onKeydown)
      window.removeEventListener('resize', this.onResize)
      window.removeEventListener('mousewheel', this.onMousewheel);
    }
  },

  methods: {

    eachBackground(work, i) {
      const focusX = work.imageFocusX || 'center'
      const focusY = work.imageFocusY || 'center'
      const background = 'portrait' === this.orientation
        ? `url(${work.image}) ${focusX} -${i - 1}00% / auto ${this.nBackgrounds}00% repeat-y`
        : `url(${work.image}) -${i - 1}00% ${focusY} / ${this.nBackgrounds}00% auto repeat-x`
      const mask = 'rgba(0,0,0,0)'
      return { background: `linear-gradient(${mask},${mask}),${background}` }
    },

    nextWork() {
      this.activeWork = (this.activeWork + 1) % this.works.length

      if ('Web' === weex.config.env.platform)
        history.replaceState(undefined, undefined, '#' + (this.activeWork + 1))
    },

    onKeydown(e) {
      if ('ArrowDown' === e.key || 'ArrowRight' === e.key) this.nextWork()
      else if ('ArrowLeft' === e.key || 'ArrowUp' === e.key) this.prevWork()
    },

    onMousewheel: _.debounce(function(e) {
      if (e.wheelDelta > 0) this.prevWork()
      else if (e.wheelDelta < 0) this.nextWork()
    }, 50, true),

    onResize() {
      if ('Web' === weex.config.env.platform)
        this.orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      else
        this.orientation = weex.config.env.deviceHeight > weex.config.env.deviceWidth ? 'portrait' : 'landscape'
    },

    prevWork() {
      this.activeWork = (this.activeWork - 1 + this.works.length) % this.works.length

      if ('Web' === weex.config.env.platform)
        history.replaceState(undefined, undefined, '#' + (this.activeWork + 1))
    },

    workClass(i) {
      if (-1 === this.activeWork) return { '-list': true }
      if (0 == i && this.works.length - 1 == this.activeWork) return { '-after': true }
      if (this.works.length - 1 == i && 0 == this.activeWork) return { '-before': true }
      if (i < this.activeWork) return { '-before': true }
      if (i > this.activeWork) return { '-after': true }
      return { '-active': true }
    }

  }

}
</script>

<style lang="sass" scoped>
</style>
