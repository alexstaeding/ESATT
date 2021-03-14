plugins {
  application
  `java-library`
  kotlin("jvm")
  kotlin("plugin.serialization")
  id("com.github.johnrengelman.shadow")
}
repositories {
  mavenCentral()
  maven("https://kotlin.bintray.com/kotlinx")
}

dependencies {
  api("com.google.inject:guice:5.0.1")
  api("com.google.code.gson:gson:2.8.6")
  api("org.slf4j:slf4j-api:1.7.30")
  api("org.slf4j:slf4j-simple:1.7.30")
  api("dev.morphia.morphia:morphia-core:2.1.4")
  val ktorVersion = "1.5.2"
  api("io.ktor:ktor-server-core:$ktorVersion")
  api("io.ktor:ktor-server-netty:$ktorVersion")
  api("io.ktor:ktor-serialization:$ktorVersion")
  api("io.ktor:ktor-client-gson:$ktorVersion")
  api("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.3")
  val kotlinxSerializationVersion = "1.1.0"
  api("org.jetbrains.kotlinx:kotlinx-serialization-core:$kotlinxSerializationVersion")
  api("org.jetbrains.kotlinx:kotlinx-serialization-core-jvm:$kotlinxSerializationVersion")
  api("org.jetbrains.kotlinx:kotlinx-serialization-json:$kotlinxSerializationVersion")
  api("ch.qos.logback:logback-classic:1.2.3")
}

application {
  mainClassName = "org.bpg20.esatt.common.MainKt"
}

tasks.shadowJar {
  archiveName = "ESATT-Backend-${project.version}.jar"
}
