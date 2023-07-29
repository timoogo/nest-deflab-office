import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activez CORS
  app.enableCors({
    origin: 'http://localhost:3000',  // Remplacez par l'URL de votre front-end si différente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3001);

  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: any[] = router.stack
    .map((layer: any) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route.path,
            method: layer.route.stack[0].method,
          },
        };
      }
    })
    .filter((item: any) => item !== undefined);

  Logger.log(availableRoutes, 'Available Routes');
}

bootstrap();
