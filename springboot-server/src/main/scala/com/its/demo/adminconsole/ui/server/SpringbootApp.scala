package com.its.demo.adminconsole.ui.server

import org.slf4j.LoggerFactory
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.embedded.EmbeddedServletContainerInitializedEvent
import org.springframework.boot.web.servlet.ErrorPage
import org.springframework.context.annotation.{ComponentScan, Configuration}
import org.springframework.context.{ApplicationEvent, ApplicationListener}

@SpringBootApplication
@ComponentScan(basePackages = Array("com.its"))
@Configuration
class SpringbootApp {
  val logger = LoggerFactory.getLogger(this.getClass)

  import org.springframework.boot.context.embedded.{ConfigurableEmbeddedServletContainer, EmbeddedServletContainerCustomizer}
  import org.springframework.context.annotation.Bean
  import org.springframework.http.HttpStatus

  /**
    * Return the index.html to handle the /callback redirect from Auth0 on successful authentication
    * @see https://router.vuejs.org/en/essentials/history-mode.html
    * @return
    */
  @Bean def containerCustomizer: EmbeddedServletContainerCustomizer = new EmbeddedServletContainerCustomizer() {
    override def customize(container: ConfigurableEmbeddedServletContainer): Unit = {
      //val error401Page = new Nothing(HttpStatus.UNAUTHORIZED, "/401.html")
      val error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/index.html")
      //val error500Page = new Nothing(HttpStatus.INTERNAL_SERVER_ERROR, "/500.html")
      // container.addErrorPages(error401Page, error404Page, error500Page)
      container.addErrorPages(error404Page)
    }
  }
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
