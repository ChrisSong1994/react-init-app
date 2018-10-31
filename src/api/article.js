import http from '../http'

class Api_article {
  constructor() {

  }

  // 查询文章
  queryArticle(data) {
    return http.post('/api/queryArticles', data)
  }

  // 获取文章详情
  getArticleById(id) {
    return http.get(`/api/getArticle/${id}`)
  }

}

export default new Api_article()