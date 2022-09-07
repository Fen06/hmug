<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_list/goods_list?id=${item.goods_id}`" v-for="item in goods"
      :key="item.goods_id" :num='1' :price="item.goods_price | toFix" desc="描述信息" :title="item.goods_name"
      :thumb="item.goods_big_logo||defaultPic" />
  </view>
</template>

<script>
  import toast from '@/utils/toast.js'
  import {
    goodsList
  } from '@/api/goods.js'
  export default {
    data() {
      return {
        queryData: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        total: 0,
        goods: [],
        isLoading: false,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods: {
      async thisgoodList(stop) {
        this.isLoading = true
        const {
          total,
          goods
        } = await goodsList(this.queryData)
        this.isLoading = false
        this.total = total
        this.goods = [...this.goods, ...goods]
        stop && stop()
        console.log(this.goods)
      },

    },
    onPullDownRefresh() {
      this.queryData = {
        query: this.queryData.query,
        cid: '',
        pagenum: 1,
        pagesize: 10
      }
      this.total = 0
      this.goods = []
      this.thisgoodList(() => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      if (this.queryData.pagenum * this.queryData.pagesize >= this.total) return toast('已经是最后一页了哟')
      if (this.isLoading) return
      this.queryData.pagenum++
      this.thisgoodList()
    },
    onLoad({
      query
    }) {
      this.queryData.query = query
      this.thisgoodList()
    },
  }
</script>

<style lang="scss">

</style>
