package com.its.demo.prodcatalogue.ui.server


import javax.servlet._
import javax.servlet.http.HttpServletResponse

import org.springframework.stereotype.Component


@Component
class CORSFilter extends Filter {

  def doFilter(req: ServletRequest, res: ServletResponse, chain: FilterChain) {
    val response: HttpServletResponse = res.asInstanceOf[HttpServletResponse]
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    response.setHeader("Access-Control-Allow-Headers", "AUTHORIZATION")
    response.setHeader("Access-Control-Max-Age", "3600")
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Max-Age");
    chain.doFilter(req, res)
  }

  def init(filterConfig: FilterConfig) {
  }

  def destroy() {
  }

}