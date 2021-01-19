package org.bpg20.esatt.common.servlet

import com.google.inject.servlet.ServletModule
import org.bpg20.esatt.common.servlet.department.DepartmentServlet
import org.bpg20.esatt.common.servlet.department.DepartmentSingleServlet
import org.bpg20.esatt.common.servlet.evaluationscheme.EvaluationSchemeServlet
import org.bpg20.esatt.common.servlet.evaluationscheme.EvaluationSchemeSingleServlet
import org.bpg20.esatt.common.servlet.thesis.ThesisServlet
import org.bpg20.esatt.common.servlet.thesis.ThesisSingleServlet
import org.bpg20.esatt.common.servlet.user.UserServlet
import org.bpg20.esatt.common.servlet.user.UserSingleServlet

class CommonServletModule : ServletModule() {
  override fun configureServlets() {
    super.configureServlets()
    serve("/api/v1/departments").with(DepartmentServlet::class.java)
    serve("/api/v1/departments/*").with(DepartmentSingleServlet::class.java)
    serve("/api/v1/evaluation-schemes").with(EvaluationSchemeServlet::class.java)
    serve("/api/v1/evaluation-schemes/*").with(EvaluationSchemeSingleServlet::class.java)
    serve("/api/v1/theses").with(ThesisServlet::class.java)
    serve("/api/v1/theses/*").with(ThesisSingleServlet::class.java)
    serve("/api/v1/users").with(UserServlet::class.java)
    serve("/api/v1/users/*").with(UserSingleServlet::class.java)
  }
}
