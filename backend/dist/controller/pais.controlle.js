"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var PaisController = /** @class */ (function () {
    function PaisController() {
        this.getAll = function (req, res) {
            var query = "SELECT * FROM Pais";
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
        this.getPais = function (req, res) {
            var id = req.params.id;
            var query = "SELECT * FROM Pais WHERE id = ?";
            mysql_1.default.sendQuery(query, [id], function (err, data) {
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
    }
    PaisController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return PaisController;
}());
exports.default = PaisController;
