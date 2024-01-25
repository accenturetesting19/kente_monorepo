/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const microservices_controller_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(6);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [microservices_controller_1.authenticationController],
        providers: [
            {
                provide: "AUTHENTICATION",
                useFactory: () => {
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: "localhost",
                            port: 4000,
                        },
                    });
                },
            },
        ],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authenticationController = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(7);
let authenticationController = class authenticationController {
    constructor(client) {
        this.client = client;
    }
    auth(mtnId) {
        return this.client.send({ cmd: "MTN_ID_VERIFICATION", role: ["admin", "user", "manager"] }, mtnId);
    }
    valid(accessToken) {
        return this.client.send({ cmd: "MTN_ID_ACCESS_TOKEN_VERIFCATION" }, accessToken);
    }
};
exports.authenticationController = authenticationController;
tslib_1.__decorate([
    (0, common_1.Post)(":mtnId"),
    tslib_1.__param(0, (0, common_1.Param)("mtnId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], authenticationController.prototype, "auth", null);
tslib_1.__decorate([
    (0, common_1.Get)("validate/:accessToken"),
    tslib_1.__param(0, (0, common_1.Param)("accessToken")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], authenticationController.prototype, "valid", null);
exports.authenticationController = authenticationController = tslib_1.__decorate([
    (0, common_1.Controller)("authentication"),
    (0, swagger_1.ApiTags)('Kente client microservices'),
    tslib_1.__param(0, (0, common_1.Inject)("AUTHENTICATION")),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], authenticationController);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(9), exports);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthLibraryModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const jwt_1 = __webpack_require__(10);
const auth_controller_1 = __webpack_require__(11);
const auth_service_1 = __webpack_require__(12);
const auth_repository_1 = __webpack_require__(13);
const db_connect_1 = __webpack_require__(17);
const config_1 = __webpack_require__(19);
let AuthLibraryModule = class AuthLibraryModule {
};
exports.AuthLibraryModule = AuthLibraryModule;
exports.AuthLibraryModule = AuthLibraryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['stagging.env', 'development.env', 'production.env', '.env'],
                isGlobal: true,
                cache: true,
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env["JWT_ACCESS_SECRET"],
                signOptions: { expiresIn: '1m' },
            }),
        ],
        controllers: [auth_controller_1.microservicesController],
        providers: [
            auth_service_1.authService, ...db_connect_1.DbConnector, ...auth_repository_1.AuthRepo,
        ],
        exports: [],
    })
], AuthLibraryModule);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.microservicesController = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(6);
const auth_service_1 = __webpack_require__(12);
let microservicesController = class microservicesController {
    constructor(auth) {
        this.auth = auth;
    }
    //emit the messages => verify user my MTN ID
    //params to receive a command and a role
    async verifyID(id) {
        return await this.auth.FindID(id);
    }
    jwtVerification(id) {
        return this.auth.validateToken(id);
    }
};
exports.microservicesController = microservicesController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'MTN_ID_VERIFICATION', role: ['admin', 'user', 'manager'] }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], microservicesController.prototype, "verifyID", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'MTN_ID_ACCESS_TOKEN_VERIFCATION' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], microservicesController.prototype, "jwtVerification", null);
exports.microservicesController = microservicesController = tslib_1.__decorate([
    (0, common_1.Controller)('microservices-auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.authService !== "undefined" && auth_service_1.authService) === "function" ? _a : Object])
], microservicesController);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authService = void 0;
const tslib_1 = __webpack_require__(3);
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = __webpack_require__(4);
const jwt_1 = __webpack_require__(10);
let authService = class authService {
    constructor(auth, jwtService) {
        this.auth = auth;
        this.jwtService = jwtService;
    }
    async FindID(MTN_ID) {
        const user = await this.auth.findOne({ where: { MTN_ID } });
        if (!user) {
            return {
                status: {
                    code: common_1.HttpStatus.FORBIDDEN,
                    error: ["INVALID ACCESS TOKEN PROVIDED"],
                    MTN_ID: MTN_ID,
                },
            };
        }
        return { access_token: await this.jwtService.signAsync({ sub: user }) };
    }
    async validateToken(MTN_ID) {
        try {
            const decode = await this.jwtService.verify(MTN_ID);
            if (decode)
                return { valid: true };
        }
        catch (error) {
            common_1.Logger.error(error);
            common_1.Logger.log(error);
            return {
                status: {
                    code: common_1.HttpStatus.CONFLICT,
                    error: error,
                },
            };
        }
    }
};
exports.authService = authService;
exports.authService = authService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)("AUTH_REPO")),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], authService);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRepo = void 0;
const auth_entity_1 = __webpack_require__(14);
exports.AuthRepo = [
    {
        provide: 'AUTH_REPO',
        useValue: auth_entity_1.authEntity,
    },
];


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authEntity = void 0;
const tslib_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(15);
const sequelize_typescript_1 = __webpack_require__(16);
let authEntity = class authEntity extends sequelize_typescript_1.Model {
};
exports.authEntity = authEntity;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
    }),
    tslib_1.__metadata("design:type", String)
], authEntity.prototype, "MTN_ID", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
    }),
    tslib_1.__metadata("design:type", String)
], authEntity.prototype, "Name", void 0);
exports.authEntity = authEntity = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "authentication",
        schema: 'auth'
    })
], authEntity);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbConnector = void 0;
const sequelize_typescript_1 = __webpack_require__(16);
const entities_1 = __webpack_require__(18);
const config_1 = __webpack_require__(19);
exports.DbConnector = [
    {
        provide: "SEQUELIZE",
        import: [config_1.ConfigService],
        useFactory: async (config) => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: "postgres",
                host: process.env["HOST"],
                port: parseInt(process.env["PORT"]),
                username: process.env["NAME"],
                password: process.env["PASSWORD"],
                database: process.env["DATABASE"],
                standardConformingStrings: false,
                dialectOptions: {
                    clientMinMessages: "ignore",
                },
                define: {
                    freezeTableName: true,
                    createdAt: false,
                    updatedAt: false,
                },
            });
            sequelize.addModels(entities_1.Entities);
            return sequelize;
        },
    },
];


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entities = void 0;
const auth_entity_1 = __webpack_require__(14);
exports.Entities = [
    auth_entity_1.authEntity
];


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(6);
const auth_library_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(7);
async function bootstrap() {
    //micro services application module 
    const app = await core_1.NestFactory.create(auth_library_1.AuthLibraryModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: "localhost",
            port: 4000,
        },
    });
    //create client app
    const client = await core_1.NestFactory.create(app_module_1.AppModule);
    //swagger setup details
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Client authentication microservices - Kente")
        .setDescription("Microservices api")
        .setVersion("0.1")
        .addTag("Kente platform")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(client, config);
    swagger_1.SwaggerModule.setup("api", client, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.startAllMicroservices();
    await client.listen(3000);
    common_1.Logger.log("Auth microservice running");
    common_1.Logger.log("Auth microservice ");
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map