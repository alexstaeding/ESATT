package org.bpg20.esatt.common.servlet

import com.google.inject.Singleton
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Singleton
class FooServlet : HttpServlet() {
  override fun doGet(request: HttpServletRequest, response: HttpServletResponse) {
    response.contentType = "text/html"
    val out = response.writer
    out.println("<HTML>")
    out.println("<head><title>Hello World</title></head>")
    out.println("<body>")
    out.println("<h1>Hello World</h1>")
    out.println("</body></html>")
  }
}
