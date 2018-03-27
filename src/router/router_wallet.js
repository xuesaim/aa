/**
 * 保障卡路由配置
 */

export const myindex = {
  path: '/card/user', 
  component(resolve) {
    require.ensure(['../view/card/user.vue'], () => {
      resolve(require('../view/card/user.vue'));
    });
  }
}
export const wallet = {
  path: '/card/wallet', 
  component(resolve) {
    require.ensure(['../view/card/wallet.vue'], () => {
      resolve(require('../view/card/wallet.vue'));
    });
  }
}
export const guarantee = {
  path: '/card/guarantee', 
  component(resolve) {
    require.ensure(['../view/card/guarantee.vue'], () => {
      resolve(require('../view/card/guarantee.vue'));
    });
  }
}

