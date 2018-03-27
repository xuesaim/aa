/**
 * 福币路由配置
 */

export const cion_account = {
  path: '/cion/cion_account', 
  component(resolve) {
    require.ensure(['../view/cion/cion_account.vue'], () => {
      resolve(require('../view/cion/cion_account.vue'));
    });
  }
}

export const cion_recharge = {
  path: '/cion/cion_recharge', 
  component(resolve) {
    require.ensure(['../view/cion/cion_recharge.vue'], () => {
      resolve(require('../view/cion/cion_recharge.vue'));
    });
  }
}

export const cion_trade = {
  path: '/cion/cion_trade', 
  component(resolve) {
    require.ensure(['../view/cion/cion_trade.vue'], () => {
      resolve(require('../view/cion/cion_trade.vue'));
    });
  }
}


export const cion_transfer = {
  path: '/cion/cion_transfer', 
  component(resolve) {
    require.ensure(['../view/cion/cion_transfer.vue'], () => {
      resolve(require('../view/cion/cion_transfer.vue'));
    });
  }
}
export const cion_chose = {
  path: '/cion/cion_chose', 
  component(resolve) {
    require.ensure(['../view/cion/cion_chose.vue'], () => {
      resolve(require('../view/cion/cion_chose.vue'));
    });
  }
}

export const cion_transfer_check = {
  path: '/cion/cion_transfer_check', 
  component(resolve) {
    require.ensure(['../view/cion/cion_transfer_check.vue'], () => {
      resolve(require('../view/cion/cion_transfer_check.vue'));
    });
  }
}
export const cion_transfer_sure = {
  path: '/cion/cion_transfer_sure', 
  component(resolve) {
    require.ensure(['../view/cion/cion_transfer_sure.vue'], () => {
      resolve(require('../view/cion/cion_transfer_sure.vue'));
    });
  }
}
//export const cion_order_sure = {
//path: '/cion/order_sure', 
//component(resolve) {
//  require.ensure(['../view/cion/order_sure.vue'], () => {
//    resolve(require('../view/cion/order_sure.vue'));
//  });
//}
//}


export const trade_detail = {
  path: '/cion/trade_detail', 
  component(resolve) {
    require.ensure(['../view/cion/trade_detail.vue'], () => {
      resolve(require('../view/cion/trade_detail.vue'));
    });
  }
}



