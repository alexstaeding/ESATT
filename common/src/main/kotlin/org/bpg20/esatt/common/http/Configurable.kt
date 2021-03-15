package org.bpg20.esatt.common.http

interface Configurable<R> {
  fun R.configure()
}
