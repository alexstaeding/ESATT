plugins {
  application
  `java-library`
  kotlin("jvm")
  kotlin("plugin.serialization")
  id("com.github.johnrengelman.shadow")
}

dependencies {
  api("com.google.inject:guice:5.0.1")
  api("dev.morphia.morphia:morphia-core:2.1.4")
  val ktorVersion = "1.5.2"
  api("io.ktor:ktor-server-core:$ktorVersion")
  api("io.ktor:ktor-server-netty:$ktorVersion")
  api("io.ktor:ktor-serialization:$ktorVersion")
  api("io.ktor:ktor-auth:$ktorVersion")
  api("io.ktor:ktor-auth-ldap:$ktorVersion")
  api("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.3")
  val kotlinxSerializationVersion = "1.1.0"
  api("org.jetbrains.kotlinx:kotlinx-serialization-core:$kotlinxSerializationVersion")
  api("org.jetbrains.kotlinx:kotlinx-serialization-core-jvm:$kotlinxSerializationVersion")
  api("org.jetbrains.kotlinx:kotlinx-serialization-json:$kotlinxSerializationVersion")
  implementation("org.spongepowered:configurate-hocon:4.0.0")

  // logging
  api("org.slf4j:slf4j-api:1.7.30")
  implementation("org.apache.logging.log4j:log4j-slf4j-impl:2.14.0")
  implementation("org.fusesource.jansi:jansi:2.3.1")
}

application {
  mainClassName = "org.bpg20.esatt.common.MainKt"
}

tasks.shadowJar {
  archiveName = "ESATT-Backend-${project.version}.jar"
}
