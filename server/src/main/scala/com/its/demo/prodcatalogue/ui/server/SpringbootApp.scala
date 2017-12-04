package com.its.demo.prodcatalogue.ui.server

import org.slf4j.LoggerFactory
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.embedded.EmbeddedServletContainerInitializedEvent
import org.springframework.context.annotation.{ComponentScan, Configuration}
import org.springframework.context.{ApplicationEvent, ApplicationListener}

@SpringBootApplication
@ComponentScan(basePackages = Array("com.its"))
@Configuration
class SpringbootApp {
}

object SpringbootApp extends App {
  val logger = LoggerFactory.getLogger(this.getClass)

  val listener = new ApplicationListener[ApplicationEvent]() {
    def onApplicationEvent(event: ApplicationEvent): Unit = {
      if (event.isInstanceOf[EmbeddedServletContainerInitializedEvent]) {
        logger.info("*************************************************************")
        logger.info("******************* Successfully Started ********************")
        logger.info("*************************************************************")
      }
    }
  }
  val app = new SpringApplication(classOf[SpringbootApp])
  app.addListeners(listener)
  app.run(args: _*)
}
