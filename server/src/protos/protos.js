/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.huskysoft = (function() {

    /**
     * Namespace huskysoft.
     * @exports huskysoft
     * @namespace
     */
    var huskysoft = {};

    huskysoft.gotagme = (function() {

        /**
         * Namespace gotagme.
         * @memberof huskysoft
         * @namespace
         */
        var gotagme = {};

        gotagme.approval = (function() {

            /**
             * Namespace approval.
             * @memberof huskysoft.gotagme
             * @namespace
             */
            var approval = {};

            /**
             * ApprovalState enum.
             * @name huskysoft.gotagme.approval.ApprovalState
             * @enum {string}
             * @property {number} NEW=0 NEW value
             * @property {number} APPROVED=1 APPROVED value
             * @property {number} REJECTED=2 REJECTED value
             */
            approval.ApprovalState = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "NEW"] = 0;
                values[valuesById[1] = "APPROVED"] = 1;
                values[valuesById[2] = "REJECTED"] = 2;
                return values;
            })();

            approval.ApprovalStatus = (function() {

                /**
                 * Properties of an ApprovalStatus.
                 * @memberof huskysoft.gotagme.approval
                 * @interface IApprovalStatus
                 * @property {huskysoft.gotagme.approval.ApprovalState|null} [state] ApprovalStatus state
                 * @property {huskysoft.gotagme.user.IUser|null} [setBy] ApprovalStatus setBy
                 * @property {number|null} [createdAt] ApprovalStatus createdAt
                 */

                /**
                 * Constructs a new ApprovalStatus.
                 * @memberof huskysoft.gotagme.approval
                 * @classdesc Represents an ApprovalStatus.
                 * @implements IApprovalStatus
                 * @constructor
                 * @param {huskysoft.gotagme.approval.IApprovalStatus=} [properties] Properties to set
                 */
                function ApprovalStatus(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ApprovalStatus state.
                 * @member {huskysoft.gotagme.approval.ApprovalState} state
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @instance
                 */
                ApprovalStatus.prototype.state = 0;

                /**
                 * ApprovalStatus setBy.
                 * @member {huskysoft.gotagme.user.IUser|null|undefined} setBy
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @instance
                 */
                ApprovalStatus.prototype.setBy = null;

                /**
                 * ApprovalStatus createdAt.
                 * @member {number} createdAt
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @instance
                 */
                ApprovalStatus.prototype.createdAt = 0;

                /**
                 * Creates a new ApprovalStatus instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @static
                 * @param {huskysoft.gotagme.approval.IApprovalStatus=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.approval.ApprovalStatus} ApprovalStatus instance
                 */
                ApprovalStatus.create = function create(properties) {
                    return new ApprovalStatus(properties);
                };

                /**
                 * Encodes the specified ApprovalStatus message. Does not implicitly {@link huskysoft.gotagme.approval.ApprovalStatus.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @static
                 * @param {huskysoft.gotagme.approval.IApprovalStatus} message ApprovalStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ApprovalStatus.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.state != null && message.hasOwnProperty("state"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                    if (message.setBy != null && message.hasOwnProperty("setBy"))
                        $root.huskysoft.gotagme.user.User.encode(message.setBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.createdAt);
                    return writer;
                };

                /**
                 * Encodes the specified ApprovalStatus message, length delimited. Does not implicitly {@link huskysoft.gotagme.approval.ApprovalStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @static
                 * @param {huskysoft.gotagme.approval.IApprovalStatus} message ApprovalStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ApprovalStatus.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an ApprovalStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.approval.ApprovalStatus} ApprovalStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ApprovalStatus.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.approval.ApprovalStatus();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.state = reader.int32();
                            break;
                        case 2:
                            message.setBy = $root.huskysoft.gotagme.user.User.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.createdAt = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an ApprovalStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.approval.ApprovalStatus} ApprovalStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ApprovalStatus.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an ApprovalStatus message.
                 * @function verify
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ApprovalStatus.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.state != null && message.hasOwnProperty("state"))
                        switch (message.state) {
                        default:
                            return "state: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    if (message.setBy != null && message.hasOwnProperty("setBy")) {
                        var error = $root.huskysoft.gotagme.user.User.verify(message.setBy);
                        if (error)
                            return "setBy." + error;
                    }
                    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                        if (!$util.isInteger(message.createdAt))
                            return "createdAt: integer expected";
                    return null;
                };

                /**
                 * Creates an ApprovalStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.approval.ApprovalStatus} ApprovalStatus
                 */
                ApprovalStatus.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.approval.ApprovalStatus)
                        return object;
                    var message = new $root.huskysoft.gotagme.approval.ApprovalStatus();
                    switch (object.state) {
                    case "NEW":
                    case 0:
                        message.state = 0;
                        break;
                    case "APPROVED":
                    case 1:
                        message.state = 1;
                        break;
                    case "REJECTED":
                    case 2:
                        message.state = 2;
                        break;
                    }
                    if (object.setBy != null) {
                        if (typeof object.setBy !== "object")
                            throw TypeError(".huskysoft.gotagme.approval.ApprovalStatus.setBy: object expected");
                        message.setBy = $root.huskysoft.gotagme.user.User.fromObject(object.setBy);
                    }
                    if (object.createdAt != null)
                        message.createdAt = object.createdAt | 0;
                    return message;
                };

                /**
                 * Creates a plain object from an ApprovalStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @static
                 * @param {huskysoft.gotagme.approval.ApprovalStatus} message ApprovalStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ApprovalStatus.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.state = options.enums === String ? "NEW" : 0;
                        object.setBy = null;
                        object.createdAt = 0;
                    }
                    if (message.state != null && message.hasOwnProperty("state"))
                        object.state = options.enums === String ? $root.huskysoft.gotagme.approval.ApprovalState[message.state] : message.state;
                    if (message.setBy != null && message.hasOwnProperty("setBy"))
                        object.setBy = $root.huskysoft.gotagme.user.User.toObject(message.setBy, options);
                    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                        object.createdAt = message.createdAt;
                    return object;
                };

                /**
                 * Converts this ApprovalStatus to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.approval.ApprovalStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ApprovalStatus.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ApprovalStatus;
            })();

            return approval;
        })();

        gotagme.costume = (function() {

            /**
             * Namespace costume.
             * @memberof huskysoft.gotagme
             * @namespace
             */
            var costume = {};

            costume.Costume = (function() {

                /**
                 * Properties of a Costume.
                 * @memberof huskysoft.gotagme.costume
                 * @interface ICostume
                 * @property {string|null} [id] Costume id
                 * @property {string|null} [name] Costume name
                 * @property {huskysoft.gotagme.user.IUser|null} [owner] Costume owner
                 */

                /**
                 * Constructs a new Costume.
                 * @memberof huskysoft.gotagme.costume
                 * @classdesc Represents a Costume.
                 * @implements ICostume
                 * @constructor
                 * @param {huskysoft.gotagme.costume.ICostume=} [properties] Properties to set
                 */
                function Costume(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Costume id.
                 * @member {string} id
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @instance
                 */
                Costume.prototype.id = "";

                /**
                 * Costume name.
                 * @member {string} name
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @instance
                 */
                Costume.prototype.name = "";

                /**
                 * Costume owner.
                 * @member {huskysoft.gotagme.user.IUser|null|undefined} owner
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @instance
                 */
                Costume.prototype.owner = null;

                /**
                 * Creates a new Costume instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @static
                 * @param {huskysoft.gotagme.costume.ICostume=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.costume.Costume} Costume instance
                 */
                Costume.create = function create(properties) {
                    return new Costume(properties);
                };

                /**
                 * Encodes the specified Costume message. Does not implicitly {@link huskysoft.gotagme.costume.Costume.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @static
                 * @param {huskysoft.gotagme.costume.ICostume} message Costume message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Costume.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                    if (message.owner != null && message.hasOwnProperty("owner"))
                        $root.huskysoft.gotagme.user.User.encode(message.owner, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Costume message, length delimited. Does not implicitly {@link huskysoft.gotagme.costume.Costume.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @static
                 * @param {huskysoft.gotagme.costume.ICostume} message Costume message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Costume.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Costume message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.costume.Costume} Costume
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Costume.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.costume.Costume();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.name = reader.string();
                            break;
                        case 3:
                            message.owner = $root.huskysoft.gotagme.user.User.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Costume message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.costume.Costume} Costume
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Costume.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Costume message.
                 * @function verify
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Costume.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.owner != null && message.hasOwnProperty("owner")) {
                        var error = $root.huskysoft.gotagme.user.User.verify(message.owner);
                        if (error)
                            return "owner." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Costume message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.costume.Costume} Costume
                 */
                Costume.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.costume.Costume)
                        return object;
                    var message = new $root.huskysoft.gotagme.costume.Costume();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.owner != null) {
                        if (typeof object.owner !== "object")
                            throw TypeError(".huskysoft.gotagme.costume.Costume.owner: object expected");
                        message.owner = $root.huskysoft.gotagme.user.User.fromObject(object.owner);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Costume message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @static
                 * @param {huskysoft.gotagme.costume.Costume} message Costume
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Costume.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.name = "";
                        object.owner = null;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.owner != null && message.hasOwnProperty("owner"))
                        object.owner = $root.huskysoft.gotagme.user.User.toObject(message.owner, options);
                    return object;
                };

                /**
                 * Converts this Costume to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.costume.Costume
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Costume.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Costume;
            })();

            costume.EditCostumeRequest = (function() {

                /**
                 * Properties of an EditCostumeRequest.
                 * @memberof huskysoft.gotagme.costume
                 * @interface IEditCostumeRequest
                 * @property {string|null} [name] EditCostumeRequest name
                 * @property {string|null} [ownerID] EditCostumeRequest ownerID
                 */

                /**
                 * Constructs a new EditCostumeRequest.
                 * @memberof huskysoft.gotagme.costume
                 * @classdesc Represents an EditCostumeRequest.
                 * @implements IEditCostumeRequest
                 * @constructor
                 * @param {huskysoft.gotagme.costume.IEditCostumeRequest=} [properties] Properties to set
                 */
                function EditCostumeRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * EditCostumeRequest name.
                 * @member {string} name
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @instance
                 */
                EditCostumeRequest.prototype.name = "";

                /**
                 * EditCostumeRequest ownerID.
                 * @member {string} ownerID
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @instance
                 */
                EditCostumeRequest.prototype.ownerID = "";

                /**
                 * Creates a new EditCostumeRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @static
                 * @param {huskysoft.gotagme.costume.IEditCostumeRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.costume.EditCostumeRequest} EditCostumeRequest instance
                 */
                EditCostumeRequest.create = function create(properties) {
                    return new EditCostumeRequest(properties);
                };

                /**
                 * Encodes the specified EditCostumeRequest message. Does not implicitly {@link huskysoft.gotagme.costume.EditCostumeRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @static
                 * @param {huskysoft.gotagme.costume.IEditCostumeRequest} message EditCostumeRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EditCostumeRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.ownerID != null && message.hasOwnProperty("ownerID"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.ownerID);
                    return writer;
                };

                /**
                 * Encodes the specified EditCostumeRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.costume.EditCostumeRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @static
                 * @param {huskysoft.gotagme.costume.IEditCostumeRequest} message EditCostumeRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EditCostumeRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an EditCostumeRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.costume.EditCostumeRequest} EditCostumeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EditCostumeRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.costume.EditCostumeRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            message.ownerID = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an EditCostumeRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.costume.EditCostumeRequest} EditCostumeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EditCostumeRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an EditCostumeRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                EditCostumeRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.ownerID != null && message.hasOwnProperty("ownerID"))
                        if (!$util.isString(message.ownerID))
                            return "ownerID: string expected";
                    return null;
                };

                /**
                 * Creates an EditCostumeRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.costume.EditCostumeRequest} EditCostumeRequest
                 */
                EditCostumeRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.costume.EditCostumeRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.costume.EditCostumeRequest();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.ownerID != null)
                        message.ownerID = String(object.ownerID);
                    return message;
                };

                /**
                 * Creates a plain object from an EditCostumeRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @static
                 * @param {huskysoft.gotagme.costume.EditCostumeRequest} message EditCostumeRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                EditCostumeRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.ownerID = "";
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.ownerID != null && message.hasOwnProperty("ownerID"))
                        object.ownerID = message.ownerID;
                    return object;
                };

                /**
                 * Converts this EditCostumeRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.costume.EditCostumeRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                EditCostumeRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return EditCostumeRequest;
            })();

            costume.GetCostumesRequest = (function() {

                /**
                 * Properties of a GetCostumesRequest.
                 * @memberof huskysoft.gotagme.costume
                 * @interface IGetCostumesRequest
                 * @property {string|null} [userID] GetCostumesRequest userID
                 * @property {boolean|null} [onlyCurrent] GetCostumesRequest onlyCurrent
                 */

                /**
                 * Constructs a new GetCostumesRequest.
                 * @memberof huskysoft.gotagme.costume
                 * @classdesc Represents a GetCostumesRequest.
                 * @implements IGetCostumesRequest
                 * @constructor
                 * @param {huskysoft.gotagme.costume.IGetCostumesRequest=} [properties] Properties to set
                 */
                function GetCostumesRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetCostumesRequest userID.
                 * @member {string} userID
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @instance
                 */
                GetCostumesRequest.prototype.userID = "";

                /**
                 * GetCostumesRequest onlyCurrent.
                 * @member {boolean} onlyCurrent
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @instance
                 */
                GetCostumesRequest.prototype.onlyCurrent = false;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * GetCostumesRequest id.
                 * @member {"userID"|undefined} id
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @instance
                 */
                Object.defineProperty(GetCostumesRequest.prototype, "id", {
                    get: $util.oneOfGetter($oneOfFields = ["userID"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new GetCostumesRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @static
                 * @param {huskysoft.gotagme.costume.IGetCostumesRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.costume.GetCostumesRequest} GetCostumesRequest instance
                 */
                GetCostumesRequest.create = function create(properties) {
                    return new GetCostumesRequest(properties);
                };

                /**
                 * Encodes the specified GetCostumesRequest message. Does not implicitly {@link huskysoft.gotagme.costume.GetCostumesRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @static
                 * @param {huskysoft.gotagme.costume.IGetCostumesRequest} message GetCostumesRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetCostumesRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.userID != null && message.hasOwnProperty("userID"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.userID);
                    if (message.onlyCurrent != null && message.hasOwnProperty("onlyCurrent"))
                        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.onlyCurrent);
                    return writer;
                };

                /**
                 * Encodes the specified GetCostumesRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.costume.GetCostumesRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @static
                 * @param {huskysoft.gotagme.costume.IGetCostumesRequest} message GetCostumesRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetCostumesRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetCostumesRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.costume.GetCostumesRequest} GetCostumesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetCostumesRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.costume.GetCostumesRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.userID = reader.string();
                            break;
                        case 2:
                            message.onlyCurrent = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetCostumesRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.costume.GetCostumesRequest} GetCostumesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetCostumesRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetCostumesRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetCostumesRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.userID != null && message.hasOwnProperty("userID")) {
                        properties.id = 1;
                        if (!$util.isString(message.userID))
                            return "userID: string expected";
                    }
                    if (message.onlyCurrent != null && message.hasOwnProperty("onlyCurrent"))
                        if (typeof message.onlyCurrent !== "boolean")
                            return "onlyCurrent: boolean expected";
                    return null;
                };

                /**
                 * Creates a GetCostumesRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.costume.GetCostumesRequest} GetCostumesRequest
                 */
                GetCostumesRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.costume.GetCostumesRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.costume.GetCostumesRequest();
                    if (object.userID != null)
                        message.userID = String(object.userID);
                    if (object.onlyCurrent != null)
                        message.onlyCurrent = Boolean(object.onlyCurrent);
                    return message;
                };

                /**
                 * Creates a plain object from a GetCostumesRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @static
                 * @param {huskysoft.gotagme.costume.GetCostumesRequest} message GetCostumesRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetCostumesRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.onlyCurrent = false;
                    if (message.userID != null && message.hasOwnProperty("userID")) {
                        object.userID = message.userID;
                        if (options.oneofs)
                            object.id = "userID";
                    }
                    if (message.onlyCurrent != null && message.hasOwnProperty("onlyCurrent"))
                        object.onlyCurrent = message.onlyCurrent;
                    return object;
                };

                /**
                 * Converts this GetCostumesRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.costume.GetCostumesRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetCostumesRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetCostumesRequest;
            })();

            costume.GetCostumesResponse = (function() {

                /**
                 * Properties of a GetCostumesResponse.
                 * @memberof huskysoft.gotagme.costume
                 * @interface IGetCostumesResponse
                 * @property {Array.<huskysoft.gotagme.costume.ICostume>|null} [costumes] GetCostumesResponse costumes
                 */

                /**
                 * Constructs a new GetCostumesResponse.
                 * @memberof huskysoft.gotagme.costume
                 * @classdesc Represents a GetCostumesResponse.
                 * @implements IGetCostumesResponse
                 * @constructor
                 * @param {huskysoft.gotagme.costume.IGetCostumesResponse=} [properties] Properties to set
                 */
                function GetCostumesResponse(properties) {
                    this.costumes = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetCostumesResponse costumes.
                 * @member {Array.<huskysoft.gotagme.costume.ICostume>} costumes
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @instance
                 */
                GetCostumesResponse.prototype.costumes = $util.emptyArray;

                /**
                 * Creates a new GetCostumesResponse instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @static
                 * @param {huskysoft.gotagme.costume.IGetCostumesResponse=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.costume.GetCostumesResponse} GetCostumesResponse instance
                 */
                GetCostumesResponse.create = function create(properties) {
                    return new GetCostumesResponse(properties);
                };

                /**
                 * Encodes the specified GetCostumesResponse message. Does not implicitly {@link huskysoft.gotagme.costume.GetCostumesResponse.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @static
                 * @param {huskysoft.gotagme.costume.IGetCostumesResponse} message GetCostumesResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetCostumesResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.costumes != null && message.costumes.length)
                        for (var i = 0; i < message.costumes.length; ++i)
                            $root.huskysoft.gotagme.costume.Costume.encode(message.costumes[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetCostumesResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.costume.GetCostumesResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @static
                 * @param {huskysoft.gotagme.costume.IGetCostumesResponse} message GetCostumesResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetCostumesResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetCostumesResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.costume.GetCostumesResponse} GetCostumesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetCostumesResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.costume.GetCostumesResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.costumes && message.costumes.length))
                                message.costumes = [];
                            message.costumes.push($root.huskysoft.gotagme.costume.Costume.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetCostumesResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.costume.GetCostumesResponse} GetCostumesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetCostumesResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetCostumesResponse message.
                 * @function verify
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetCostumesResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.costumes != null && message.hasOwnProperty("costumes")) {
                        if (!Array.isArray(message.costumes))
                            return "costumes: array expected";
                        for (var i = 0; i < message.costumes.length; ++i) {
                            var error = $root.huskysoft.gotagme.costume.Costume.verify(message.costumes[i]);
                            if (error)
                                return "costumes." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a GetCostumesResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.costume.GetCostumesResponse} GetCostumesResponse
                 */
                GetCostumesResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.costume.GetCostumesResponse)
                        return object;
                    var message = new $root.huskysoft.gotagme.costume.GetCostumesResponse();
                    if (object.costumes) {
                        if (!Array.isArray(object.costumes))
                            throw TypeError(".huskysoft.gotagme.costume.GetCostumesResponse.costumes: array expected");
                        message.costumes = [];
                        for (var i = 0; i < object.costumes.length; ++i) {
                            if (typeof object.costumes[i] !== "object")
                                throw TypeError(".huskysoft.gotagme.costume.GetCostumesResponse.costumes: object expected");
                            message.costumes[i] = $root.huskysoft.gotagme.costume.Costume.fromObject(object.costumes[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetCostumesResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @static
                 * @param {huskysoft.gotagme.costume.GetCostumesResponse} message GetCostumesResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetCostumesResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.costumes = [];
                    if (message.costumes && message.costumes.length) {
                        object.costumes = [];
                        for (var j = 0; j < message.costumes.length; ++j)
                            object.costumes[j] = $root.huskysoft.gotagme.costume.Costume.toObject(message.costumes[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this GetCostumesResponse to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.costume.GetCostumesResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetCostumesResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetCostumesResponse;
            })();

            return costume;
        })();

        gotagme.photo = (function() {

            /**
             * Namespace photo.
             * @memberof huskysoft.gotagme
             * @namespace
             */
            var photo = {};

            photo.Photo = (function() {

                /**
                 * Properties of a Photo.
                 * @memberof huskysoft.gotagme.photo
                 * @interface IPhoto
                 * @property {string|null} [id] Photo id
                 * @property {huskysoft.gotagme.user.IUser|null} [postedBy] Photo postedBy
                 * @property {huskysoft.gotagme.user.IUser|null} [capturedBy] Photo capturedBy
                 * @property {number|null} [capturedAt] Photo capturedAt
                 * @property {huskysoft.gotagme.approval.ApprovalState|null} [state] Photo state
                 * @property {string|null} [externalUrl] Photo externalUrl
                 * @property {string|null} [smallImageUrl] Photo smallImageUrl
                 * @property {string|null} [largeImageUrl] Photo largeImageUrl
                 * @property {string|null} [xlargeImageUrl] Photo xlargeImageUrl
                 * @property {string|null} [title] Photo title
                 * @property {string|null} [description] Photo description
                 */

                /**
                 * Constructs a new Photo.
                 * @memberof huskysoft.gotagme.photo
                 * @classdesc Represents a Photo.
                 * @implements IPhoto
                 * @constructor
                 * @param {huskysoft.gotagme.photo.IPhoto=} [properties] Properties to set
                 */
                function Photo(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Photo id.
                 * @member {string} id
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.id = "";

                /**
                 * Photo postedBy.
                 * @member {huskysoft.gotagme.user.IUser|null|undefined} postedBy
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.postedBy = null;

                /**
                 * Photo capturedBy.
                 * @member {huskysoft.gotagme.user.IUser|null|undefined} capturedBy
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.capturedBy = null;

                /**
                 * Photo capturedAt.
                 * @member {number} capturedAt
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.capturedAt = 0;

                /**
                 * Photo state.
                 * @member {huskysoft.gotagme.approval.ApprovalState} state
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.state = 0;

                /**
                 * Photo externalUrl.
                 * @member {string} externalUrl
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.externalUrl = "";

                /**
                 * Photo smallImageUrl.
                 * @member {string} smallImageUrl
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.smallImageUrl = "";

                /**
                 * Photo largeImageUrl.
                 * @member {string} largeImageUrl
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.largeImageUrl = "";

                /**
                 * Photo xlargeImageUrl.
                 * @member {string} xlargeImageUrl
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.xlargeImageUrl = "";

                /**
                 * Photo title.
                 * @member {string} title
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.title = "";

                /**
                 * Photo description.
                 * @member {string} description
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 */
                Photo.prototype.description = "";

                /**
                 * Creates a new Photo instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @static
                 * @param {huskysoft.gotagme.photo.IPhoto=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.photo.Photo} Photo instance
                 */
                Photo.create = function create(properties) {
                    return new Photo(properties);
                };

                /**
                 * Encodes the specified Photo message. Does not implicitly {@link huskysoft.gotagme.photo.Photo.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @static
                 * @param {huskysoft.gotagme.photo.IPhoto} message Photo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Photo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.postedBy != null && message.hasOwnProperty("postedBy"))
                        $root.huskysoft.gotagme.user.User.encode(message.postedBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                        $root.huskysoft.gotagme.user.User.encode(message.capturedBy, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.capturedAt != null && message.hasOwnProperty("capturedAt"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.capturedAt);
                    if (message.state != null && message.hasOwnProperty("state"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.state);
                    if (message.externalUrl != null && message.hasOwnProperty("externalUrl"))
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.externalUrl);
                    if (message.smallImageUrl != null && message.hasOwnProperty("smallImageUrl"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.smallImageUrl);
                    if (message.largeImageUrl != null && message.hasOwnProperty("largeImageUrl"))
                        writer.uint32(/* id 8, wireType 2 =*/66).string(message.largeImageUrl);
                    if (message.xlargeImageUrl != null && message.hasOwnProperty("xlargeImageUrl"))
                        writer.uint32(/* id 9, wireType 2 =*/74).string(message.xlargeImageUrl);
                    if (message.title != null && message.hasOwnProperty("title"))
                        writer.uint32(/* id 10, wireType 2 =*/82).string(message.title);
                    if (message.description != null && message.hasOwnProperty("description"))
                        writer.uint32(/* id 11, wireType 2 =*/90).string(message.description);
                    return writer;
                };

                /**
                 * Encodes the specified Photo message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.Photo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @static
                 * @param {huskysoft.gotagme.photo.IPhoto} message Photo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Photo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Photo message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.photo.Photo} Photo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Photo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.photo.Photo();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.postedBy = $root.huskysoft.gotagme.user.User.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.capturedBy = $root.huskysoft.gotagme.user.User.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.capturedAt = reader.int32();
                            break;
                        case 5:
                            message.state = reader.int32();
                            break;
                        case 6:
                            message.externalUrl = reader.string();
                            break;
                        case 7:
                            message.smallImageUrl = reader.string();
                            break;
                        case 8:
                            message.largeImageUrl = reader.string();
                            break;
                        case 9:
                            message.xlargeImageUrl = reader.string();
                            break;
                        case 10:
                            message.title = reader.string();
                            break;
                        case 11:
                            message.description = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Photo message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.photo.Photo} Photo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Photo.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Photo message.
                 * @function verify
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Photo.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.postedBy != null && message.hasOwnProperty("postedBy")) {
                        var error = $root.huskysoft.gotagme.user.User.verify(message.postedBy);
                        if (error)
                            return "postedBy." + error;
                    }
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy")) {
                        var error = $root.huskysoft.gotagme.user.User.verify(message.capturedBy);
                        if (error)
                            return "capturedBy." + error;
                    }
                    if (message.capturedAt != null && message.hasOwnProperty("capturedAt"))
                        if (!$util.isInteger(message.capturedAt))
                            return "capturedAt: integer expected";
                    if (message.state != null && message.hasOwnProperty("state"))
                        switch (message.state) {
                        default:
                            return "state: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    if (message.externalUrl != null && message.hasOwnProperty("externalUrl"))
                        if (!$util.isString(message.externalUrl))
                            return "externalUrl: string expected";
                    if (message.smallImageUrl != null && message.hasOwnProperty("smallImageUrl"))
                        if (!$util.isString(message.smallImageUrl))
                            return "smallImageUrl: string expected";
                    if (message.largeImageUrl != null && message.hasOwnProperty("largeImageUrl"))
                        if (!$util.isString(message.largeImageUrl))
                            return "largeImageUrl: string expected";
                    if (message.xlargeImageUrl != null && message.hasOwnProperty("xlargeImageUrl"))
                        if (!$util.isString(message.xlargeImageUrl))
                            return "xlargeImageUrl: string expected";
                    if (message.title != null && message.hasOwnProperty("title"))
                        if (!$util.isString(message.title))
                            return "title: string expected";
                    if (message.description != null && message.hasOwnProperty("description"))
                        if (!$util.isString(message.description))
                            return "description: string expected";
                    return null;
                };

                /**
                 * Creates a Photo message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.photo.Photo} Photo
                 */
                Photo.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.photo.Photo)
                        return object;
                    var message = new $root.huskysoft.gotagme.photo.Photo();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.postedBy != null) {
                        if (typeof object.postedBy !== "object")
                            throw TypeError(".huskysoft.gotagme.photo.Photo.postedBy: object expected");
                        message.postedBy = $root.huskysoft.gotagme.user.User.fromObject(object.postedBy);
                    }
                    if (object.capturedBy != null) {
                        if (typeof object.capturedBy !== "object")
                            throw TypeError(".huskysoft.gotagme.photo.Photo.capturedBy: object expected");
                        message.capturedBy = $root.huskysoft.gotagme.user.User.fromObject(object.capturedBy);
                    }
                    if (object.capturedAt != null)
                        message.capturedAt = object.capturedAt | 0;
                    switch (object.state) {
                    case "NEW":
                    case 0:
                        message.state = 0;
                        break;
                    case "APPROVED":
                    case 1:
                        message.state = 1;
                        break;
                    case "REJECTED":
                    case 2:
                        message.state = 2;
                        break;
                    }
                    if (object.externalUrl != null)
                        message.externalUrl = String(object.externalUrl);
                    if (object.smallImageUrl != null)
                        message.smallImageUrl = String(object.smallImageUrl);
                    if (object.largeImageUrl != null)
                        message.largeImageUrl = String(object.largeImageUrl);
                    if (object.xlargeImageUrl != null)
                        message.xlargeImageUrl = String(object.xlargeImageUrl);
                    if (object.title != null)
                        message.title = String(object.title);
                    if (object.description != null)
                        message.description = String(object.description);
                    return message;
                };

                /**
                 * Creates a plain object from a Photo message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @static
                 * @param {huskysoft.gotagme.photo.Photo} message Photo
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Photo.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.postedBy = null;
                        object.capturedBy = null;
                        object.capturedAt = 0;
                        object.state = options.enums === String ? "NEW" : 0;
                        object.externalUrl = "";
                        object.smallImageUrl = "";
                        object.largeImageUrl = "";
                        object.xlargeImageUrl = "";
                        object.title = "";
                        object.description = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.postedBy != null && message.hasOwnProperty("postedBy"))
                        object.postedBy = $root.huskysoft.gotagme.user.User.toObject(message.postedBy, options);
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                        object.capturedBy = $root.huskysoft.gotagme.user.User.toObject(message.capturedBy, options);
                    if (message.capturedAt != null && message.hasOwnProperty("capturedAt"))
                        object.capturedAt = message.capturedAt;
                    if (message.state != null && message.hasOwnProperty("state"))
                        object.state = options.enums === String ? $root.huskysoft.gotagme.approval.ApprovalState[message.state] : message.state;
                    if (message.externalUrl != null && message.hasOwnProperty("externalUrl"))
                        object.externalUrl = message.externalUrl;
                    if (message.smallImageUrl != null && message.hasOwnProperty("smallImageUrl"))
                        object.smallImageUrl = message.smallImageUrl;
                    if (message.largeImageUrl != null && message.hasOwnProperty("largeImageUrl"))
                        object.largeImageUrl = message.largeImageUrl;
                    if (message.xlargeImageUrl != null && message.hasOwnProperty("xlargeImageUrl"))
                        object.xlargeImageUrl = message.xlargeImageUrl;
                    if (message.title != null && message.hasOwnProperty("title"))
                        object.title = message.title;
                    if (message.description != null && message.hasOwnProperty("description"))
                        object.description = message.description;
                    return object;
                };

                /**
                 * Converts this Photo to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.photo.Photo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Photo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Photo;
            })();

            photo.GetPhotoRequest = (function() {

                /**
                 * Properties of a GetPhotoRequest.
                 * @memberof huskysoft.gotagme.photo
                 * @interface IGetPhotoRequest
                 * @property {string|null} [id] GetPhotoRequest id
                 * @property {number|null} [page] GetPhotoRequest page
                 */

                /**
                 * Constructs a new GetPhotoRequest.
                 * @memberof huskysoft.gotagme.photo
                 * @classdesc Represents a GetPhotoRequest.
                 * @implements IGetPhotoRequest
                 * @constructor
                 * @param {huskysoft.gotagme.photo.IGetPhotoRequest=} [properties] Properties to set
                 */
                function GetPhotoRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetPhotoRequest id.
                 * @member {string} id
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @instance
                 */
                GetPhotoRequest.prototype.id = "";

                /**
                 * GetPhotoRequest page.
                 * @member {number} page
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @instance
                 */
                GetPhotoRequest.prototype.page = 0;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * GetPhotoRequest key.
                 * @member {"id"|"page"|undefined} key
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @instance
                 */
                Object.defineProperty(GetPhotoRequest.prototype, "key", {
                    get: $util.oneOfGetter($oneOfFields = ["id", "page"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new GetPhotoRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IGetPhotoRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.photo.GetPhotoRequest} GetPhotoRequest instance
                 */
                GetPhotoRequest.create = function create(properties) {
                    return new GetPhotoRequest(properties);
                };

                /**
                 * Encodes the specified GetPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.photo.GetPhotoRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IGetPhotoRequest} message GetPhotoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetPhotoRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.page != null && message.hasOwnProperty("page"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.page);
                    return writer;
                };

                /**
                 * Encodes the specified GetPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.GetPhotoRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IGetPhotoRequest} message GetPhotoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetPhotoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetPhotoRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.photo.GetPhotoRequest} GetPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetPhotoRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.photo.GetPhotoRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.page = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetPhotoRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.photo.GetPhotoRequest} GetPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetPhotoRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetPhotoRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetPhotoRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.id != null && message.hasOwnProperty("id")) {
                        properties.key = 1;
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    }
                    if (message.page != null && message.hasOwnProperty("page")) {
                        if (properties.key === 1)
                            return "key: multiple values";
                        properties.key = 1;
                        if (!$util.isInteger(message.page))
                            return "page: integer expected";
                    }
                    return null;
                };

                /**
                 * Creates a GetPhotoRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.photo.GetPhotoRequest} GetPhotoRequest
                 */
                GetPhotoRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.photo.GetPhotoRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.photo.GetPhotoRequest();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.page != null)
                        message.page = object.page | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a GetPhotoRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.GetPhotoRequest} message GetPhotoRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetPhotoRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (message.id != null && message.hasOwnProperty("id")) {
                        object.id = message.id;
                        if (options.oneofs)
                            object.key = "id";
                    }
                    if (message.page != null && message.hasOwnProperty("page")) {
                        object.page = message.page;
                        if (options.oneofs)
                            object.key = "page";
                    }
                    return object;
                };

                /**
                 * Converts this GetPhotoRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.photo.GetPhotoRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetPhotoRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetPhotoRequest;
            })();

            photo.GetPhotoResponse = (function() {

                /**
                 * Properties of a GetPhotoResponse.
                 * @memberof huskysoft.gotagme.photo
                 * @interface IGetPhotoResponse
                 * @property {Array.<huskysoft.gotagme.photo.IPhoto>|null} [photos] GetPhotoResponse photos
                 */

                /**
                 * Constructs a new GetPhotoResponse.
                 * @memberof huskysoft.gotagme.photo
                 * @classdesc Represents a GetPhotoResponse.
                 * @implements IGetPhotoResponse
                 * @constructor
                 * @param {huskysoft.gotagme.photo.IGetPhotoResponse=} [properties] Properties to set
                 */
                function GetPhotoResponse(properties) {
                    this.photos = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetPhotoResponse photos.
                 * @member {Array.<huskysoft.gotagme.photo.IPhoto>} photos
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @instance
                 */
                GetPhotoResponse.prototype.photos = $util.emptyArray;

                /**
                 * Creates a new GetPhotoResponse instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @static
                 * @param {huskysoft.gotagme.photo.IGetPhotoResponse=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.photo.GetPhotoResponse} GetPhotoResponse instance
                 */
                GetPhotoResponse.create = function create(properties) {
                    return new GetPhotoResponse(properties);
                };

                /**
                 * Encodes the specified GetPhotoResponse message. Does not implicitly {@link huskysoft.gotagme.photo.GetPhotoResponse.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @static
                 * @param {huskysoft.gotagme.photo.IGetPhotoResponse} message GetPhotoResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetPhotoResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.photos != null && message.photos.length)
                        for (var i = 0; i < message.photos.length; ++i)
                            $root.huskysoft.gotagme.photo.Photo.encode(message.photos[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetPhotoResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.GetPhotoResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @static
                 * @param {huskysoft.gotagme.photo.IGetPhotoResponse} message GetPhotoResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetPhotoResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetPhotoResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.photo.GetPhotoResponse} GetPhotoResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetPhotoResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.photo.GetPhotoResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.photos && message.photos.length))
                                message.photos = [];
                            message.photos.push($root.huskysoft.gotagme.photo.Photo.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetPhotoResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.photo.GetPhotoResponse} GetPhotoResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetPhotoResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetPhotoResponse message.
                 * @function verify
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetPhotoResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.photos != null && message.hasOwnProperty("photos")) {
                        if (!Array.isArray(message.photos))
                            return "photos: array expected";
                        for (var i = 0; i < message.photos.length; ++i) {
                            var error = $root.huskysoft.gotagme.photo.Photo.verify(message.photos[i]);
                            if (error)
                                return "photos." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a GetPhotoResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.photo.GetPhotoResponse} GetPhotoResponse
                 */
                GetPhotoResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.photo.GetPhotoResponse)
                        return object;
                    var message = new $root.huskysoft.gotagme.photo.GetPhotoResponse();
                    if (object.photos) {
                        if (!Array.isArray(object.photos))
                            throw TypeError(".huskysoft.gotagme.photo.GetPhotoResponse.photos: array expected");
                        message.photos = [];
                        for (var i = 0; i < object.photos.length; ++i) {
                            if (typeof object.photos[i] !== "object")
                                throw TypeError(".huskysoft.gotagme.photo.GetPhotoResponse.photos: object expected");
                            message.photos[i] = $root.huskysoft.gotagme.photo.Photo.fromObject(object.photos[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetPhotoResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @static
                 * @param {huskysoft.gotagme.photo.GetPhotoResponse} message GetPhotoResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetPhotoResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.photos = [];
                    if (message.photos && message.photos.length) {
                        object.photos = [];
                        for (var j = 0; j < message.photos.length; ++j)
                            object.photos[j] = $root.huskysoft.gotagme.photo.Photo.toObject(message.photos[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this GetPhotoResponse to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.photo.GetPhotoResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetPhotoResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetPhotoResponse;
            })();

            photo.InsertPhotoRequest = (function() {

                /**
                 * Properties of an InsertPhotoRequest.
                 * @memberof huskysoft.gotagme.photo
                 * @interface IInsertPhotoRequest
                 * @property {string|null} [flickrUrl] InsertPhotoRequest flickrUrl
                 */

                /**
                 * Constructs a new InsertPhotoRequest.
                 * @memberof huskysoft.gotagme.photo
                 * @classdesc Represents an InsertPhotoRequest.
                 * @implements IInsertPhotoRequest
                 * @constructor
                 * @param {huskysoft.gotagme.photo.IInsertPhotoRequest=} [properties] Properties to set
                 */
                function InsertPhotoRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InsertPhotoRequest flickrUrl.
                 * @member {string} flickrUrl
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @instance
                 */
                InsertPhotoRequest.prototype.flickrUrl = "";

                /**
                 * Creates a new InsertPhotoRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IInsertPhotoRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.photo.InsertPhotoRequest} InsertPhotoRequest instance
                 */
                InsertPhotoRequest.create = function create(properties) {
                    return new InsertPhotoRequest(properties);
                };

                /**
                 * Encodes the specified InsertPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotoRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IInsertPhotoRequest} message InsertPhotoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotoRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.flickrUrl != null && message.hasOwnProperty("flickrUrl"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.flickrUrl);
                    return writer;
                };

                /**
                 * Encodes the specified InsertPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotoRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IInsertPhotoRequest} message InsertPhotoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InsertPhotoRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.photo.InsertPhotoRequest} InsertPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InsertPhotoRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.photo.InsertPhotoRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.flickrUrl = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InsertPhotoRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.photo.InsertPhotoRequest} InsertPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InsertPhotoRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InsertPhotoRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InsertPhotoRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.flickrUrl != null && message.hasOwnProperty("flickrUrl"))
                        if (!$util.isString(message.flickrUrl))
                            return "flickrUrl: string expected";
                    return null;
                };

                /**
                 * Creates an InsertPhotoRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.photo.InsertPhotoRequest} InsertPhotoRequest
                 */
                InsertPhotoRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.photo.InsertPhotoRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.photo.InsertPhotoRequest();
                    if (object.flickrUrl != null)
                        message.flickrUrl = String(object.flickrUrl);
                    return message;
                };

                /**
                 * Creates a plain object from an InsertPhotoRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.InsertPhotoRequest} message InsertPhotoRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InsertPhotoRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.flickrUrl = "";
                    if (message.flickrUrl != null && message.hasOwnProperty("flickrUrl"))
                        object.flickrUrl = message.flickrUrl;
                    return object;
                };

                /**
                 * Converts this InsertPhotoRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.photo.InsertPhotoRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InsertPhotoRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return InsertPhotoRequest;
            })();

            photo.InsertPhotosRequest = (function() {

                /**
                 * Properties of an InsertPhotosRequest.
                 * @memberof huskysoft.gotagme.photo
                 * @interface IInsertPhotosRequest
                 * @property {Array.<huskysoft.gotagme.photo.IInsertPhotoRequest>|null} [requests] InsertPhotosRequest requests
                 * @property {string|null} [flickrAlbumUrl] InsertPhotosRequest flickrAlbumUrl
                 */

                /**
                 * Constructs a new InsertPhotosRequest.
                 * @memberof huskysoft.gotagme.photo
                 * @classdesc Represents an InsertPhotosRequest.
                 * @implements IInsertPhotosRequest
                 * @constructor
                 * @param {huskysoft.gotagme.photo.IInsertPhotosRequest=} [properties] Properties to set
                 */
                function InsertPhotosRequest(properties) {
                    this.requests = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InsertPhotosRequest requests.
                 * @member {Array.<huskysoft.gotagme.photo.IInsertPhotoRequest>} requests
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @instance
                 */
                InsertPhotosRequest.prototype.requests = $util.emptyArray;

                /**
                 * InsertPhotosRequest flickrAlbumUrl.
                 * @member {string} flickrAlbumUrl
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @instance
                 */
                InsertPhotosRequest.prototype.flickrAlbumUrl = "";

                /**
                 * Creates a new InsertPhotosRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IInsertPhotosRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.photo.InsertPhotosRequest} InsertPhotosRequest instance
                 */
                InsertPhotosRequest.create = function create(properties) {
                    return new InsertPhotosRequest(properties);
                };

                /**
                 * Encodes the specified InsertPhotosRequest message. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotosRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IInsertPhotosRequest} message InsertPhotosRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotosRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.requests != null && message.requests.length)
                        for (var i = 0; i < message.requests.length; ++i)
                            $root.huskysoft.gotagme.photo.InsertPhotoRequest.encode(message.requests[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.flickrAlbumUrl != null && message.hasOwnProperty("flickrAlbumUrl"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.flickrAlbumUrl);
                    return writer;
                };

                /**
                 * Encodes the specified InsertPhotosRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotosRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IInsertPhotosRequest} message InsertPhotosRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotosRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InsertPhotosRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.photo.InsertPhotosRequest} InsertPhotosRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InsertPhotosRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.photo.InsertPhotosRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.requests && message.requests.length))
                                message.requests = [];
                            message.requests.push($root.huskysoft.gotagme.photo.InsertPhotoRequest.decode(reader, reader.uint32()));
                            break;
                        case 2:
                            message.flickrAlbumUrl = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InsertPhotosRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.photo.InsertPhotosRequest} InsertPhotosRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InsertPhotosRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InsertPhotosRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InsertPhotosRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.requests != null && message.hasOwnProperty("requests")) {
                        if (!Array.isArray(message.requests))
                            return "requests: array expected";
                        for (var i = 0; i < message.requests.length; ++i) {
                            var error = $root.huskysoft.gotagme.photo.InsertPhotoRequest.verify(message.requests[i]);
                            if (error)
                                return "requests." + error;
                        }
                    }
                    if (message.flickrAlbumUrl != null && message.hasOwnProperty("flickrAlbumUrl"))
                        if (!$util.isString(message.flickrAlbumUrl))
                            return "flickrAlbumUrl: string expected";
                    return null;
                };

                /**
                 * Creates an InsertPhotosRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.photo.InsertPhotosRequest} InsertPhotosRequest
                 */
                InsertPhotosRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.photo.InsertPhotosRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.photo.InsertPhotosRequest();
                    if (object.requests) {
                        if (!Array.isArray(object.requests))
                            throw TypeError(".huskysoft.gotagme.photo.InsertPhotosRequest.requests: array expected");
                        message.requests = [];
                        for (var i = 0; i < object.requests.length; ++i) {
                            if (typeof object.requests[i] !== "object")
                                throw TypeError(".huskysoft.gotagme.photo.InsertPhotosRequest.requests: object expected");
                            message.requests[i] = $root.huskysoft.gotagme.photo.InsertPhotoRequest.fromObject(object.requests[i]);
                        }
                    }
                    if (object.flickrAlbumUrl != null)
                        message.flickrAlbumUrl = String(object.flickrAlbumUrl);
                    return message;
                };

                /**
                 * Creates a plain object from an InsertPhotosRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.InsertPhotosRequest} message InsertPhotosRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InsertPhotosRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.requests = [];
                    if (options.defaults)
                        object.flickrAlbumUrl = "";
                    if (message.requests && message.requests.length) {
                        object.requests = [];
                        for (var j = 0; j < message.requests.length; ++j)
                            object.requests[j] = $root.huskysoft.gotagme.photo.InsertPhotoRequest.toObject(message.requests[j], options);
                    }
                    if (message.flickrAlbumUrl != null && message.hasOwnProperty("flickrAlbumUrl"))
                        object.flickrAlbumUrl = message.flickrAlbumUrl;
                    return object;
                };

                /**
                 * Converts this InsertPhotosRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.photo.InsertPhotosRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InsertPhotosRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return InsertPhotosRequest;
            })();

            photo.InsertPhotosResponse = (function() {

                /**
                 * Properties of an InsertPhotosResponse.
                 * @memberof huskysoft.gotagme.photo
                 * @interface IInsertPhotosResponse
                 * @property {Array.<huskysoft.gotagme.photo.IPhoto>|null} [photos] InsertPhotosResponse photos
                 */

                /**
                 * Constructs a new InsertPhotosResponse.
                 * @memberof huskysoft.gotagme.photo
                 * @classdesc Represents an InsertPhotosResponse.
                 * @implements IInsertPhotosResponse
                 * @constructor
                 * @param {huskysoft.gotagme.photo.IInsertPhotosResponse=} [properties] Properties to set
                 */
                function InsertPhotosResponse(properties) {
                    this.photos = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InsertPhotosResponse photos.
                 * @member {Array.<huskysoft.gotagme.photo.IPhoto>} photos
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @instance
                 */
                InsertPhotosResponse.prototype.photos = $util.emptyArray;

                /**
                 * Creates a new InsertPhotosResponse instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @static
                 * @param {huskysoft.gotagme.photo.IInsertPhotosResponse=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.photo.InsertPhotosResponse} InsertPhotosResponse instance
                 */
                InsertPhotosResponse.create = function create(properties) {
                    return new InsertPhotosResponse(properties);
                };

                /**
                 * Encodes the specified InsertPhotosResponse message. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotosResponse.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @static
                 * @param {huskysoft.gotagme.photo.IInsertPhotosResponse} message InsertPhotosResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotosResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.photos != null && message.photos.length)
                        for (var i = 0; i < message.photos.length; ++i)
                            $root.huskysoft.gotagme.photo.Photo.encode(message.photos[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InsertPhotosResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotosResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @static
                 * @param {huskysoft.gotagme.photo.IInsertPhotosResponse} message InsertPhotosResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotosResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InsertPhotosResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.photo.InsertPhotosResponse} InsertPhotosResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InsertPhotosResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.photo.InsertPhotosResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.photos && message.photos.length))
                                message.photos = [];
                            message.photos.push($root.huskysoft.gotagme.photo.Photo.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an InsertPhotosResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.photo.InsertPhotosResponse} InsertPhotosResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InsertPhotosResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an InsertPhotosResponse message.
                 * @function verify
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InsertPhotosResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.photos != null && message.hasOwnProperty("photos")) {
                        if (!Array.isArray(message.photos))
                            return "photos: array expected";
                        for (var i = 0; i < message.photos.length; ++i) {
                            var error = $root.huskysoft.gotagme.photo.Photo.verify(message.photos[i]);
                            if (error)
                                return "photos." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an InsertPhotosResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.photo.InsertPhotosResponse} InsertPhotosResponse
                 */
                InsertPhotosResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.photo.InsertPhotosResponse)
                        return object;
                    var message = new $root.huskysoft.gotagme.photo.InsertPhotosResponse();
                    if (object.photos) {
                        if (!Array.isArray(object.photos))
                            throw TypeError(".huskysoft.gotagme.photo.InsertPhotosResponse.photos: array expected");
                        message.photos = [];
                        for (var i = 0; i < object.photos.length; ++i) {
                            if (typeof object.photos[i] !== "object")
                                throw TypeError(".huskysoft.gotagme.photo.InsertPhotosResponse.photos: object expected");
                            message.photos[i] = $root.huskysoft.gotagme.photo.Photo.fromObject(object.photos[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InsertPhotosResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @static
                 * @param {huskysoft.gotagme.photo.InsertPhotosResponse} message InsertPhotosResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InsertPhotosResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.photos = [];
                    if (message.photos && message.photos.length) {
                        object.photos = [];
                        for (var j = 0; j < message.photos.length; ++j)
                            object.photos[j] = $root.huskysoft.gotagme.photo.Photo.toObject(message.photos[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this InsertPhotosResponse to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.photo.InsertPhotosResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InsertPhotosResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return InsertPhotosResponse;
            })();

            photo.DeletePhotoRequest = (function() {

                /**
                 * Properties of a DeletePhotoRequest.
                 * @memberof huskysoft.gotagme.photo
                 * @interface IDeletePhotoRequest
                 * @property {string|null} [id] DeletePhotoRequest id
                 */

                /**
                 * Constructs a new DeletePhotoRequest.
                 * @memberof huskysoft.gotagme.photo
                 * @classdesc Represents a DeletePhotoRequest.
                 * @implements IDeletePhotoRequest
                 * @constructor
                 * @param {huskysoft.gotagme.photo.IDeletePhotoRequest=} [properties] Properties to set
                 */
                function DeletePhotoRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeletePhotoRequest id.
                 * @member {string} id
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @instance
                 */
                DeletePhotoRequest.prototype.id = "";

                /**
                 * Creates a new DeletePhotoRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IDeletePhotoRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.photo.DeletePhotoRequest} DeletePhotoRequest instance
                 */
                DeletePhotoRequest.create = function create(properties) {
                    return new DeletePhotoRequest(properties);
                };

                /**
                 * Encodes the specified DeletePhotoRequest message. Does not implicitly {@link huskysoft.gotagme.photo.DeletePhotoRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IDeletePhotoRequest} message DeletePhotoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeletePhotoRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    return writer;
                };

                /**
                 * Encodes the specified DeletePhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.DeletePhotoRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.IDeletePhotoRequest} message DeletePhotoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeletePhotoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeletePhotoRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.photo.DeletePhotoRequest} DeletePhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeletePhotoRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.photo.DeletePhotoRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeletePhotoRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.photo.DeletePhotoRequest} DeletePhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeletePhotoRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeletePhotoRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeletePhotoRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    return null;
                };

                /**
                 * Creates a DeletePhotoRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.photo.DeletePhotoRequest} DeletePhotoRequest
                 */
                DeletePhotoRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.photo.DeletePhotoRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.photo.DeletePhotoRequest();
                    if (object.id != null)
                        message.id = String(object.id);
                    return message;
                };

                /**
                 * Creates a plain object from a DeletePhotoRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.photo.DeletePhotoRequest} message DeletePhotoRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeletePhotoRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.id = "";
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this DeletePhotoRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.photo.DeletePhotoRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeletePhotoRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return DeletePhotoRequest;
            })();

            return photo;
        })();

        gotagme.user = (function() {

            /**
             * Namespace user.
             * @memberof huskysoft.gotagme
             * @namespace
             */
            var user = {};

            user.User = (function() {

                /**
                 * Properties of a User.
                 * @memberof huskysoft.gotagme.user
                 * @interface IUser
                 * @property {string|null} [id] User id
                 * @property {string|null} [displayName] User displayName
                 */

                /**
                 * Constructs a new User.
                 * @memberof huskysoft.gotagme.user
                 * @classdesc Represents a User.
                 * @implements IUser
                 * @constructor
                 * @param {huskysoft.gotagme.user.IUser=} [properties] Properties to set
                 */
                function User(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * User id.
                 * @member {string} id
                 * @memberof huskysoft.gotagme.user.User
                 * @instance
                 */
                User.prototype.id = "";

                /**
                 * User displayName.
                 * @member {string} displayName
                 * @memberof huskysoft.gotagme.user.User
                 * @instance
                 */
                User.prototype.displayName = "";

                /**
                 * Creates a new User instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.user.User
                 * @static
                 * @param {huskysoft.gotagme.user.IUser=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.user.User} User instance
                 */
                User.create = function create(properties) {
                    return new User(properties);
                };

                /**
                 * Encodes the specified User message. Does not implicitly {@link huskysoft.gotagme.user.User.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.user.User
                 * @static
                 * @param {huskysoft.gotagme.user.IUser} message User message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                User.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.displayName != null && message.hasOwnProperty("displayName"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.displayName);
                    return writer;
                };

                /**
                 * Encodes the specified User message, length delimited. Does not implicitly {@link huskysoft.gotagme.user.User.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.user.User
                 * @static
                 * @param {huskysoft.gotagme.user.IUser} message User message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                User.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a User message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.user.User
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.user.User} User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                User.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.user.User();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.displayName = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a User message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.user.User
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.user.User} User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                User.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a User message.
                 * @function verify
                 * @memberof huskysoft.gotagme.user.User
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                User.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.displayName != null && message.hasOwnProperty("displayName"))
                        if (!$util.isString(message.displayName))
                            return "displayName: string expected";
                    return null;
                };

                /**
                 * Creates a User message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.user.User
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.user.User} User
                 */
                User.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.user.User)
                        return object;
                    var message = new $root.huskysoft.gotagme.user.User();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.displayName != null)
                        message.displayName = String(object.displayName);
                    return message;
                };

                /**
                 * Creates a plain object from a User message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.user.User
                 * @static
                 * @param {huskysoft.gotagme.user.User} message User
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                User.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.displayName = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.displayName != null && message.hasOwnProperty("displayName"))
                        object.displayName = message.displayName;
                    return object;
                };

                /**
                 * Converts this User to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.user.User
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                User.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return User;
            })();

            user.GetUserRequest = (function() {

                /**
                 * Properties of a GetUserRequest.
                 * @memberof huskysoft.gotagme.user
                 * @interface IGetUserRequest
                 * @property {string|null} [id] GetUserRequest id
                 */

                /**
                 * Constructs a new GetUserRequest.
                 * @memberof huskysoft.gotagme.user
                 * @classdesc Represents a GetUserRequest.
                 * @implements IGetUserRequest
                 * @constructor
                 * @param {huskysoft.gotagme.user.IGetUserRequest=} [properties] Properties to set
                 */
                function GetUserRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetUserRequest id.
                 * @member {string} id
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @instance
                 */
                GetUserRequest.prototype.id = "";

                /**
                 * Creates a new GetUserRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @static
                 * @param {huskysoft.gotagme.user.IGetUserRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.user.GetUserRequest} GetUserRequest instance
                 */
                GetUserRequest.create = function create(properties) {
                    return new GetUserRequest(properties);
                };

                /**
                 * Encodes the specified GetUserRequest message. Does not implicitly {@link huskysoft.gotagme.user.GetUserRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @static
                 * @param {huskysoft.gotagme.user.IGetUserRequest} message GetUserRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetUserRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    return writer;
                };

                /**
                 * Encodes the specified GetUserRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.user.GetUserRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @static
                 * @param {huskysoft.gotagme.user.IGetUserRequest} message GetUserRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetUserRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetUserRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.user.GetUserRequest} GetUserRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetUserRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.user.GetUserRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetUserRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.user.GetUserRequest} GetUserRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetUserRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetUserRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetUserRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    return null;
                };

                /**
                 * Creates a GetUserRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.user.GetUserRequest} GetUserRequest
                 */
                GetUserRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.user.GetUserRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.user.GetUserRequest();
                    if (object.id != null)
                        message.id = String(object.id);
                    return message;
                };

                /**
                 * Creates a plain object from a GetUserRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @static
                 * @param {huskysoft.gotagme.user.GetUserRequest} message GetUserRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetUserRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.id = "";
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this GetUserRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.user.GetUserRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetUserRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetUserRequest;
            })();

            user.GetUserReponse = (function() {

                /**
                 * Properties of a GetUserReponse.
                 * @memberof huskysoft.gotagme.user
                 * @interface IGetUserReponse
                 * @property {huskysoft.gotagme.user.IUser|null} [user] GetUserReponse user
                 */

                /**
                 * Constructs a new GetUserReponse.
                 * @memberof huskysoft.gotagme.user
                 * @classdesc Represents a GetUserReponse.
                 * @implements IGetUserReponse
                 * @constructor
                 * @param {huskysoft.gotagme.user.IGetUserReponse=} [properties] Properties to set
                 */
                function GetUserReponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetUserReponse user.
                 * @member {huskysoft.gotagme.user.IUser|null|undefined} user
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @instance
                 */
                GetUserReponse.prototype.user = null;

                /**
                 * Creates a new GetUserReponse instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @static
                 * @param {huskysoft.gotagme.user.IGetUserReponse=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.user.GetUserReponse} GetUserReponse instance
                 */
                GetUserReponse.create = function create(properties) {
                    return new GetUserReponse(properties);
                };

                /**
                 * Encodes the specified GetUserReponse message. Does not implicitly {@link huskysoft.gotagme.user.GetUserReponse.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @static
                 * @param {huskysoft.gotagme.user.IGetUserReponse} message GetUserReponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetUserReponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.user != null && message.hasOwnProperty("user"))
                        $root.huskysoft.gotagme.user.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetUserReponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.user.GetUserReponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @static
                 * @param {huskysoft.gotagme.user.IGetUserReponse} message GetUserReponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetUserReponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetUserReponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.user.GetUserReponse} GetUserReponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetUserReponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.user.GetUserReponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.user = $root.huskysoft.gotagme.user.User.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetUserReponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.user.GetUserReponse} GetUserReponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetUserReponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetUserReponse message.
                 * @function verify
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetUserReponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.user != null && message.hasOwnProperty("user")) {
                        var error = $root.huskysoft.gotagme.user.User.verify(message.user);
                        if (error)
                            return "user." + error;
                    }
                    return null;
                };

                /**
                 * Creates a GetUserReponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.user.GetUserReponse} GetUserReponse
                 */
                GetUserReponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.user.GetUserReponse)
                        return object;
                    var message = new $root.huskysoft.gotagme.user.GetUserReponse();
                    if (object.user != null) {
                        if (typeof object.user !== "object")
                            throw TypeError(".huskysoft.gotagme.user.GetUserReponse.user: object expected");
                        message.user = $root.huskysoft.gotagme.user.User.fromObject(object.user);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetUserReponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @static
                 * @param {huskysoft.gotagme.user.GetUserReponse} message GetUserReponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetUserReponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.user = null;
                    if (message.user != null && message.hasOwnProperty("user"))
                        object.user = $root.huskysoft.gotagme.user.User.toObject(message.user, options);
                    return object;
                };

                /**
                 * Converts this GetUserReponse to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.user.GetUserReponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetUserReponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetUserReponse;
            })();

            return user;
        })();

        gotagme.tag = (function() {

            /**
             * Namespace tag.
             * @memberof huskysoft.gotagme
             * @namespace
             */
            var tag = {};

            tag.Tag = (function() {

                /**
                 * Properties of a Tag.
                 * @memberof huskysoft.gotagme.tag
                 * @interface ITag
                 * @property {string|null} [id] Tag id
                 * @property {string|null} [tag] Tag tag
                 * @property {string|null} [key] Tag key
                 * @property {number|null} [createdAt] Tag createdAt
                 * @property {huskysoft.gotagme.user.IUser|null} [addedBy] Tag addedBy
                 * @property {huskysoft.gotagme.photo.IPhoto|null} [photo] Tag photo
                 * @property {string|null} [display] Tag display
                 * @property {huskysoft.gotagme.user.IUser|null} [taggedUser] Tag taggedUser
                 * @property {huskysoft.gotagme.costume.ICostume|null} [costume] Tag costume
                 * @property {string|null} [hashtag] Tag hashtag
                 * @property {huskysoft.gotagme.approval.ApprovalState|null} [state] Tag state
                 */

                /**
                 * Constructs a new Tag.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a Tag.
                 * @implements ITag
                 * @constructor
                 * @param {huskysoft.gotagme.tag.ITag=} [properties] Properties to set
                 */
                function Tag(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Tag id.
                 * @member {string} id
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.id = "";

                /**
                 * Tag tag.
                 * @member {string} tag
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.tag = "";

                /**
                 * Tag key.
                 * @member {string} key
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.key = "";

                /**
                 * Tag createdAt.
                 * @member {number} createdAt
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.createdAt = 0;

                /**
                 * Tag addedBy.
                 * @member {huskysoft.gotagme.user.IUser|null|undefined} addedBy
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.addedBy = null;

                /**
                 * Tag photo.
                 * @member {huskysoft.gotagme.photo.IPhoto|null|undefined} photo
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.photo = null;

                /**
                 * Tag display.
                 * @member {string} display
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.display = "";

                /**
                 * Tag taggedUser.
                 * @member {huskysoft.gotagme.user.IUser|null|undefined} taggedUser
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.taggedUser = null;

                /**
                 * Tag costume.
                 * @member {huskysoft.gotagme.costume.ICostume|null|undefined} costume
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.costume = null;

                /**
                 * Tag hashtag.
                 * @member {string} hashtag
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.hashtag = "";

                /**
                 * Tag state.
                 * @member {huskysoft.gotagme.approval.ApprovalState} state
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Tag.prototype.state = 0;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Tag value.
                 * @member {"taggedUser"|"costume"|"hashtag"|undefined} value
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 */
                Object.defineProperty(Tag.prototype, "value", {
                    get: $util.oneOfGetter($oneOfFields = ["taggedUser", "costume", "hashtag"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Tag instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @static
                 * @param {huskysoft.gotagme.tag.ITag=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.Tag} Tag instance
                 */
                Tag.create = function create(properties) {
                    return new Tag(properties);
                };

                /**
                 * Encodes the specified Tag message. Does not implicitly {@link huskysoft.gotagme.tag.Tag.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @static
                 * @param {huskysoft.gotagme.tag.ITag} message Tag message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Tag.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.tag != null && message.hasOwnProperty("tag"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.tag);
                    if (message.key != null && message.hasOwnProperty("key"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.key);
                    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.createdAt);
                    if (message.addedBy != null && message.hasOwnProperty("addedBy"))
                        $root.huskysoft.gotagme.user.User.encode(message.addedBy, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.photo != null && message.hasOwnProperty("photo"))
                        $root.huskysoft.gotagme.photo.Photo.encode(message.photo, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.display != null && message.hasOwnProperty("display"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.display);
                    if (message.taggedUser != null && message.hasOwnProperty("taggedUser"))
                        $root.huskysoft.gotagme.user.User.encode(message.taggedUser, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    if (message.costume != null && message.hasOwnProperty("costume"))
                        $root.huskysoft.gotagme.costume.Costume.encode(message.costume, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    if (message.hashtag != null && message.hasOwnProperty("hashtag"))
                        writer.uint32(/* id 10, wireType 2 =*/82).string(message.hashtag);
                    if (message.state != null && message.hasOwnProperty("state"))
                        writer.uint32(/* id 11, wireType 0 =*/88).int32(message.state);
                    return writer;
                };

                /**
                 * Encodes the specified Tag message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.Tag.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @static
                 * @param {huskysoft.gotagme.tag.ITag} message Tag message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Tag.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Tag message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.Tag} Tag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tag.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.Tag();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.tag = reader.string();
                            break;
                        case 3:
                            message.key = reader.string();
                            break;
                        case 4:
                            message.createdAt = reader.int32();
                            break;
                        case 5:
                            message.addedBy = $root.huskysoft.gotagme.user.User.decode(reader, reader.uint32());
                            break;
                        case 6:
                            message.photo = $root.huskysoft.gotagme.photo.Photo.decode(reader, reader.uint32());
                            break;
                        case 7:
                            message.display = reader.string();
                            break;
                        case 8:
                            message.taggedUser = $root.huskysoft.gotagme.user.User.decode(reader, reader.uint32());
                            break;
                        case 9:
                            message.costume = $root.huskysoft.gotagme.costume.Costume.decode(reader, reader.uint32());
                            break;
                        case 10:
                            message.hashtag = reader.string();
                            break;
                        case 11:
                            message.state = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Tag message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.Tag} Tag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tag.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Tag message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Tag.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.tag != null && message.hasOwnProperty("tag"))
                        if (!$util.isString(message.tag))
                            return "tag: string expected";
                    if (message.key != null && message.hasOwnProperty("key"))
                        if (!$util.isString(message.key))
                            return "key: string expected";
                    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                        if (!$util.isInteger(message.createdAt))
                            return "createdAt: integer expected";
                    if (message.addedBy != null && message.hasOwnProperty("addedBy")) {
                        var error = $root.huskysoft.gotagme.user.User.verify(message.addedBy);
                        if (error)
                            return "addedBy." + error;
                    }
                    if (message.photo != null && message.hasOwnProperty("photo")) {
                        var error = $root.huskysoft.gotagme.photo.Photo.verify(message.photo);
                        if (error)
                            return "photo." + error;
                    }
                    if (message.display != null && message.hasOwnProperty("display"))
                        if (!$util.isString(message.display))
                            return "display: string expected";
                    if (message.taggedUser != null && message.hasOwnProperty("taggedUser")) {
                        properties.value = 1;
                        {
                            var error = $root.huskysoft.gotagme.user.User.verify(message.taggedUser);
                            if (error)
                                return "taggedUser." + error;
                        }
                    }
                    if (message.costume != null && message.hasOwnProperty("costume")) {
                        if (properties.value === 1)
                            return "value: multiple values";
                        properties.value = 1;
                        {
                            var error = $root.huskysoft.gotagme.costume.Costume.verify(message.costume);
                            if (error)
                                return "costume." + error;
                        }
                    }
                    if (message.hashtag != null && message.hasOwnProperty("hashtag")) {
                        if (properties.value === 1)
                            return "value: multiple values";
                        properties.value = 1;
                        if (!$util.isString(message.hashtag))
                            return "hashtag: string expected";
                    }
                    if (message.state != null && message.hasOwnProperty("state"))
                        switch (message.state) {
                        default:
                            return "state: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a Tag message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.Tag} Tag
                 */
                Tag.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.Tag)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.Tag();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.tag != null)
                        message.tag = String(object.tag);
                    if (object.key != null)
                        message.key = String(object.key);
                    if (object.createdAt != null)
                        message.createdAt = object.createdAt | 0;
                    if (object.addedBy != null) {
                        if (typeof object.addedBy !== "object")
                            throw TypeError(".huskysoft.gotagme.tag.Tag.addedBy: object expected");
                        message.addedBy = $root.huskysoft.gotagme.user.User.fromObject(object.addedBy);
                    }
                    if (object.photo != null) {
                        if (typeof object.photo !== "object")
                            throw TypeError(".huskysoft.gotagme.tag.Tag.photo: object expected");
                        message.photo = $root.huskysoft.gotagme.photo.Photo.fromObject(object.photo);
                    }
                    if (object.display != null)
                        message.display = String(object.display);
                    if (object.taggedUser != null) {
                        if (typeof object.taggedUser !== "object")
                            throw TypeError(".huskysoft.gotagme.tag.Tag.taggedUser: object expected");
                        message.taggedUser = $root.huskysoft.gotagme.user.User.fromObject(object.taggedUser);
                    }
                    if (object.costume != null) {
                        if (typeof object.costume !== "object")
                            throw TypeError(".huskysoft.gotagme.tag.Tag.costume: object expected");
                        message.costume = $root.huskysoft.gotagme.costume.Costume.fromObject(object.costume);
                    }
                    if (object.hashtag != null)
                        message.hashtag = String(object.hashtag);
                    switch (object.state) {
                    case "NEW":
                    case 0:
                        message.state = 0;
                        break;
                    case "APPROVED":
                    case 1:
                        message.state = 1;
                        break;
                    case "REJECTED":
                    case 2:
                        message.state = 2;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Tag message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @static
                 * @param {huskysoft.gotagme.tag.Tag} message Tag
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Tag.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.tag = "";
                        object.key = "";
                        object.createdAt = 0;
                        object.addedBy = null;
                        object.photo = null;
                        object.display = "";
                        object.state = options.enums === String ? "NEW" : 0;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.tag != null && message.hasOwnProperty("tag"))
                        object.tag = message.tag;
                    if (message.key != null && message.hasOwnProperty("key"))
                        object.key = message.key;
                    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                        object.createdAt = message.createdAt;
                    if (message.addedBy != null && message.hasOwnProperty("addedBy"))
                        object.addedBy = $root.huskysoft.gotagme.user.User.toObject(message.addedBy, options);
                    if (message.photo != null && message.hasOwnProperty("photo"))
                        object.photo = $root.huskysoft.gotagme.photo.Photo.toObject(message.photo, options);
                    if (message.display != null && message.hasOwnProperty("display"))
                        object.display = message.display;
                    if (message.taggedUser != null && message.hasOwnProperty("taggedUser")) {
                        object.taggedUser = $root.huskysoft.gotagme.user.User.toObject(message.taggedUser, options);
                        if (options.oneofs)
                            object.value = "taggedUser";
                    }
                    if (message.costume != null && message.hasOwnProperty("costume")) {
                        object.costume = $root.huskysoft.gotagme.costume.Costume.toObject(message.costume, options);
                        if (options.oneofs)
                            object.value = "costume";
                    }
                    if (message.hashtag != null && message.hasOwnProperty("hashtag")) {
                        object.hashtag = message.hashtag;
                        if (options.oneofs)
                            object.value = "hashtag";
                    }
                    if (message.state != null && message.hasOwnProperty("state"))
                        object.state = options.enums === String ? $root.huskysoft.gotagme.approval.ApprovalState[message.state] : message.state;
                    return object;
                };

                /**
                 * Converts this Tag to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.Tag
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Tag.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Tag;
            })();

            tag.AddTagsToPhotoRequest = (function() {

                /**
                 * Properties of an AddTagsToPhotoRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IAddTagsToPhotoRequest
                 * @property {Array.<huskysoft.gotagme.tag.ITag>|null} [tags] AddTagsToPhotoRequest tags
                 * @property {huskysoft.gotagme.tag.ITag|null} [capturedBy] AddTagsToPhotoRequest capturedBy
                 */

                /**
                 * Constructs a new AddTagsToPhotoRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents an AddTagsToPhotoRequest.
                 * @implements IAddTagsToPhotoRequest
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IAddTagsToPhotoRequest=} [properties] Properties to set
                 */
                function AddTagsToPhotoRequest(properties) {
                    this.tags = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AddTagsToPhotoRequest tags.
                 * @member {Array.<huskysoft.gotagme.tag.ITag>} tags
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @instance
                 */
                AddTagsToPhotoRequest.prototype.tags = $util.emptyArray;

                /**
                 * AddTagsToPhotoRequest capturedBy.
                 * @member {huskysoft.gotagme.tag.ITag|null|undefined} capturedBy
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @instance
                 */
                AddTagsToPhotoRequest.prototype.capturedBy = null;

                /**
                 * Creates a new AddTagsToPhotoRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IAddTagsToPhotoRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.AddTagsToPhotoRequest} AddTagsToPhotoRequest instance
                 */
                AddTagsToPhotoRequest.create = function create(properties) {
                    return new AddTagsToPhotoRequest(properties);
                };

                /**
                 * Encodes the specified AddTagsToPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.tag.AddTagsToPhotoRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IAddTagsToPhotoRequest} message AddTagsToPhotoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AddTagsToPhotoRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.tags != null && message.tags.length)
                        for (var i = 0; i < message.tags.length; ++i)
                            $root.huskysoft.gotagme.tag.Tag.encode(message.tags[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                        $root.huskysoft.gotagme.tag.Tag.encode(message.capturedBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified AddTagsToPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.AddTagsToPhotoRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IAddTagsToPhotoRequest} message AddTagsToPhotoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AddTagsToPhotoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AddTagsToPhotoRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.AddTagsToPhotoRequest} AddTagsToPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AddTagsToPhotoRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.AddTagsToPhotoRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.tags && message.tags.length))
                                message.tags = [];
                            message.tags.push($root.huskysoft.gotagme.tag.Tag.decode(reader, reader.uint32()));
                            break;
                        case 2:
                            message.capturedBy = $root.huskysoft.gotagme.tag.Tag.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an AddTagsToPhotoRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.AddTagsToPhotoRequest} AddTagsToPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AddTagsToPhotoRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AddTagsToPhotoRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AddTagsToPhotoRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.tags != null && message.hasOwnProperty("tags")) {
                        if (!Array.isArray(message.tags))
                            return "tags: array expected";
                        for (var i = 0; i < message.tags.length; ++i) {
                            var error = $root.huskysoft.gotagme.tag.Tag.verify(message.tags[i]);
                            if (error)
                                return "tags." + error;
                        }
                    }
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy")) {
                        var error = $root.huskysoft.gotagme.tag.Tag.verify(message.capturedBy);
                        if (error)
                            return "capturedBy." + error;
                    }
                    return null;
                };

                /**
                 * Creates an AddTagsToPhotoRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.AddTagsToPhotoRequest} AddTagsToPhotoRequest
                 */
                AddTagsToPhotoRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.AddTagsToPhotoRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.AddTagsToPhotoRequest();
                    if (object.tags) {
                        if (!Array.isArray(object.tags))
                            throw TypeError(".huskysoft.gotagme.tag.AddTagsToPhotoRequest.tags: array expected");
                        message.tags = [];
                        for (var i = 0; i < object.tags.length; ++i) {
                            if (typeof object.tags[i] !== "object")
                                throw TypeError(".huskysoft.gotagme.tag.AddTagsToPhotoRequest.tags: object expected");
                            message.tags[i] = $root.huskysoft.gotagme.tag.Tag.fromObject(object.tags[i]);
                        }
                    }
                    if (object.capturedBy != null) {
                        if (typeof object.capturedBy !== "object")
                            throw TypeError(".huskysoft.gotagme.tag.AddTagsToPhotoRequest.capturedBy: object expected");
                        message.capturedBy = $root.huskysoft.gotagme.tag.Tag.fromObject(object.capturedBy);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an AddTagsToPhotoRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.AddTagsToPhotoRequest} message AddTagsToPhotoRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AddTagsToPhotoRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.tags = [];
                    if (options.defaults)
                        object.capturedBy = null;
                    if (message.tags && message.tags.length) {
                        object.tags = [];
                        for (var j = 0; j < message.tags.length; ++j)
                            object.tags[j] = $root.huskysoft.gotagme.tag.Tag.toObject(message.tags[j], options);
                    }
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                        object.capturedBy = $root.huskysoft.gotagme.tag.Tag.toObject(message.capturedBy, options);
                    return object;
                };

                /**
                 * Converts this AddTagsToPhotoRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.AddTagsToPhotoRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AddTagsToPhotoRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return AddTagsToPhotoRequest;
            })();

            tag.ModifyTagRequest = (function() {

                /**
                 * Properties of a ModifyTagRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IModifyTagRequest
                 * @property {string|null} [id] ModifyTagRequest id
                 * @property {huskysoft.gotagme.approval.ApprovalState|null} [state] ModifyTagRequest state
                 */

                /**
                 * Constructs a new ModifyTagRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a ModifyTagRequest.
                 * @implements IModifyTagRequest
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IModifyTagRequest=} [properties] Properties to set
                 */
                function ModifyTagRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ModifyTagRequest id.
                 * @member {string} id
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @instance
                 */
                ModifyTagRequest.prototype.id = "";

                /**
                 * ModifyTagRequest state.
                 * @member {huskysoft.gotagme.approval.ApprovalState} state
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @instance
                 */
                ModifyTagRequest.prototype.state = 0;

                /**
                 * Creates a new ModifyTagRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IModifyTagRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.ModifyTagRequest} ModifyTagRequest instance
                 */
                ModifyTagRequest.create = function create(properties) {
                    return new ModifyTagRequest(properties);
                };

                /**
                 * Encodes the specified ModifyTagRequest message. Does not implicitly {@link huskysoft.gotagme.tag.ModifyTagRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IModifyTagRequest} message ModifyTagRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ModifyTagRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.state != null && message.hasOwnProperty("state"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
                    return writer;
                };

                /**
                 * Encodes the specified ModifyTagRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.ModifyTagRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IModifyTagRequest} message ModifyTagRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ModifyTagRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ModifyTagRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.ModifyTagRequest} ModifyTagRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ModifyTagRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.ModifyTagRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.state = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ModifyTagRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.ModifyTagRequest} ModifyTagRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ModifyTagRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ModifyTagRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ModifyTagRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.state != null && message.hasOwnProperty("state"))
                        switch (message.state) {
                        default:
                            return "state: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a ModifyTagRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.ModifyTagRequest} ModifyTagRequest
                 */
                ModifyTagRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.ModifyTagRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.ModifyTagRequest();
                    if (object.id != null)
                        message.id = String(object.id);
                    switch (object.state) {
                    case "NEW":
                    case 0:
                        message.state = 0;
                        break;
                    case "APPROVED":
                    case 1:
                        message.state = 1;
                        break;
                    case "REJECTED":
                    case 2:
                        message.state = 2;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ModifyTagRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.ModifyTagRequest} message ModifyTagRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ModifyTagRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.state = options.enums === String ? "NEW" : 0;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.state != null && message.hasOwnProperty("state"))
                        object.state = options.enums === String ? $root.huskysoft.gotagme.approval.ApprovalState[message.state] : message.state;
                    return object;
                };

                /**
                 * Converts this ModifyTagRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.ModifyTagRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ModifyTagRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ModifyTagRequest;
            })();

            tag.GetTagsRequest = (function() {

                /**
                 * Properties of a GetTagsRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IGetTagsRequest
                 * @property {string|null} [tagID] GetTagsRequest tagID
                 * @property {string|null} [photoID] GetTagsRequest photoID
                 * @property {string|null} [userID] GetTagsRequest userID
                 * @property {string|null} [costumeID] GetTagsRequest costumeID
                 * @property {string|null} [hashtag] GetTagsRequest hashtag
                 * @property {huskysoft.gotagme.approval.ApprovalState|null} [stateFilter] GetTagsRequest stateFilter
                 */

                /**
                 * Constructs a new GetTagsRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a GetTagsRequest.
                 * @implements IGetTagsRequest
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IGetTagsRequest=} [properties] Properties to set
                 */
                function GetTagsRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetTagsRequest tagID.
                 * @member {string} tagID
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @instance
                 */
                GetTagsRequest.prototype.tagID = "";

                /**
                 * GetTagsRequest photoID.
                 * @member {string} photoID
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @instance
                 */
                GetTagsRequest.prototype.photoID = "";

                /**
                 * GetTagsRequest userID.
                 * @member {string} userID
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @instance
                 */
                GetTagsRequest.prototype.userID = "";

                /**
                 * GetTagsRequest costumeID.
                 * @member {string} costumeID
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @instance
                 */
                GetTagsRequest.prototype.costumeID = "";

                /**
                 * GetTagsRequest hashtag.
                 * @member {string} hashtag
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @instance
                 */
                GetTagsRequest.prototype.hashtag = "";

                /**
                 * GetTagsRequest stateFilter.
                 * @member {huskysoft.gotagme.approval.ApprovalState} stateFilter
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @instance
                 */
                GetTagsRequest.prototype.stateFilter = 0;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * GetTagsRequest id.
                 * @member {"tagID"|"photoID"|"userID"|"costumeID"|"hashtag"|undefined} id
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @instance
                 */
                Object.defineProperty(GetTagsRequest.prototype, "id", {
                    get: $util.oneOfGetter($oneOfFields = ["tagID", "photoID", "userID", "costumeID", "hashtag"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new GetTagsRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagsRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.GetTagsRequest} GetTagsRequest instance
                 */
                GetTagsRequest.create = function create(properties) {
                    return new GetTagsRequest(properties);
                };

                /**
                 * Encodes the specified GetTagsRequest message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagsRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagsRequest} message GetTagsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagsRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.tagID != null && message.hasOwnProperty("tagID"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.tagID);
                    if (message.photoID != null && message.hasOwnProperty("photoID"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.photoID);
                    if (message.userID != null && message.hasOwnProperty("userID"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.userID);
                    if (message.stateFilter != null && message.hasOwnProperty("stateFilter"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.stateFilter);
                    if (message.costumeID != null && message.hasOwnProperty("costumeID"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.costumeID);
                    if (message.hashtag != null && message.hasOwnProperty("hashtag"))
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.hashtag);
                    return writer;
                };

                /**
                 * Encodes the specified GetTagsRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagsRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagsRequest} message GetTagsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetTagsRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.GetTagsRequest} GetTagsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagsRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.GetTagsRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.tagID = reader.string();
                            break;
                        case 2:
                            message.photoID = reader.string();
                            break;
                        case 3:
                            message.userID = reader.string();
                            break;
                        case 5:
                            message.costumeID = reader.string();
                            break;
                        case 6:
                            message.hashtag = reader.string();
                            break;
                        case 4:
                            message.stateFilter = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetTagsRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.GetTagsRequest} GetTagsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagsRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetTagsRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetTagsRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.tagID != null && message.hasOwnProperty("tagID")) {
                        properties.id = 1;
                        if (!$util.isString(message.tagID))
                            return "tagID: string expected";
                    }
                    if (message.photoID != null && message.hasOwnProperty("photoID")) {
                        if (properties.id === 1)
                            return "id: multiple values";
                        properties.id = 1;
                        if (!$util.isString(message.photoID))
                            return "photoID: string expected";
                    }
                    if (message.userID != null && message.hasOwnProperty("userID")) {
                        if (properties.id === 1)
                            return "id: multiple values";
                        properties.id = 1;
                        if (!$util.isString(message.userID))
                            return "userID: string expected";
                    }
                    if (message.costumeID != null && message.hasOwnProperty("costumeID")) {
                        if (properties.id === 1)
                            return "id: multiple values";
                        properties.id = 1;
                        if (!$util.isString(message.costumeID))
                            return "costumeID: string expected";
                    }
                    if (message.hashtag != null && message.hasOwnProperty("hashtag")) {
                        if (properties.id === 1)
                            return "id: multiple values";
                        properties.id = 1;
                        if (!$util.isString(message.hashtag))
                            return "hashtag: string expected";
                    }
                    if (message.stateFilter != null && message.hasOwnProperty("stateFilter"))
                        switch (message.stateFilter) {
                        default:
                            return "stateFilter: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a GetTagsRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.GetTagsRequest} GetTagsRequest
                 */
                GetTagsRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.GetTagsRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.GetTagsRequest();
                    if (object.tagID != null)
                        message.tagID = String(object.tagID);
                    if (object.photoID != null)
                        message.photoID = String(object.photoID);
                    if (object.userID != null)
                        message.userID = String(object.userID);
                    if (object.costumeID != null)
                        message.costumeID = String(object.costumeID);
                    if (object.hashtag != null)
                        message.hashtag = String(object.hashtag);
                    switch (object.stateFilter) {
                    case "NEW":
                    case 0:
                        message.stateFilter = 0;
                        break;
                    case "APPROVED":
                    case 1:
                        message.stateFilter = 1;
                        break;
                    case "REJECTED":
                    case 2:
                        message.stateFilter = 2;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetTagsRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.GetTagsRequest} message GetTagsRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetTagsRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.stateFilter = options.enums === String ? "NEW" : 0;
                    if (message.tagID != null && message.hasOwnProperty("tagID")) {
                        object.tagID = message.tagID;
                        if (options.oneofs)
                            object.id = "tagID";
                    }
                    if (message.photoID != null && message.hasOwnProperty("photoID")) {
                        object.photoID = message.photoID;
                        if (options.oneofs)
                            object.id = "photoID";
                    }
                    if (message.userID != null && message.hasOwnProperty("userID")) {
                        object.userID = message.userID;
                        if (options.oneofs)
                            object.id = "userID";
                    }
                    if (message.stateFilter != null && message.hasOwnProperty("stateFilter"))
                        object.stateFilter = options.enums === String ? $root.huskysoft.gotagme.approval.ApprovalState[message.stateFilter] : message.stateFilter;
                    if (message.costumeID != null && message.hasOwnProperty("costumeID")) {
                        object.costumeID = message.costumeID;
                        if (options.oneofs)
                            object.id = "costumeID";
                    }
                    if (message.hashtag != null && message.hasOwnProperty("hashtag")) {
                        object.hashtag = message.hashtag;
                        if (options.oneofs)
                            object.id = "hashtag";
                    }
                    return object;
                };

                /**
                 * Converts this GetTagsRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.GetTagsRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetTagsRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetTagsRequest;
            })();

            tag.GetTagsResponse = (function() {

                /**
                 * Properties of a GetTagsResponse.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IGetTagsResponse
                 * @property {Array.<huskysoft.gotagme.tag.ITag>|null} [tags] GetTagsResponse tags
                 * @property {huskysoft.gotagme.tag.ITag|null} [capturedBy] GetTagsResponse capturedBy
                 */

                /**
                 * Constructs a new GetTagsResponse.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a GetTagsResponse.
                 * @implements IGetTagsResponse
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IGetTagsResponse=} [properties] Properties to set
                 */
                function GetTagsResponse(properties) {
                    this.tags = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetTagsResponse tags.
                 * @member {Array.<huskysoft.gotagme.tag.ITag>} tags
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @instance
                 */
                GetTagsResponse.prototype.tags = $util.emptyArray;

                /**
                 * GetTagsResponse capturedBy.
                 * @member {huskysoft.gotagme.tag.ITag|null|undefined} capturedBy
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @instance
                 */
                GetTagsResponse.prototype.capturedBy = null;

                /**
                 * Creates a new GetTagsResponse instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagsResponse=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.GetTagsResponse} GetTagsResponse instance
                 */
                GetTagsResponse.create = function create(properties) {
                    return new GetTagsResponse(properties);
                };

                /**
                 * Encodes the specified GetTagsResponse message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagsResponse} message GetTagsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.tags != null && message.tags.length)
                        for (var i = 0; i < message.tags.length; ++i)
                            $root.huskysoft.gotagme.tag.Tag.encode(message.tags[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                        $root.huskysoft.gotagme.tag.Tag.encode(message.capturedBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetTagsResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagsResponse} message GetTagsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetTagsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.GetTagsResponse} GetTagsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagsResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.GetTagsResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.tags && message.tags.length))
                                message.tags = [];
                            message.tags.push($root.huskysoft.gotagme.tag.Tag.decode(reader, reader.uint32()));
                            break;
                        case 2:
                            message.capturedBy = $root.huskysoft.gotagme.tag.Tag.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetTagsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.GetTagsResponse} GetTagsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetTagsResponse message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetTagsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.tags != null && message.hasOwnProperty("tags")) {
                        if (!Array.isArray(message.tags))
                            return "tags: array expected";
                        for (var i = 0; i < message.tags.length; ++i) {
                            var error = $root.huskysoft.gotagme.tag.Tag.verify(message.tags[i]);
                            if (error)
                                return "tags." + error;
                        }
                    }
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy")) {
                        var error = $root.huskysoft.gotagme.tag.Tag.verify(message.capturedBy);
                        if (error)
                            return "capturedBy." + error;
                    }
                    return null;
                };

                /**
                 * Creates a GetTagsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.GetTagsResponse} GetTagsResponse
                 */
                GetTagsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.GetTagsResponse)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.GetTagsResponse();
                    if (object.tags) {
                        if (!Array.isArray(object.tags))
                            throw TypeError(".huskysoft.gotagme.tag.GetTagsResponse.tags: array expected");
                        message.tags = [];
                        for (var i = 0; i < object.tags.length; ++i) {
                            if (typeof object.tags[i] !== "object")
                                throw TypeError(".huskysoft.gotagme.tag.GetTagsResponse.tags: object expected");
                            message.tags[i] = $root.huskysoft.gotagme.tag.Tag.fromObject(object.tags[i]);
                        }
                    }
                    if (object.capturedBy != null) {
                        if (typeof object.capturedBy !== "object")
                            throw TypeError(".huskysoft.gotagme.tag.GetTagsResponse.capturedBy: object expected");
                        message.capturedBy = $root.huskysoft.gotagme.tag.Tag.fromObject(object.capturedBy);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetTagsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.GetTagsResponse} message GetTagsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetTagsResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.tags = [];
                    if (options.defaults)
                        object.capturedBy = null;
                    if (message.tags && message.tags.length) {
                        object.tags = [];
                        for (var j = 0; j < message.tags.length; ++j)
                            object.tags[j] = $root.huskysoft.gotagme.tag.Tag.toObject(message.tags[j], options);
                    }
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                        object.capturedBy = $root.huskysoft.gotagme.tag.Tag.toObject(message.capturedBy, options);
                    return object;
                };

                /**
                 * Converts this GetTagsResponse to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.GetTagsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetTagsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetTagsResponse;
            })();

            tag.GetAutocompleteTagsRequest = (function() {

                /**
                 * Properties of a GetAutocompleteTagsRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IGetAutocompleteTagsRequest
                 * @property {string|null} [term] GetAutocompleteTagsRequest term
                 */

                /**
                 * Constructs a new GetAutocompleteTagsRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a GetAutocompleteTagsRequest.
                 * @implements IGetAutocompleteTagsRequest
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IGetAutocompleteTagsRequest=} [properties] Properties to set
                 */
                function GetAutocompleteTagsRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetAutocompleteTagsRequest term.
                 * @member {string} term
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @instance
                 */
                GetAutocompleteTagsRequest.prototype.term = "";

                /**
                 * Creates a new GetAutocompleteTagsRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetAutocompleteTagsRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.GetAutocompleteTagsRequest} GetAutocompleteTagsRequest instance
                 */
                GetAutocompleteTagsRequest.create = function create(properties) {
                    return new GetAutocompleteTagsRequest(properties);
                };

                /**
                 * Encodes the specified GetAutocompleteTagsRequest message. Does not implicitly {@link huskysoft.gotagme.tag.GetAutocompleteTagsRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetAutocompleteTagsRequest} message GetAutocompleteTagsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetAutocompleteTagsRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.term != null && message.hasOwnProperty("term"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.term);
                    return writer;
                };

                /**
                 * Encodes the specified GetAutocompleteTagsRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetAutocompleteTagsRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetAutocompleteTagsRequest} message GetAutocompleteTagsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetAutocompleteTagsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetAutocompleteTagsRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.GetAutocompleteTagsRequest} GetAutocompleteTagsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetAutocompleteTagsRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.GetAutocompleteTagsRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.term = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetAutocompleteTagsRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.GetAutocompleteTagsRequest} GetAutocompleteTagsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetAutocompleteTagsRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetAutocompleteTagsRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetAutocompleteTagsRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.term != null && message.hasOwnProperty("term"))
                        if (!$util.isString(message.term))
                            return "term: string expected";
                    return null;
                };

                /**
                 * Creates a GetAutocompleteTagsRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.GetAutocompleteTagsRequest} GetAutocompleteTagsRequest
                 */
                GetAutocompleteTagsRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.GetAutocompleteTagsRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.GetAutocompleteTagsRequest();
                    if (object.term != null)
                        message.term = String(object.term);
                    return message;
                };

                /**
                 * Creates a plain object from a GetAutocompleteTagsRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.GetAutocompleteTagsRequest} message GetAutocompleteTagsRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetAutocompleteTagsRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.term = "";
                    if (message.term != null && message.hasOwnProperty("term"))
                        object.term = message.term;
                    return object;
                };

                /**
                 * Converts this GetAutocompleteTagsRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetAutocompleteTagsRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetAutocompleteTagsRequest;
            })();

            tag.GetAutocompleteTagsResponse = (function() {

                /**
                 * Properties of a GetAutocompleteTagsResponse.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IGetAutocompleteTagsResponse
                 * @property {Array.<huskysoft.gotagme.tag.ITag>|null} [tags] GetAutocompleteTagsResponse tags
                 */

                /**
                 * Constructs a new GetAutocompleteTagsResponse.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a GetAutocompleteTagsResponse.
                 * @implements IGetAutocompleteTagsResponse
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IGetAutocompleteTagsResponse=} [properties] Properties to set
                 */
                function GetAutocompleteTagsResponse(properties) {
                    this.tags = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetAutocompleteTagsResponse tags.
                 * @member {Array.<huskysoft.gotagme.tag.ITag>} tags
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @instance
                 */
                GetAutocompleteTagsResponse.prototype.tags = $util.emptyArray;

                /**
                 * Creates a new GetAutocompleteTagsResponse instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetAutocompleteTagsResponse=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.GetAutocompleteTagsResponse} GetAutocompleteTagsResponse instance
                 */
                GetAutocompleteTagsResponse.create = function create(properties) {
                    return new GetAutocompleteTagsResponse(properties);
                };

                /**
                 * Encodes the specified GetAutocompleteTagsResponse message. Does not implicitly {@link huskysoft.gotagme.tag.GetAutocompleteTagsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetAutocompleteTagsResponse} message GetAutocompleteTagsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetAutocompleteTagsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.tags != null && message.tags.length)
                        for (var i = 0; i < message.tags.length; ++i)
                            $root.huskysoft.gotagme.tag.Tag.encode(message.tags[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetAutocompleteTagsResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetAutocompleteTagsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetAutocompleteTagsResponse} message GetAutocompleteTagsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetAutocompleteTagsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetAutocompleteTagsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.GetAutocompleteTagsResponse} GetAutocompleteTagsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetAutocompleteTagsResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.GetAutocompleteTagsResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.tags && message.tags.length))
                                message.tags = [];
                            message.tags.push($root.huskysoft.gotagme.tag.Tag.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetAutocompleteTagsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.GetAutocompleteTagsResponse} GetAutocompleteTagsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetAutocompleteTagsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetAutocompleteTagsResponse message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetAutocompleteTagsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.tags != null && message.hasOwnProperty("tags")) {
                        if (!Array.isArray(message.tags))
                            return "tags: array expected";
                        for (var i = 0; i < message.tags.length; ++i) {
                            var error = $root.huskysoft.gotagme.tag.Tag.verify(message.tags[i]);
                            if (error)
                                return "tags." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a GetAutocompleteTagsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.GetAutocompleteTagsResponse} GetAutocompleteTagsResponse
                 */
                GetAutocompleteTagsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.GetAutocompleteTagsResponse)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.GetAutocompleteTagsResponse();
                    if (object.tags) {
                        if (!Array.isArray(object.tags))
                            throw TypeError(".huskysoft.gotagme.tag.GetAutocompleteTagsResponse.tags: array expected");
                        message.tags = [];
                        for (var i = 0; i < object.tags.length; ++i) {
                            if (typeof object.tags[i] !== "object")
                                throw TypeError(".huskysoft.gotagme.tag.GetAutocompleteTagsResponse.tags: object expected");
                            message.tags[i] = $root.huskysoft.gotagme.tag.Tag.fromObject(object.tags[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetAutocompleteTagsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.GetAutocompleteTagsResponse} message GetAutocompleteTagsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetAutocompleteTagsResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.tags = [];
                    if (message.tags && message.tags.length) {
                        object.tags = [];
                        for (var j = 0; j < message.tags.length; ++j)
                            object.tags[j] = $root.huskysoft.gotagme.tag.Tag.toObject(message.tags[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this GetAutocompleteTagsResponse to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.GetAutocompleteTagsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetAutocompleteTagsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetAutocompleteTagsResponse;
            })();

            tag.RejectTagRequest = (function() {

                /**
                 * Properties of a RejectTagRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IRejectTagRequest
                 * @property {string|null} [id] RejectTagRequest id
                 */

                /**
                 * Constructs a new RejectTagRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a RejectTagRequest.
                 * @implements IRejectTagRequest
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IRejectTagRequest=} [properties] Properties to set
                 */
                function RejectTagRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RejectTagRequest id.
                 * @member {string} id
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @instance
                 */
                RejectTagRequest.prototype.id = "";

                /**
                 * Creates a new RejectTagRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IRejectTagRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.RejectTagRequest} RejectTagRequest instance
                 */
                RejectTagRequest.create = function create(properties) {
                    return new RejectTagRequest(properties);
                };

                /**
                 * Encodes the specified RejectTagRequest message. Does not implicitly {@link huskysoft.gotagme.tag.RejectTagRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IRejectTagRequest} message RejectTagRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RejectTagRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    return writer;
                };

                /**
                 * Encodes the specified RejectTagRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.RejectTagRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IRejectTagRequest} message RejectTagRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RejectTagRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RejectTagRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.RejectTagRequest} RejectTagRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RejectTagRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.RejectTagRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RejectTagRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.RejectTagRequest} RejectTagRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RejectTagRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RejectTagRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RejectTagRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    return null;
                };

                /**
                 * Creates a RejectTagRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.RejectTagRequest} RejectTagRequest
                 */
                RejectTagRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.RejectTagRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.RejectTagRequest();
                    if (object.id != null)
                        message.id = String(object.id);
                    return message;
                };

                /**
                 * Creates a plain object from a RejectTagRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.RejectTagRequest} message RejectTagRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RejectTagRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.id = "";
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this RejectTagRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.RejectTagRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RejectTagRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return RejectTagRequest;
            })();

            tag.GetTagCountsRequest = (function() {

                /**
                 * Properties of a GetTagCountsRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IGetTagCountsRequest
                 * @property {Array.<string>|null} [costumeIDs] GetTagCountsRequest costumeIDs
                 * @property {Array.<string>|null} [userIDs] GetTagCountsRequest userIDs
                 * @property {Array.<string>|null} [hashtags] GetTagCountsRequest hashtags
                 */

                /**
                 * Constructs a new GetTagCountsRequest.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a GetTagCountsRequest.
                 * @implements IGetTagCountsRequest
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IGetTagCountsRequest=} [properties] Properties to set
                 */
                function GetTagCountsRequest(properties) {
                    this.costumeIDs = [];
                    this.userIDs = [];
                    this.hashtags = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetTagCountsRequest costumeIDs.
                 * @member {Array.<string>} costumeIDs
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @instance
                 */
                GetTagCountsRequest.prototype.costumeIDs = $util.emptyArray;

                /**
                 * GetTagCountsRequest userIDs.
                 * @member {Array.<string>} userIDs
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @instance
                 */
                GetTagCountsRequest.prototype.userIDs = $util.emptyArray;

                /**
                 * GetTagCountsRequest hashtags.
                 * @member {Array.<string>} hashtags
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @instance
                 */
                GetTagCountsRequest.prototype.hashtags = $util.emptyArray;

                /**
                 * Creates a new GetTagCountsRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagCountsRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.GetTagCountsRequest} GetTagCountsRequest instance
                 */
                GetTagCountsRequest.create = function create(properties) {
                    return new GetTagCountsRequest(properties);
                };

                /**
                 * Encodes the specified GetTagCountsRequest message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountsRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagCountsRequest} message GetTagCountsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagCountsRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.costumeIDs != null && message.costumeIDs.length)
                        for (var i = 0; i < message.costumeIDs.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.costumeIDs[i]);
                    if (message.userIDs != null && message.userIDs.length)
                        for (var i = 0; i < message.userIDs.length; ++i)
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.userIDs[i]);
                    if (message.hashtags != null && message.hashtags.length)
                        for (var i = 0; i < message.hashtags.length; ++i)
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.hashtags[i]);
                    return writer;
                };

                /**
                 * Encodes the specified GetTagCountsRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountsRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagCountsRequest} message GetTagCountsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagCountsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetTagCountsRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.GetTagCountsRequest} GetTagCountsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagCountsRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.GetTagCountsRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.costumeIDs && message.costumeIDs.length))
                                message.costumeIDs = [];
                            message.costumeIDs.push(reader.string());
                            break;
                        case 2:
                            if (!(message.userIDs && message.userIDs.length))
                                message.userIDs = [];
                            message.userIDs.push(reader.string());
                            break;
                        case 3:
                            if (!(message.hashtags && message.hashtags.length))
                                message.hashtags = [];
                            message.hashtags.push(reader.string());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetTagCountsRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.GetTagCountsRequest} GetTagCountsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagCountsRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetTagCountsRequest message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetTagCountsRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.costumeIDs != null && message.hasOwnProperty("costumeIDs")) {
                        if (!Array.isArray(message.costumeIDs))
                            return "costumeIDs: array expected";
                        for (var i = 0; i < message.costumeIDs.length; ++i)
                            if (!$util.isString(message.costumeIDs[i]))
                                return "costumeIDs: string[] expected";
                    }
                    if (message.userIDs != null && message.hasOwnProperty("userIDs")) {
                        if (!Array.isArray(message.userIDs))
                            return "userIDs: array expected";
                        for (var i = 0; i < message.userIDs.length; ++i)
                            if (!$util.isString(message.userIDs[i]))
                                return "userIDs: string[] expected";
                    }
                    if (message.hashtags != null && message.hasOwnProperty("hashtags")) {
                        if (!Array.isArray(message.hashtags))
                            return "hashtags: array expected";
                        for (var i = 0; i < message.hashtags.length; ++i)
                            if (!$util.isString(message.hashtags[i]))
                                return "hashtags: string[] expected";
                    }
                    return null;
                };

                /**
                 * Creates a GetTagCountsRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.GetTagCountsRequest} GetTagCountsRequest
                 */
                GetTagCountsRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.GetTagCountsRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.GetTagCountsRequest();
                    if (object.costumeIDs) {
                        if (!Array.isArray(object.costumeIDs))
                            throw TypeError(".huskysoft.gotagme.tag.GetTagCountsRequest.costumeIDs: array expected");
                        message.costumeIDs = [];
                        for (var i = 0; i < object.costumeIDs.length; ++i)
                            message.costumeIDs[i] = String(object.costumeIDs[i]);
                    }
                    if (object.userIDs) {
                        if (!Array.isArray(object.userIDs))
                            throw TypeError(".huskysoft.gotagme.tag.GetTagCountsRequest.userIDs: array expected");
                        message.userIDs = [];
                        for (var i = 0; i < object.userIDs.length; ++i)
                            message.userIDs[i] = String(object.userIDs[i]);
                    }
                    if (object.hashtags) {
                        if (!Array.isArray(object.hashtags))
                            throw TypeError(".huskysoft.gotagme.tag.GetTagCountsRequest.hashtags: array expected");
                        message.hashtags = [];
                        for (var i = 0; i < object.hashtags.length; ++i)
                            message.hashtags[i] = String(object.hashtags[i]);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetTagCountsRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @static
                 * @param {huskysoft.gotagme.tag.GetTagCountsRequest} message GetTagCountsRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetTagCountsRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.costumeIDs = [];
                        object.userIDs = [];
                        object.hashtags = [];
                    }
                    if (message.costumeIDs && message.costumeIDs.length) {
                        object.costumeIDs = [];
                        for (var j = 0; j < message.costumeIDs.length; ++j)
                            object.costumeIDs[j] = message.costumeIDs[j];
                    }
                    if (message.userIDs && message.userIDs.length) {
                        object.userIDs = [];
                        for (var j = 0; j < message.userIDs.length; ++j)
                            object.userIDs[j] = message.userIDs[j];
                    }
                    if (message.hashtags && message.hashtags.length) {
                        object.hashtags = [];
                        for (var j = 0; j < message.hashtags.length; ++j)
                            object.hashtags[j] = message.hashtags[j];
                    }
                    return object;
                };

                /**
                 * Converts this GetTagCountsRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.GetTagCountsRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetTagCountsRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetTagCountsRequest;
            })();

            tag.GetTagCountResponse = (function() {

                /**
                 * Properties of a GetTagCountResponse.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IGetTagCountResponse
                 * @property {number|null} [count] GetTagCountResponse count
                 * @property {huskysoft.gotagme.costume.ICostume|null} [costume] GetTagCountResponse costume
                 * @property {huskysoft.gotagme.user.IUser|null} [user] GetTagCountResponse user
                 * @property {string|null} [hashtag] GetTagCountResponse hashtag
                 */

                /**
                 * Constructs a new GetTagCountResponse.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a GetTagCountResponse.
                 * @implements IGetTagCountResponse
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IGetTagCountResponse=} [properties] Properties to set
                 */
                function GetTagCountResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetTagCountResponse count.
                 * @member {number} count
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @instance
                 */
                GetTagCountResponse.prototype.count = 0;

                /**
                 * GetTagCountResponse costume.
                 * @member {huskysoft.gotagme.costume.ICostume|null|undefined} costume
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @instance
                 */
                GetTagCountResponse.prototype.costume = null;

                /**
                 * GetTagCountResponse user.
                 * @member {huskysoft.gotagme.user.IUser|null|undefined} user
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @instance
                 */
                GetTagCountResponse.prototype.user = null;

                /**
                 * GetTagCountResponse hashtag.
                 * @member {string} hashtag
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @instance
                 */
                GetTagCountResponse.prototype.hashtag = "";

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * GetTagCountResponse value.
                 * @member {"costume"|"user"|"hashtag"|undefined} value
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @instance
                 */
                Object.defineProperty(GetTagCountResponse.prototype, "value", {
                    get: $util.oneOfGetter($oneOfFields = ["costume", "user", "hashtag"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new GetTagCountResponse instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagCountResponse=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.GetTagCountResponse} GetTagCountResponse instance
                 */
                GetTagCountResponse.create = function create(properties) {
                    return new GetTagCountResponse(properties);
                };

                /**
                 * Encodes the specified GetTagCountResponse message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountResponse.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagCountResponse} message GetTagCountResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagCountResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.count != null && message.hasOwnProperty("count"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.count);
                    if (message.costume != null && message.hasOwnProperty("costume"))
                        $root.huskysoft.gotagme.costume.Costume.encode(message.costume, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.user != null && message.hasOwnProperty("user"))
                        $root.huskysoft.gotagme.user.User.encode(message.user, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.hashtag != null && message.hasOwnProperty("hashtag"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.hashtag);
                    return writer;
                };

                /**
                 * Encodes the specified GetTagCountResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagCountResponse} message GetTagCountResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagCountResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetTagCountResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.GetTagCountResponse} GetTagCountResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagCountResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.GetTagCountResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.count = reader.uint32();
                            break;
                        case 2:
                            message.costume = $root.huskysoft.gotagme.costume.Costume.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.user = $root.huskysoft.gotagme.user.User.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.hashtag = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetTagCountResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.GetTagCountResponse} GetTagCountResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagCountResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetTagCountResponse message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetTagCountResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.count != null && message.hasOwnProperty("count"))
                        if (!$util.isInteger(message.count))
                            return "count: integer expected";
                    if (message.costume != null && message.hasOwnProperty("costume")) {
                        properties.value = 1;
                        {
                            var error = $root.huskysoft.gotagme.costume.Costume.verify(message.costume);
                            if (error)
                                return "costume." + error;
                        }
                    }
                    if (message.user != null && message.hasOwnProperty("user")) {
                        if (properties.value === 1)
                            return "value: multiple values";
                        properties.value = 1;
                        {
                            var error = $root.huskysoft.gotagme.user.User.verify(message.user);
                            if (error)
                                return "user." + error;
                        }
                    }
                    if (message.hashtag != null && message.hasOwnProperty("hashtag")) {
                        if (properties.value === 1)
                            return "value: multiple values";
                        properties.value = 1;
                        if (!$util.isString(message.hashtag))
                            return "hashtag: string expected";
                    }
                    return null;
                };

                /**
                 * Creates a GetTagCountResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.GetTagCountResponse} GetTagCountResponse
                 */
                GetTagCountResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.GetTagCountResponse)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.GetTagCountResponse();
                    if (object.count != null)
                        message.count = object.count >>> 0;
                    if (object.costume != null) {
                        if (typeof object.costume !== "object")
                            throw TypeError(".huskysoft.gotagme.tag.GetTagCountResponse.costume: object expected");
                        message.costume = $root.huskysoft.gotagme.costume.Costume.fromObject(object.costume);
                    }
                    if (object.user != null) {
                        if (typeof object.user !== "object")
                            throw TypeError(".huskysoft.gotagme.tag.GetTagCountResponse.user: object expected");
                        message.user = $root.huskysoft.gotagme.user.User.fromObject(object.user);
                    }
                    if (object.hashtag != null)
                        message.hashtag = String(object.hashtag);
                    return message;
                };

                /**
                 * Creates a plain object from a GetTagCountResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.GetTagCountResponse} message GetTagCountResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetTagCountResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.count = 0;
                    if (message.count != null && message.hasOwnProperty("count"))
                        object.count = message.count;
                    if (message.costume != null && message.hasOwnProperty("costume")) {
                        object.costume = $root.huskysoft.gotagme.costume.Costume.toObject(message.costume, options);
                        if (options.oneofs)
                            object.value = "costume";
                    }
                    if (message.user != null && message.hasOwnProperty("user")) {
                        object.user = $root.huskysoft.gotagme.user.User.toObject(message.user, options);
                        if (options.oneofs)
                            object.value = "user";
                    }
                    if (message.hashtag != null && message.hasOwnProperty("hashtag")) {
                        object.hashtag = message.hashtag;
                        if (options.oneofs)
                            object.value = "hashtag";
                    }
                    return object;
                };

                /**
                 * Converts this GetTagCountResponse to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.GetTagCountResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetTagCountResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetTagCountResponse;
            })();

            tag.GetTagCountsResponse = (function() {

                /**
                 * Properties of a GetTagCountsResponse.
                 * @memberof huskysoft.gotagme.tag
                 * @interface IGetTagCountsResponse
                 * @property {Array.<huskysoft.gotagme.tag.IGetTagCountResponse>|null} [responses] GetTagCountsResponse responses
                 */

                /**
                 * Constructs a new GetTagCountsResponse.
                 * @memberof huskysoft.gotagme.tag
                 * @classdesc Represents a GetTagCountsResponse.
                 * @implements IGetTagCountsResponse
                 * @constructor
                 * @param {huskysoft.gotagme.tag.IGetTagCountsResponse=} [properties] Properties to set
                 */
                function GetTagCountsResponse(properties) {
                    this.responses = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetTagCountsResponse responses.
                 * @member {Array.<huskysoft.gotagme.tag.IGetTagCountResponse>} responses
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @instance
                 */
                GetTagCountsResponse.prototype.responses = $util.emptyArray;

                /**
                 * Creates a new GetTagCountsResponse instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagCountsResponse=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.tag.GetTagCountsResponse} GetTagCountsResponse instance
                 */
                GetTagCountsResponse.create = function create(properties) {
                    return new GetTagCountsResponse(properties);
                };

                /**
                 * Encodes the specified GetTagCountsResponse message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagCountsResponse} message GetTagCountsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagCountsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.responses != null && message.responses.length)
                        for (var i = 0; i < message.responses.length; ++i)
                            $root.huskysoft.gotagme.tag.GetTagCountResponse.encode(message.responses[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetTagCountsResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.IGetTagCountsResponse} message GetTagCountsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetTagCountsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetTagCountsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.tag.GetTagCountsResponse} GetTagCountsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagCountsResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.tag.GetTagCountsResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.responses && message.responses.length))
                                message.responses = [];
                            message.responses.push($root.huskysoft.gotagme.tag.GetTagCountResponse.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetTagCountsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.tag.GetTagCountsResponse} GetTagCountsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetTagCountsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetTagCountsResponse message.
                 * @function verify
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetTagCountsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.responses != null && message.hasOwnProperty("responses")) {
                        if (!Array.isArray(message.responses))
                            return "responses: array expected";
                        for (var i = 0; i < message.responses.length; ++i) {
                            var error = $root.huskysoft.gotagme.tag.GetTagCountResponse.verify(message.responses[i]);
                            if (error)
                                return "responses." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a GetTagCountsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.tag.GetTagCountsResponse} GetTagCountsResponse
                 */
                GetTagCountsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.tag.GetTagCountsResponse)
                        return object;
                    var message = new $root.huskysoft.gotagme.tag.GetTagCountsResponse();
                    if (object.responses) {
                        if (!Array.isArray(object.responses))
                            throw TypeError(".huskysoft.gotagme.tag.GetTagCountsResponse.responses: array expected");
                        message.responses = [];
                        for (var i = 0; i < object.responses.length; ++i) {
                            if (typeof object.responses[i] !== "object")
                                throw TypeError(".huskysoft.gotagme.tag.GetTagCountsResponse.responses: object expected");
                            message.responses[i] = $root.huskysoft.gotagme.tag.GetTagCountResponse.fromObject(object.responses[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetTagCountsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @static
                 * @param {huskysoft.gotagme.tag.GetTagCountsResponse} message GetTagCountsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetTagCountsResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.responses = [];
                    if (message.responses && message.responses.length) {
                        object.responses = [];
                        for (var j = 0; j < message.responses.length; ++j)
                            object.responses[j] = $root.huskysoft.gotagme.tag.GetTagCountResponse.toObject(message.responses[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this GetTagCountsResponse to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.tag.GetTagCountsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetTagCountsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return GetTagCountsResponse;
            })();

            return tag;
        })();

        return gotagme;
    })();

    return huskysoft;
})();

module.exports = $root;
