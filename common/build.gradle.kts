plugins {
  application
  `java-library`
  kotlin("jvm")
  id("com.github.johnrengelman.shadow")
}
repositories {
  mavenCentral()
}

dependencies {
  api(project(":api"))
  val guiceVersion = "5.0.0-BETA-1"
  api("com.google.inject.extensions:guice-servlet:$guiceVersion")
  api("com.google.code.gson:gson:2.8.6")
  api("javax.servlet:javax.servlet-api:3.1.0")
  val jettyVersion = "9.4.35.v20201120"
  api("org.eclipse.jetty:jetty-server:$jettyVersion")
  api("org.eclipse.jetty:jetty-servlet:$jettyVersion")
  api("org.slf4j:slf4j-simple:1.7.30")
  api("dev.morphia.morphia:morphia-core:2.1.4")
}

application {
  mainClassName = "org.bpg20.esatt.common.MainKt"
}

tasks.shadowJar {
  archiveName = "ESATT-Backend-${project.version}.jar"
}
