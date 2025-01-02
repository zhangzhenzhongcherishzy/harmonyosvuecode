//引入了 NavigationGuardNext 和 RouteLocationNormalized 类型，用于类型检查。
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

//导入自定义的路由实例 router，需要从项目的 router 文件中引入
import router from '@/router'

export const setupPermission = () => {
  // whiteList 定义了白名单路由，例如 /login，无需权限即可访问。
  const whiteList = ['/LoginView','/RegisterView']
  //to：目标路由对象。from：来源路由对象。next：控制导航的函数。
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const hasToken = localStorage.getItem('token')
      if (hasToken) {
        //已登录情况下：如果目标路径是 /loginView，直接跳转到首页 /，防止已登录用户重复访问登录页。否则允许访问目标路由。
        if (to.path === '/LoginView') {
          next({ path: '/' })
        } else {
          next()
        }
      } else {
        //未登录情况下：如果目标路径在白名单中（如/loginView），允许访问。否则调用 redirectToLogin 函数，将用户重定向到登录页，并附带重定向参数。
        //includes 是 JavaScript 中 Array 类型的一个方法，用于判断一个数组是否包含某个指定的值。如果数组中包含该值，则返回 true，否则返回 false
        if (whiteList.includes(to.path)) {
          next()
        } else {
          redirectToLogin(to, next)
        }
      }
    },
  )
}

/*重定向到登录页 */
function redirectToLogin(to: RouteLocationNormalized, next: NavigationGuardNext) {
  //提取目标路由的查询参数：用 URLSearchParams 将 to.query 转换为一个可操作的查询参数对象  to.query 是目标路由对象的查询参数（通常是键值对形式的对象）
  const params = new URLSearchParams(to.query as Record<string, string>)

  //构造查询字符串：使用 params.toString() 将查询参数对象转换为 URL 编码的查询字符串格式
  const queryString = params.toString()

  // 拼接重定向地址：判断是否存在查询字符串：如果存在，将 to.path 和 queryString 拼接，形成完整路径（例如：/somepath?id=123&name=test）。如果不存在，仅保留路径部分（例如：/somepath）。
  const redirect = queryString ? `${to.path}?${queryString}` : to.path

  //调用 next 进行跳转：构造登录页的重定向地址：/login?redirect=...。使用 encodeURIComponent 对重定向路径进行编码，确保路径中的特殊字符不会导致错误。,调用 next 将用户导航到构造好的登录页地址。
  next(`/LoginView?redirect=${encodeURIComponent(redirect)}`)
}
