plugins {
  java
  id("com.github.johnrengelman.shadow").version("6.1.0")
  id("com.github.node-gradle.node") version "2.2.4"
}

node {
  version = "15.2.1"
  npmVersion = "6.14.4"
  download = true
}

tasks.withType<Jar> {
  dependsOn("npm_run_build")
  from("dist").into("static")
}
