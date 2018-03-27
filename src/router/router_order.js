//订单模块路由

export const order_list = {
	path: '/order/order_list',
	component(resolve) {
		require.ensure(['../view/order/order_list.vue'], () => {
			resolve(require('../view/order/order_list.vue'));
		});
	},
	children: [{
		path: '/order/totle',
		component(resolve) {
			require.ensure(['../view/order/totle.vue'], () => {
				resolve(require('../view/order/totle.vue'));
			});
		}
	}, {
		path: '/order/obligation',
		component(resolve) {
			require.ensure(['../view/order/obligation.vue'], () => {
				resolve(require('../view/order/obligation.vue'));
			});
		}
	}, {
		path: '/order/shipment',
		component(resolve) {
			require.ensure(['../view/order/shipment.vue'], () => {
				resolve(require('../view/order/shipment.vue'));
			});
		}
	}, {
		path: '/order/received',
		component(resolve) {
			require.ensure(['../view/order/received.vue'], () => {
				resolve(require('../view/order/received.vue'));
			});
		}
	}]
}

export const merchbill = {
	path: '/order/merchbill',
	component(resolve) {
		require.ensure(['../view/order/merchbill.vue'], () => {
			resolve(require('../view/order/merchbill.vue'));
		});
	}
}
export const order_detail = {
	path: '/order/order_detail',
	component(resolve) {
		require.ensure(['../view/order/order_detail.vue'], () => {
			resolve(require('../view/order/order_detail.vue'));
		});
	}
}
export const order_sure = {
	path: '/order/order_sure',
	component(resolve) {
		require.ensure(['../view/order/order_sure.vue'], () => {
			resolve(require('../view/order/order_sure.vue'));
		});
	}
}
export const logistics_detail = {
	path: '/order/logistics_detail',
	component(resolve) {
		require.ensure(['../view/order/logistics_detail.vue'], () => {
			resolve(require('../view/order/logistics_detail.vue'));
		});
	}
}
export const order_sure_time = {
	path: '/order/order_sure_time',
	component(resolve) {
		require.ensure(['../view/order/order_sure_time.vue'], () => {
			resolve(require('../view/order/order_sure_time.vue'));
		});
	}
}