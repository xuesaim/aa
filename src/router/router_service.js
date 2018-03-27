//京东售后模块路由
export const service_list = {
  path: '/service/service_list', 
  component(resolve) {
    require.ensure(['../view/service/service_list.vue'], () => {
      resolve(require('../view/service/service_list.vue'));
    });
  },
  
  children:[
    	{
		  path: '/service/service_list_applay', 
		  name: "service_list_applay",
		  component(resolve) {
		    require.ensure(['../view/service/service_list_applay.vue'], () => {
		      resolve(require('../view/service/service_list_applay.vue'));
		    });
		  }
		},
    	{
		  path: '/service/service_progress', 
		  name: "service_progress",
		  component(resolve) {
		    require.ensure(['../view/service/service_progress.vue'], () => {
		      resolve(require('../view/service/service_progress.vue'));
		    });
		  }
		}
    ]
  
}

export const service_applay = {
  path: '/service/service_applay', 
  component(resolve) {
    require.ensure(['../view/service/service_applay.vue'], () => {
      resolve(require('../view/service/service_applay.vue'));
    });
  }
}

export const service_list_applay = {
  path: '/service/service_list/service_list_applay', 
  component(resolve) {
    require.ensure(['../view/service/service_list_applay.vue'], () => {
      resolve(require('../view/service/service_list_applay.vue'));
    });
  }
}
export const service_progress = {
  path: '/service/service_list/service_progress', 
  component(resolve) {
    require.ensure(['../view/service/service_progress.vue'], () => {
      resolve(require('../view/service/service_progress.vue'));
    });
  }
}

export const service_detail = {
  path: '/service/service_detail', 
  component(resolve) {
    require.ensure(['../view/service/service_detail.vue'], () => {
      resolve(require('../view/service/service_detail.vue'));
    });
  }
}

export const applay_write = {
  path: '/service/applay_write', 
  component(resolve) {
    require.ensure(['../view/service/applay_write.vue'], () => {
      resolve(require('../view/service/applay_write.vue'));
    });
  }
}

