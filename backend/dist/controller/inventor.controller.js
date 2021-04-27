"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var InventorController = /** @class */ (function () {
    function InventorController() {
        this.getAll = function (req, res) {
            var query = "SELECT II.id as id, IR.id as idInventor, IR.nombre as Inventor, I.id as idInvento, I.nombre as Invento, I.anio as Anio_Invento, P.nombre as Pais_Invento FROM Inventor_Invento II " +
                "JOIN Invento I on I.id = II.idinvento " +
                "JOIN Inventor IR on IR.id = II.idInventor " +
                "JOIN Pais P on P.id = IR.pais " +
                "ORDER BY II.id asc";
            mysql_1.default.sendQuery(query, [], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getInventor = function (req, res) {
            var query = "SELECT * FROM Inventor";
            mysql_1.default.sendQuery(query, [], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
        this.updateInvento = function (req, res) {
            var id_query = req.params.id;
            var _a = req.body, id = _a.id, invento = _a.invento, nuevoInventor = _a.nuevoInventor, nuevoNombre = _a.nuevoNombre, nuevoAnio = _a.nuevoAnio;
            console.log(id);
            console.log(req.body);
            var query = "UPDATE Inventor_Invento SET idInvento =?, idInventor =? WHERE id = ?";
            mysql_1.default.sendQuery(query, [invento, nuevoInventor, id], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    query = "UPDATE Invento SET nombre = ?, anio = ? WHERE id = ?";
                    mysql_1.default.sendQuery(query, [nuevoNombre, nuevoAnio, invento], function (err, data) {
                        if (err) {
                            res.status(400).json({
                                ok: false,
                                status: 400,
                                error: err
                            });
                        }
                        else {
                            res.json(data);
                        }
                    });
                }
            });
        };
    }
    InventorController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return InventorController;
}());
exports.default = InventorController;
