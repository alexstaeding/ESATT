plugins {
  application
  kotlin("jvm").version("1.4.30")
  id("com.github.johnrengelman.shadow").version("6.1.0")
}

allprojects {
  group = "org.bpg20"
  version = "0.1.0-TempCheckIn-RC1"

  repositories {
    mavenCentral()
  }
}

dependencies {
  implementation(project(":api"))
  implementation(project(":common"))
  implementation(project(":web"))
}

application {
  mainClassName = "org.bpg20.esatt.common.MainKt"
}

tasks.shadowJar {
  archiveName = "ESATT-${project.version}.jar"
}
