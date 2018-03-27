//import 数据 from ''	这里面可以获取数据
import * as types from './type'

export default{

	/*头部信息*/
	SHOW_HEAD_SUCC:({commit})=>{
		commit(types.HEAD_SHOW_SUCCESS);
	},
	SHOW_HEAD_FAIL:({commit})=>{
		commit(types.HEAD_SHOW_FAIL);
	},
	/*loading*/
	hideLoading:({commit})=>{
		commit(types.HIDE_LOADING)
	},
	showLoading:({commit})=>{
		commit(types.SHOW_LOADING)
	},
	/*底部条*/
	hideFooter:({commit})=>{
		commit(types.FOOTER_HIDE);
	},
	showFooter:({commit})=>{
		commit(types.FOOTER_SHOW)
	},
	
	/*订单状态*/
	SET_ORDER_STATUS:({commit})=>{
		commit(types.ORDER_STATUS_SET);
	},
	REMOVE_ORDER_STATUS:({commit})=>{
		commit(types.ORDER_STATUS_REMOVE);
	},
	
	/*订单列表*/
	GET_ORDER_LIST:({commit})=>{
		commit(types.ORDER_LIST_GET);
	},
	
	/*订单详情*/
	GET_ORDER_DETAIL:({commit})=>{
		commit(types.ORDER_DETAIL_GET);
	},
}
