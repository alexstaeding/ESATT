plugins {
  application
  kotlin("jvm")
  id("com.github.johnrengelman.shadow").version("6.1.0")
}
repositories {
  mavenCentral()
}

dependencies {
  implementation(project(":api"))
  val guiceVersion = "5.0.0-BETA-1"
  implementation("com.google.inject.extensions:guice-servlet:$guiceVersion")
  implementation("com.google.code.gson:gson:2.8.6")
  implementation("javax.servlet:javax.servlet-api:3.1.0")
  val jettyVersion = "9.4.35.v20201120"
  implementation("org.eclipse.jetty:jetty-server:$jettyVersion")
  implementation("org.eclipse.jetty:jetty-servlet:$jettyVersion")
  implementation("org.slf4j:slf4j-simple:1.7.30")
  implementation("dev.morphia.morphia:morphia-core:2.1.4")
}

application {
  mainClassName = "org.bpg20.esatt.common.MainKt"
}

tasks.shadowJar {
  archiveName = "ESATT-${project.version}.jar"
}
