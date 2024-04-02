"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const morgan = require("morgan");
const constants_1 = require("./constants");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(morgan('dev'));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    const reflector = app.get(core_1.Reflector);
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(reflector));
    const configService = app.get(config_1.ConfigService);
    app.enableCors(constants_1.CORS);
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Task API ')
        .setDescription('Aplicación de gestón de tarea')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(configService.get('PORT'));
    console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map