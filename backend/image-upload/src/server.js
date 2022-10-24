"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var signature_service_1 = require("./signature-service");
// import express from "express";
var express = require("express");
// import https from "https";
var https = require("https");
var cors = require("cors");
var path = require("path");
var fse = require("fs-extra");
var formidableMiddleware = require("express-formidable");
// import formidableMiddleware from "express-formidable";
var persistence_service_1 = require("./persistence-service");
// import path from 'path';
// import path from 'node:path';
var assets_service_1 = require("./assets-service");
var ready = false;
getReady();
function getReady() {
    return __awaiter(this, void 0, void 0, function () {
        function getSignatureFromRequest(req) {
            if (req.headers.signature !== undefined) {
                return req.headers.signature;
            }
            else if (req.body.signature !== undefined) {
                return req.body.signature;
            }
            else if (req.query.signature !== undefined) {
                return req.query.signature;
            }
            else {
                throw new Error("I could not find a signature in the request");
            }
        }
        function validateSignatureMiddleware(req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var signature, signatureService, publicWalletFromSignature, invites, stringifiedInvites, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            signature = getSignatureFromRequest(req);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            signatureService = signature_service_1.SignatureService.getInstance();
                            console.log("validating signature: ".concat(signature, " incl. description ").concat(req.query.description));
                            return [4 /*yield*/, signatureService.getPublicWalletAddressFromSignature(signature, req.query.description)];
                        case 2:
                            publicWalletFromSignature = _a.sent();
                            console.log("publicWalletFromSignature: ".concat(publicWalletFromSignature));
                            return [4 /*yield*/, persistenceService.readInvites()];
                        case 3:
                            invites = _a.sent();
                            console.log("invites: ".concat(JSON.stringify(invites)));
                            stringifiedInvites = JSON.stringify(invites);
                            if (stringifiedInvites.indexOf(publicWalletFromSignature.toLowerCase()) === -1) {
                                console.log("I could not derive an invited wallet address from signature ".concat(signature, "."));
                            }
                            else {
                                console.log("signature check successful");
                                next();
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            console.log("an error occurred while executing validateSignatureMiddleware: ".concat(error_1));
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        var persistenceService, assetsService, app, uploadsFolder, port_1, pathToCertFile, pathToKeyFile, cert, key, options;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (ready)
                        return [2 /*return*/];
                    ready = true;
                    persistenceService = persistence_service_1.PersistenceService.getInstance();
                    assetsService = assets_service_1.AssetsService.getInstance();
                    app = express();
                    uploadsFolder = "".concat(path.join(__dirname, '../..', 'operational-data/cult-uploads'));
                    console.log(uploadsFolder);
                    // const uploadsFolder = `${__dirname}/../../operational-data/cult-uploads`
                    app.use(express.json());
                    app.use("/api/v1/uploadImage", validateSignatureMiddleware);
                    app.use("/api/v1/uploadImage", formidableMiddleware({
                        uploadDir: uploadsFolder,
                        multiples: false,
                        maxFileSize: 20 * 1024 * 1024
                    }));
                    app.use(cors());
                    // http://localhost:8047/api/v1/getImage?name=image-2022-10-24T06:54:29.170Z
                    app.get("/api/v1/getImage", function (req, res) {
                        console.log("sending image ".concat(req.query.name));
                        var htmlToBeSent = "<img src=\"http://localhost:8048/api/v1/getFile?name=".concat(req.query.name, "\" />");
                        console.log(htmlToBeSent);
                        res.send(htmlToBeSent);
                        // res.send(`<img src="https://www.w3schools.com/images/w3schools_green.jpg" />`);
                    });
                    // http://localhost:8047/api/v1/getFile?name=image-2022-10-24T06:54:29.170Z
                    app.get("/api/v1/getFile", function (req, res) {
                        console.log("sending image ".concat(req.query.name));
                        // res.set({'Content-Type': 'image/png'});
                        res.sendFile("".concat(uploadsFolder, "/").concat(req.query.name));
                    });
                    // http://localhost:8047/api/v1/getFileNames
                    app.get("/api/v1/getFileNames", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var listOfFileNames;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, persistenceService.readFileNames(uploadsFolder)];
                                case 1:
                                    listOfFileNames = _a.sent();
                                    res.send(listOfFileNames);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/api/v1/uploadImage', function (req, res) {
                        return __awaiter(this, void 0, void 0, function () {
                            var signature, newPath, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        signature = getSignatureFromRequest(req);
                                        newPath = "".concat(uploadsFolder, "/image-").concat(new Date().toISOString());
                                        console.log(req.files);
                                        return [4 /*yield*/, persistenceService.move(req.files.image.path, newPath)];
                                    case 1:
                                        _a.sent();
                                        console.log("adding asset ".concat(newPath, " ").concat(signature, " ").concat(req.headers.description));
                                        return [4 /*yield*/, assetsService.addAsset(newPath, signature, req.headers.description)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_2 = _a.sent();
                                        throw new Error("error during upload ".concat(error_2));
                                    case 4:
                                        res.send("upload successful");
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    if (!(process.argv[2] === undefined)) return [3 /*break*/, 1];
                    console.log("please specify a port by giving a parameter like 3000");
                    return [3 /*break*/, 5];
                case 1:
                    port_1 = Number(process.argv[2]);
                    if (!(process.argv[2].indexOf("443") === -1)) return [3 /*break*/, 2];
                    app.listen(port_1, function () { return console.log("server has started on http://localhost:".concat(port_1, " \uD83D\uDE80")); });
                    return [3 /*break*/, 5];
                case 2:
                    pathToCertFile = path.join("/etc/letsencrypt/live/cultdonations-org", "fullchain.pem");
                    pathToKeyFile = path.join("/etc/letsencrypt/live/cultdonations-org", "privkey.pem");
                    console.log("reading cert file from ".concat(pathToCertFile));
                    console.log("reading key file from ".concat(pathToKeyFile));
                    return [4 /*yield*/, fse.readFile(pathToCertFile, "utf-8")];
                case 3:
                    cert = _a.sent();
                    return [4 /*yield*/, fse.readFile(pathToKeyFile, "utf-8")
                        // const cert = await persistenceService.readTextFile(pathToCertFile)
                        // const key = await persistenceService.readTextFile(pathToKeyFile)
                        // const cert = await Deno.readTextFile(pathToCertFile);
                        // const key = await Deno.readTextFile(pathToKeyFile);
                    ];
                case 4:
                    key = _a.sent();
                    // const cert = await persistenceService.readTextFile(pathToCertFile)
                    // const key = await persistenceService.readTextFile(pathToKeyFile)
                    // const cert = await Deno.readTextFile(pathToCertFile);
                    // const key = await Deno.readTextFile(pathToKeyFile);
                    console.log(cert.length);
                    console.log(key.length);
                    options = {
                        port: port_1,
                        certFile: pathToCertFile,
                        keyFile: pathToKeyFile
                    };
                    try {
                        https.createServer({
                            cert: cert,
                            key: key
                        }, app).listen(port_1, function () {
                            console.log("server has started on https://localhost:".concat(port_1, " \uD83D\uDE80"));
                        });
                    }
                    catch (error) {
                        console.log("shit happened: ".concat(error));
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
