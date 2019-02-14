<template>
  <div class="search-box">
    <div class="main">
      <transition name="slide">
        <slot  name="main">
        </slot>
      </transition>
    </div>
    <div class="folder" v-show="showFolder">
      <div v-if="showMore" class="more-view">
        <p class="more-line" @click="switchMore">收起</p>
      </div>
      <div v-show="!showMore" class="less-view">
        <p class="less-line" @click="switchMore">更多搜索条件</p>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  data () {
    return {
      showMore: false,
      showFolder: false
    }
  },
  methods: {
    switchMore () {
      this.showMore = !this.showMore
      this.init()
    },
    init () {
      let items = this.$el.querySelectorAll('.search-box-item')
      let num = items.length
      let boxWidth = this.$el.querySelector('.main').offsetWidth
      let itemWidth = this.$el.querySelector('.search-box-item').offsetWidth
      let maxNum = (itemWidth === 0) ? 0 : Math.floor(boxWidth / itemWidth)
      if (num <= maxNum) {
        this.showFolder = false;
      } else {
        this.showFolder = true;
      }
      if (this.showMore || num <= maxNum) {
        for (let i = maxNum - 1; i < num - 1; i++) {
          items[i].style.display = 'inline-block'
        }
      } else {
        for (let i = maxNum - 1; i < num - 1; i++) {
          items[i].style.display = 'none'
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>

<style lang="scss" scoped>
.search-box{
  display: inline-block;
  box-sizing: border-box;
  margin: 20px 0;
  padding:20px 20px 5px 20px;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
  .main{
    .slide-enter-active,.slide-leave-active{
      transition: opacity .5s;
    }
  }
  .folder{
    margin-top: -15px;
    .less-view{
      height: 30px;
      line-height: 30px;
    }
    .more-line,.less-line{
      text-align: center;
      font-size: 12px;
      cursor:pointer;
      color: #8cc5ff;
    }
    .more-line {
      height: 30px;
      line-height: 30px;
    }
  }

}
</style>
