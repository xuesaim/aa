//支付模块路由

export const payment = {
  path: '/pay/payment', 
  component(resolve) {
    require.ensure(['../view/pay/payment.vue'], () => {
      resolve(require('../view/pay/payment.vue'));
    });
  }
}

export const pay_confirm = {
  path: '/pay/pay_confirm', 
  component(resolve) {
    require.ensure(['../view/pay/pay_confirm.vue'], () => {
      resolve(require('../view/pay/pay_confirm.vue'));
    });
  }
}

export const pay_method = {
  path: '/pay/pay_method', 
  component(resolve) {
    require.ensure(['../view/pay/pay_method.vue'], () => {
      resolve(require('../view/pay/pay_method.vue'));
    });
  }
}

export const pay_success = {
  path: '/pay/pay_success', 
  component(resolve) {
    require.ensure(['../view/pay/pay_success.vue'], () => {
      resolve(require('../view/pay/pay_success.vue'));
    });
  }
}

export const order_success = {
  path: '/pay/order_success', 
  component(resolve) {
    require.ensure(['../view/pay/order_success.vue'], () => {
      resolve(require('../view/pay/order_success.vue'));
    });
  }
}

export const order_faile = {
  path: '/pay/order_faile', 
  component(resolve) {
    require.ensure(['../view/pay/order_faile.vue'], () => {
      resolve(require('../view/pay/order_faile.vue'));
    });
  }
}

export const pay_voucher = {
  path: '/pay/pay_voucher', 
  component(resolve) {
    require.ensure(['../view/pay/pay_voucher.vue'], () => {
      resolve(require('../view/pay/pay_voucher.vue'));
    });
  }
}

export const pay_supplier = {
  path: '/pay/pay_supplier', 
  component(resolve) {
    require.ensure(['../view/pay/pay_supplier.vue'], () => {
      resolve(require('../view/pay/pay_supplier.vue'));
    });
  }
}