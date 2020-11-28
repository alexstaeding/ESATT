package org.bpg20.esatt.common.servlet

import com.google.inject.servlet.ServletModule

class CommonServletModule : ServletModule() {
  override fun configureServlets() {
    super.configureServlets()
    bind(FooServlet::class.java)
    serve("/foo").with(FooServlet::class.java)
  }
}
