plugins {
  application
  val kotlinVersion = "1.4.31"
  kotlin("jvm").version(kotlinVersion)
  kotlin("plugin.serialization").version(kotlinVersion)
  id("com.github.johnrengelman.shadow").version("6.1.0")
}

allprojects {
  group = "org.bpg20"
  version = "1.0.0"

  repositories {
    mavenCentral()
    jcenter()
    maven("https://kotlin.bintray.com/kotlinx")
    maven("https://repo.spongepowered.org/repository/maven-public/")
  }
}

dependencies {
  implementation(project(":common"))
  implementation(project(":web"))
}

application {
  mainClassName = "org.bpg20.esatt.common.MainKt"
}

tasks.shadowJar {
  archiveName = "ESATT-${project.version}.jar"
}
