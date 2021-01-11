<template>
  <div class="main">
    <van-swipe
      class="my-swipe"
      :show-indicators="false"
      :loop="false"
      @change="onChange"
      style="height: 100vh"
      vertical
      indicator-color="white"
    >
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
        <div class="right_menus">
          <div class="menuClick">
            <img class="avatar" :src="item.avatar" alt="" />
            <div class="follow"></div>
          </div>
          <div class="click-info">
            <img class="icon" src="@/assets/icons/xihuan.png" alt="" />
            <div class="text">{{ item.fabulousNum }}</div>
          </div>
          <div class="click-info">
            <img class="icon" src="@/assets/icons/xiaoxi.png" alt="" />
            <div class="text">{{ item.commentNum }}</div>
          </div>
          <div class="click-info">
            <img class="icon" src="@/assets/icons/fenxiang.png" alt="" />
            <div class="text">{{ item.shareNum }}分享</div>
          </div>
        </div>
        <div class="text-container">
          <div class="nickname">@{{ item.nickname }}</div>
          <div class="msg">{{ item.msgInfo }}</div>
        </div>
        <video
          class="video-content"
          :id="`player${index}`"
          :src="item.url"
          controls="controls"
          ref="player"
        ></video>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRef, toRefs, nextTick } from 'vue'
import avatar1 from "../assets/imgs/Tundra_Boots.jpg";
import avatar2 from "../assets/imgs/Weather_Icon.jpg";
import avatar3 from "../assets/imgs/SMAPI_mascot.jpg";
import avatar4 from "../assets/imgs/Wild_Horseradish.jpg";

export default defineComponent({
  name: 'Home',
  setup(props, context) {
    let playing = ref<boolean>(false)
    let player = ref(null)
    const swiperList = reactive([
      {
        avatar: avatar1,
        fabulousNum: "1234W",
        commentNum: "3.2W",
        shareNum: "1.2W",
        nickname: "我是大憨批",
        play: false,
        url: "/ugctest/1603267173372/howesw.mp4",
        msgInfo:
          "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言",
      },
      {
        avatar: avatar2,
        fabulousNum: "558W",
        commentNum: "16.2W",
        shareNum: "12.2W",
        nickname: "liqin是个Der",
        play: false,
        url: "@/assets/video/v0300fba0000bvkr09sd651ape7c4340.MP4",
        msgInfo:
          "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言",
      },
      {
        avatar: avatar3,
        fabulousNum: "3345W",
        commentNum: "122W",
        shareNum: "62W",
        nickname: "Hello Nick",
        play: false,
        url: "@/assets/video/v0300fba0000bvkr09sd651ape7c4340.MP4",
        msgInfo:
          "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言",
      },
      {
        avatar: avatar4,
        fabulousNum: "6889W",
        commentNum: "163W",
        shareNum: "107W",
        nickname: "憨憨来啦",
        play: false,
        url: "../assets/video/v0300fba0000bvkr09sd651ape7c4340.MP4",
        msgInfo:
          "这是留言这是留言这是留言这是留言这是留言这是留言这是留言这是留言",
      },
    ])

    const onChange = async (value: number) => {
      await nextTick()
      console.log(value)
      console.log(player.value)
    }

    nextTick(() => {
      // player.value.play = true
      console.log(player.value)
      // player.value.paused = false
      // player.value.play = true
    })


    onMounted(() => {
      // toGetBeautifulSnowUser()
    });

    return {
      swiperList,
      onChange,
      player
    }
  }
})

</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background: #fff;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 0.2rem;
    text-align: center;
    background-color: #39a9ed;
    position: relative;
    .video-content {
      width: 100%;
    }
    .right_menus {
      position: absolute;
      width: 1.2rem;
      padding: 0.02rem;
      box-sizing: border-box;
      bottom: 1.2rem;
      right: 0;
      .menuClick {
        position: relative;
        width: 100%;
        margin-bottom: 0.2rem;
        .avatar {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          border: #fff 0.02rem solid;
        }
      }
      .click-info {
        position: relative;
        width: 1rem;
        img {
          width: 0.72rem;
          height: 0.72rem;
          margin: 0 auto;
        }
        .text {
          width: 100%;
          height: 0.5rem;
          line-height: 0.5rem;
          color: #fff;
          font-size: 0.16rem;
        }
      }
    }
    .text-container {
      position: absolute;
      width: 6rem;
      left: 0;
      bottom: 0;
      padding: 0.2rem 0.1rem;
      box-sizing: border-box;
      .nickname {
        width: 100%;
        font-size: 0.32rem;
        color: #fff;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: left;
      }
      .msg {
        position: relative;
        width: 100%;
        padding: 0.1rem 0;
        box-sizing: border-box;
        line-height: 0.3rem;
        font-size: 0.28rem;
        text-align: left;
      }
    }
  }
}
</style>