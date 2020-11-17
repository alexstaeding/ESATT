plugins {
  java
  id("com.github.node-gradle.node") version "2.2.4"
}

node {
  version = "15.2.1"
  npmVersion = "6.14.4"
  download = true
}
