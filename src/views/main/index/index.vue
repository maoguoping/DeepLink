<template>
    <div class="index">
      <div class="pic-wrap pic1">1</div>
      <div class="pic-wrap pic2">
        <el-carousel :interval="5000" arrow="always" class="carouse"
                     height="100%"
        >
          <el-carousel-item v-for="item in picList" :key="item.index">
            <div class="pic-box">
              <img :src="item.src" alt="">
              <h3>{{ item.title }}</h3>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="pic-wrap pic3">3</div>
      <div class="pic-wrap pic4">4</div>
      <div class="pic-wrap pic5">5</div>
      <div class="pic-wrap pic6">6</div>
    </div>
</template>

<script>
import DocLink from '@/components/main/docView/DocLink.vue'
export default {
  name: 'doc-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      listName: '大渣好，我系...',
      picList: [
        {
          index: 0,
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2235822187,2306925314&fm=26&gp=0.jpg',
          title: '三国杀'
        },
        {
          index: 1,
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=360393180,3712545887&fm=26&gp=0.jpg',
          title: '游戏王'
        },
        {
          index: 2,
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2991044372,3216439669&fm=26&gp=0.jpg',
          title: '战地'
        }
      ]
    }
  },
  components: {
    'doc-link': DocLink
  }
}
</script>

<style lang="scss" scoped type="text/scss">
    .index {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns:  1fr  1fr  1fr  1fr ;
        grid-template-rows:  150px 150px 1fr ;
        grid-gap: 20px 20px;
        grid-template-areas: 'a b b c'
                                'a b b d'
                                'e e e f';
        grid-auto-flow: row;
        place-items: start start;
        place-content: center center;
      .pic-wrap {
        width: 100%;
        height: 100%;
        background-color: aqua;
        border-radius: 5px;
        &.pic1 {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
        }
        &.pic2 {
          grid-column: 2 / 4;
          grid-row: 1 / 3;
          .carouse {
            width: 100%;
            height: 100%;
            .el-carousel__item {
              width: 100%;
              height: 100%;
              background-color: #d3dce6;
              .pic-box{
                width: 100%;
                height: 100%;
                position: relative;
                img {
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 5px;
                }
                h3 {
                  position: absolute;
                  width: 100%;
                  text-align: center;
                  bottom: 0;
                  color: #fff;
                  font-size: 20px;
                  font-weight: bold;
                  line-height: 100px;
                  margin: 0;
                }
              }
            }
          }
        }
        &.pic3 {
          grid-column: 4 / 5;
          grid-row: 1 / 2
        }
        &.pic4 {
          grid-column: 4 / 5;
          grid-row: 2 / 3
        }
        &.pic5 {
          grid-column: 1 / 4;
          grid-row: 3 / 4
        }
      }
    }
</style>
