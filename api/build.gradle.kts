plugins {
  `java-library`
  kotlin("jvm")
}
repositories {
  mavenCentral()
}
dependencies {
  // dependency injection
  val guiceVersion = "5.0.0-BETA-1"
  api("com.google.inject:guice:$guiceVersion")
  // logging
  api("org.slf4j:slf4j-api:1.7.30")
}
