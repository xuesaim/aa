import { payment, pay_confirm, pay_method, pay_success,order_success,order_faile,pay_voucher,pay_supplier} from './router_payment'
import { cion_account, cion_recharge, cion_trade,cion_transfer,cion_chose,cion_transfer_check,cion_transfer_sure,trade_detail} from './router_cion'
import { service_list, service_detail, service_list_applay,service_progress,applay_write,service_applay} from './router_service'
import { order_list,totle,obligation,shipment,received,merchbill,order_detail,order_sure,logistics_detail,order_sure_time} from './router_order'
import { wallet,myindex,guarantee} from './router_wallet'
const routers = [{
  path: '/cion/cion_account', //首页
  component(resolve) {
    require.ensure(['../view/cion/cion_account.vue'], () => {
      resolve(require('../view/cion/cion_account.vue'));
    });
  }
},

/** -- 支付模块 begin -- */
  payment, pay_confirm, pay_success, order_success,order_faile,pay_method,pay_voucher,pay_supplier,
/** -- 支付模块 end -- */

/** -- 订单模块 begin -- */
 order_list,merchbill,order_detail,order_sure,logistics_detail,order_sure_time,
/** -- 订单模块 end -- */

/** -- 福币模块 begin -- */
  cion_account, cion_recharge, cion_trade, cion_transfer,cion_chose,cion_transfer_check,cion_transfer_sure,trade_detail,
/** -- 福币模块 end -- */


/** -- 售后模块 begin -- */
  service_list,service_detail,service_list_applay,service_progress,applay_write,service_applay,
/** -- 售后模块 end -- */


/** -- 保障卡模块 begin -- */
  myindex,wallet,guarantee,
/** -- 保障卡模块 end -- */


];

export default routers;
