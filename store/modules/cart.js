// import { login } from 'http'

export default {
  state: {
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  },
  getters:{
    // 购物车中所有商品的总数量
    total(state) {
      /*let c = 0
      // 循环统计商品的数量，累加到变量 c 中
      if(state.cart.length ===0) return c
      state.cart.forEach(goods => c += goods.goods_count)
      return c*/
      return state.cart.reduce((adder, item) => adder += item.goods_count, 0)
    },
    // 勾选的商品的总数量
    checkedCount(state) {
      // 方法一
      // return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
      // 方法二
      return state.cart.reduce((adder, item) => item.goods_state ? adder += item.goods_count : adder, 0)
    },
    // 已勾选的商品的总价
    checkedGoodsAmount(state) {
      return state.cart.reduce((adder, item) => {
        return item.goods_state ? adder += item.goods_count * item.goods_price : adder
      }, 0).toFixed(2)
    }
  },
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if(!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('saveToStorage')
    },

    // 将购物车中的数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },

    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 有对应的商品信息对象
      if (findResult) {
        // 更新对应商品的勾选状态
        findResult.goods_state = goods.goods_state
        // 持久化存储到本地
        this.commit('saveToStorage')
      }
    },

    // 更新购物车中商品的数量
    updateGoodsCount(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if(findResult) {
        // 更新对应商品的数量
        findResult.goods_count = goods.goods_count
        // 持久化存储到本地
        this.commit('saveToStorage')
      }
    },

    // 根据 Id 从购物车中删除对应的商品信息
    removeGoodsById(state, goods_id) {
      // 调用数组的 filter 方法进行过滤
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      // 持久化存储到本地
      this.commit('saveToStorage')
    },

    // 更新所有商品的勾选状态
    updateAllGoodsState(state, newState) {
      // 循环更新购物车中每件商品的勾选状态
      state.cart.forEach(x => x.goods_state = newState)
      // 持久化存储到本地
      this.commit('saveToStorage')
    },
    
    removeCart(state) {
      uni.removeStorageSync('cart')
      state.cart = []
    }
  },
  actions: {
    /*async login ({ commit }, { account, password }) {
      const { code, data } = await login(account, password)
      if (code === 200) {
        commit('login', data)
        window.localStorage.setItem('sph_token', data.token)
      }
    }*/
  }
}
