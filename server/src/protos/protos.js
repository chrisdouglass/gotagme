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

        /**
         * ApprovalState enum.
         * @name huskysoft.gotagme.ApprovalState
         * @enum {string}
         * @property {number} NEW=0 NEW value
         * @property {number} APPROVED=1 APPROVED value
         * @property {number} REJECTED=2 REJECTED value
         */
        gotagme.ApprovalState = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NEW"] = 0;
            values[valuesById[1] = "APPROVED"] = 1;
            values[valuesById[2] = "REJECTED"] = 2;
            return values;
        })();

        gotagme.ApprovalStatus = (function() {

            /**
             * Properties of an ApprovalStatus.
             * @memberof huskysoft.gotagme
             * @interface IApprovalStatus
             * @property {huskysoft.gotagme.ApprovalState|null} [state] ApprovalStatus state
             * @property {huskysoft.gotagme.IUser|null} [setBy] ApprovalStatus setBy
             * @property {number|null} [createdAt] ApprovalStatus createdAt
             */

            /**
             * Constructs a new ApprovalStatus.
             * @memberof huskysoft.gotagme
             * @classdesc Represents an ApprovalStatus.
             * @implements IApprovalStatus
             * @constructor
             * @param {huskysoft.gotagme.IApprovalStatus=} [properties] Properties to set
             */
            function ApprovalStatus(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ApprovalStatus state.
             * @member {huskysoft.gotagme.ApprovalState} state
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @instance
             */
            ApprovalStatus.prototype.state = 0;

            /**
             * ApprovalStatus setBy.
             * @member {huskysoft.gotagme.IUser|null|undefined} setBy
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @instance
             */
            ApprovalStatus.prototype.setBy = null;

            /**
             * ApprovalStatus createdAt.
             * @member {number} createdAt
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @instance
             */
            ApprovalStatus.prototype.createdAt = 0;

            /**
             * Creates a new ApprovalStatus instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @static
             * @param {huskysoft.gotagme.IApprovalStatus=} [properties] Properties to set
             * @returns {huskysoft.gotagme.ApprovalStatus} ApprovalStatus instance
             */
            ApprovalStatus.create = function create(properties) {
                return new ApprovalStatus(properties);
            };

            /**
             * Encodes the specified ApprovalStatus message. Does not implicitly {@link huskysoft.gotagme.ApprovalStatus.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @static
             * @param {huskysoft.gotagme.IApprovalStatus} message ApprovalStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ApprovalStatus.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                if (message.setBy != null && message.hasOwnProperty("setBy"))
                    $root.huskysoft.gotagme.User.encode(message.setBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.createdAt);
                return writer;
            };

            /**
             * Encodes the specified ApprovalStatus message, length delimited. Does not implicitly {@link huskysoft.gotagme.ApprovalStatus.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @static
             * @param {huskysoft.gotagme.IApprovalStatus} message ApprovalStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ApprovalStatus.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ApprovalStatus message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.ApprovalStatus} ApprovalStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ApprovalStatus.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.ApprovalStatus();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.state = reader.int32();
                        break;
                    case 2:
                        message.setBy = $root.huskysoft.gotagme.User.decode(reader, reader.uint32());
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
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.ApprovalStatus} ApprovalStatus
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
             * @memberof huskysoft.gotagme.ApprovalStatus
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
                    var error = $root.huskysoft.gotagme.User.verify(message.setBy);
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
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.ApprovalStatus} ApprovalStatus
             */
            ApprovalStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.ApprovalStatus)
                    return object;
                var message = new $root.huskysoft.gotagme.ApprovalStatus();
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
                        throw TypeError(".huskysoft.gotagme.ApprovalStatus.setBy: object expected");
                    message.setBy = $root.huskysoft.gotagme.User.fromObject(object.setBy);
                }
                if (object.createdAt != null)
                    message.createdAt = object.createdAt | 0;
                return message;
            };

            /**
             * Creates a plain object from an ApprovalStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @static
             * @param {huskysoft.gotagme.ApprovalStatus} message ApprovalStatus
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
                    object.state = options.enums === String ? $root.huskysoft.gotagme.ApprovalState[message.state] : message.state;
                if (message.setBy != null && message.hasOwnProperty("setBy"))
                    object.setBy = $root.huskysoft.gotagme.User.toObject(message.setBy, options);
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    object.createdAt = message.createdAt;
                return object;
            };

            /**
             * Converts this ApprovalStatus to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.ApprovalStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ApprovalStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ApprovalStatus;
        })();

        gotagme.Costume = (function() {

            /**
             * Properties of a Costume.
             * @memberof huskysoft.gotagme
             * @interface ICostume
             * @property {string|null} [id] Costume id
             * @property {string|null} [name] Costume name
             * @property {huskysoft.gotagme.IUser|null} [owner] Costume owner
             */

            /**
             * Constructs a new Costume.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a Costume.
             * @implements ICostume
             * @constructor
             * @param {huskysoft.gotagme.ICostume=} [properties] Properties to set
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
             * @memberof huskysoft.gotagme.Costume
             * @instance
             */
            Costume.prototype.id = "";

            /**
             * Costume name.
             * @member {string} name
             * @memberof huskysoft.gotagme.Costume
             * @instance
             */
            Costume.prototype.name = "";

            /**
             * Costume owner.
             * @member {huskysoft.gotagme.IUser|null|undefined} owner
             * @memberof huskysoft.gotagme.Costume
             * @instance
             */
            Costume.prototype.owner = null;

            /**
             * Creates a new Costume instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.Costume
             * @static
             * @param {huskysoft.gotagme.ICostume=} [properties] Properties to set
             * @returns {huskysoft.gotagme.Costume} Costume instance
             */
            Costume.create = function create(properties) {
                return new Costume(properties);
            };

            /**
             * Encodes the specified Costume message. Does not implicitly {@link huskysoft.gotagme.Costume.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.Costume
             * @static
             * @param {huskysoft.gotagme.ICostume} message Costume message or plain object to encode
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
                    $root.huskysoft.gotagme.User.encode(message.owner, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Costume message, length delimited. Does not implicitly {@link huskysoft.gotagme.Costume.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.Costume
             * @static
             * @param {huskysoft.gotagme.ICostume} message Costume message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Costume.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Costume message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.Costume
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.Costume} Costume
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Costume.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.Costume();
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
                        message.owner = $root.huskysoft.gotagme.User.decode(reader, reader.uint32());
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
             * @memberof huskysoft.gotagme.Costume
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.Costume} Costume
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
             * @memberof huskysoft.gotagme.Costume
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
                    var error = $root.huskysoft.gotagme.User.verify(message.owner);
                    if (error)
                        return "owner." + error;
                }
                return null;
            };

            /**
             * Creates a Costume message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.Costume
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.Costume} Costume
             */
            Costume.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.Costume)
                    return object;
                var message = new $root.huskysoft.gotagme.Costume();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.owner != null) {
                    if (typeof object.owner !== "object")
                        throw TypeError(".huskysoft.gotagme.Costume.owner: object expected");
                    message.owner = $root.huskysoft.gotagme.User.fromObject(object.owner);
                }
                return message;
            };

            /**
             * Creates a plain object from a Costume message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.Costume
             * @static
             * @param {huskysoft.gotagme.Costume} message Costume
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
                    object.owner = $root.huskysoft.gotagme.User.toObject(message.owner, options);
                return object;
            };

            /**
             * Converts this Costume to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.Costume
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Costume.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Costume;
        })();

        gotagme.EditCostumeRequest = (function() {

            /**
             * Properties of an EditCostumeRequest.
             * @memberof huskysoft.gotagme
             * @interface IEditCostumeRequest
             * @property {string|null} [name] EditCostumeRequest name
             * @property {string|null} [ownerID] EditCostumeRequest ownerID
             */

            /**
             * Constructs a new EditCostumeRequest.
             * @memberof huskysoft.gotagme
             * @classdesc Represents an EditCostumeRequest.
             * @implements IEditCostumeRequest
             * @constructor
             * @param {huskysoft.gotagme.IEditCostumeRequest=} [properties] Properties to set
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
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @instance
             */
            EditCostumeRequest.prototype.name = "";

            /**
             * EditCostumeRequest ownerID.
             * @member {string} ownerID
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @instance
             */
            EditCostumeRequest.prototype.ownerID = "";

            /**
             * Creates a new EditCostumeRequest instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @static
             * @param {huskysoft.gotagme.IEditCostumeRequest=} [properties] Properties to set
             * @returns {huskysoft.gotagme.EditCostumeRequest} EditCostumeRequest instance
             */
            EditCostumeRequest.create = function create(properties) {
                return new EditCostumeRequest(properties);
            };

            /**
             * Encodes the specified EditCostumeRequest message. Does not implicitly {@link huskysoft.gotagme.EditCostumeRequest.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @static
             * @param {huskysoft.gotagme.IEditCostumeRequest} message EditCostumeRequest message or plain object to encode
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
             * Encodes the specified EditCostumeRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.EditCostumeRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @static
             * @param {huskysoft.gotagme.IEditCostumeRequest} message EditCostumeRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EditCostumeRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an EditCostumeRequest message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.EditCostumeRequest} EditCostumeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EditCostumeRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.EditCostumeRequest();
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
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.EditCostumeRequest} EditCostumeRequest
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
             * @memberof huskysoft.gotagme.EditCostumeRequest
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
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.EditCostumeRequest} EditCostumeRequest
             */
            EditCostumeRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.EditCostumeRequest)
                    return object;
                var message = new $root.huskysoft.gotagme.EditCostumeRequest();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.ownerID != null)
                    message.ownerID = String(object.ownerID);
                return message;
            };

            /**
             * Creates a plain object from an EditCostumeRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @static
             * @param {huskysoft.gotagme.EditCostumeRequest} message EditCostumeRequest
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
             * @memberof huskysoft.gotagme.EditCostumeRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EditCostumeRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return EditCostumeRequest;
        })();

        gotagme.Photo = (function() {

            /**
             * Properties of a Photo.
             * @memberof huskysoft.gotagme
             * @interface IPhoto
             * @property {string|null} [id] Photo id
             * @property {huskysoft.gotagme.IUser|null} [postedBy] Photo postedBy
             * @property {huskysoft.gotagme.IUser|null} [capturedBy] Photo capturedBy
             * @property {number|null} [capturedAt] Photo capturedAt
             * @property {huskysoft.gotagme.ApprovalState|null} [state] Photo state
             * @property {string|null} [externalUrl] Photo externalUrl
             * @property {string|null} [smallImageUrl] Photo smallImageUrl
             * @property {string|null} [largeImageUrl] Photo largeImageUrl
             * @property {string|null} [xlargeImageUrl] Photo xlargeImageUrl
             * @property {string|null} [title] Photo title
             * @property {string|null} [description] Photo description
             */

            /**
             * Constructs a new Photo.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a Photo.
             * @implements IPhoto
             * @constructor
             * @param {huskysoft.gotagme.IPhoto=} [properties] Properties to set
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
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.id = "";

            /**
             * Photo postedBy.
             * @member {huskysoft.gotagme.IUser|null|undefined} postedBy
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.postedBy = null;

            /**
             * Photo capturedBy.
             * @member {huskysoft.gotagme.IUser|null|undefined} capturedBy
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.capturedBy = null;

            /**
             * Photo capturedAt.
             * @member {number} capturedAt
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.capturedAt = 0;

            /**
             * Photo state.
             * @member {huskysoft.gotagme.ApprovalState} state
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.state = 0;

            /**
             * Photo externalUrl.
             * @member {string} externalUrl
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.externalUrl = "";

            /**
             * Photo smallImageUrl.
             * @member {string} smallImageUrl
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.smallImageUrl = "";

            /**
             * Photo largeImageUrl.
             * @member {string} largeImageUrl
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.largeImageUrl = "";

            /**
             * Photo xlargeImageUrl.
             * @member {string} xlargeImageUrl
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.xlargeImageUrl = "";

            /**
             * Photo title.
             * @member {string} title
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.title = "";

            /**
             * Photo description.
             * @member {string} description
             * @memberof huskysoft.gotagme.Photo
             * @instance
             */
            Photo.prototype.description = "";

            /**
             * Creates a new Photo instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.Photo
             * @static
             * @param {huskysoft.gotagme.IPhoto=} [properties] Properties to set
             * @returns {huskysoft.gotagme.Photo} Photo instance
             */
            Photo.create = function create(properties) {
                return new Photo(properties);
            };

            /**
             * Encodes the specified Photo message. Does not implicitly {@link huskysoft.gotagme.Photo.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.Photo
             * @static
             * @param {huskysoft.gotagme.IPhoto} message Photo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Photo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.postedBy != null && message.hasOwnProperty("postedBy"))
                    $root.huskysoft.gotagme.User.encode(message.postedBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                    $root.huskysoft.gotagme.User.encode(message.capturedBy, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
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
             * Encodes the specified Photo message, length delimited. Does not implicitly {@link huskysoft.gotagme.Photo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.Photo
             * @static
             * @param {huskysoft.gotagme.IPhoto} message Photo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Photo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Photo message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.Photo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.Photo} Photo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Photo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.Photo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.postedBy = $root.huskysoft.gotagme.User.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.capturedBy = $root.huskysoft.gotagme.User.decode(reader, reader.uint32());
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
             * @memberof huskysoft.gotagme.Photo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.Photo} Photo
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
             * @memberof huskysoft.gotagme.Photo
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
                    var error = $root.huskysoft.gotagme.User.verify(message.postedBy);
                    if (error)
                        return "postedBy." + error;
                }
                if (message.capturedBy != null && message.hasOwnProperty("capturedBy")) {
                    var error = $root.huskysoft.gotagme.User.verify(message.capturedBy);
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
             * @memberof huskysoft.gotagme.Photo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.Photo} Photo
             */
            Photo.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.Photo)
                    return object;
                var message = new $root.huskysoft.gotagme.Photo();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.postedBy != null) {
                    if (typeof object.postedBy !== "object")
                        throw TypeError(".huskysoft.gotagme.Photo.postedBy: object expected");
                    message.postedBy = $root.huskysoft.gotagme.User.fromObject(object.postedBy);
                }
                if (object.capturedBy != null) {
                    if (typeof object.capturedBy !== "object")
                        throw TypeError(".huskysoft.gotagme.Photo.capturedBy: object expected");
                    message.capturedBy = $root.huskysoft.gotagme.User.fromObject(object.capturedBy);
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
             * @memberof huskysoft.gotagme.Photo
             * @static
             * @param {huskysoft.gotagme.Photo} message Photo
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
                    object.postedBy = $root.huskysoft.gotagme.User.toObject(message.postedBy, options);
                if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                    object.capturedBy = $root.huskysoft.gotagme.User.toObject(message.capturedBy, options);
                if (message.capturedAt != null && message.hasOwnProperty("capturedAt"))
                    object.capturedAt = message.capturedAt;
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.huskysoft.gotagme.ApprovalState[message.state] : message.state;
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
             * @memberof huskysoft.gotagme.Photo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Photo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Photo;
        })();

        gotagme.GetPhotoRequest = (function() {

            /**
             * Properties of a GetPhotoRequest.
             * @memberof huskysoft.gotagme
             * @interface IGetPhotoRequest
             * @property {string|null} [id] GetPhotoRequest id
             * @property {number|null} [page] GetPhotoRequest page
             */

            /**
             * Constructs a new GetPhotoRequest.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a GetPhotoRequest.
             * @implements IGetPhotoRequest
             * @constructor
             * @param {huskysoft.gotagme.IGetPhotoRequest=} [properties] Properties to set
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
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @instance
             */
            GetPhotoRequest.prototype.id = "";

            /**
             * GetPhotoRequest page.
             * @member {number} page
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @instance
             */
            GetPhotoRequest.prototype.page = 0;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * GetPhotoRequest key.
             * @member {"id"|"page"|undefined} key
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @instance
             */
            Object.defineProperty(GetPhotoRequest.prototype, "key", {
                get: $util.oneOfGetter($oneOfFields = ["id", "page"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new GetPhotoRequest instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @static
             * @param {huskysoft.gotagme.IGetPhotoRequest=} [properties] Properties to set
             * @returns {huskysoft.gotagme.GetPhotoRequest} GetPhotoRequest instance
             */
            GetPhotoRequest.create = function create(properties) {
                return new GetPhotoRequest(properties);
            };

            /**
             * Encodes the specified GetPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.GetPhotoRequest.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @static
             * @param {huskysoft.gotagme.IGetPhotoRequest} message GetPhotoRequest message or plain object to encode
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
             * Encodes the specified GetPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.GetPhotoRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @static
             * @param {huskysoft.gotagme.IGetPhotoRequest} message GetPhotoRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetPhotoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetPhotoRequest message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.GetPhotoRequest} GetPhotoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetPhotoRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.GetPhotoRequest();
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
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.GetPhotoRequest} GetPhotoRequest
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
             * @memberof huskysoft.gotagme.GetPhotoRequest
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
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.GetPhotoRequest} GetPhotoRequest
             */
            GetPhotoRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.GetPhotoRequest)
                    return object;
                var message = new $root.huskysoft.gotagme.GetPhotoRequest();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.page != null)
                    message.page = object.page | 0;
                return message;
            };

            /**
             * Creates a plain object from a GetPhotoRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @static
             * @param {huskysoft.gotagme.GetPhotoRequest} message GetPhotoRequest
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
             * @memberof huskysoft.gotagme.GetPhotoRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetPhotoRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetPhotoRequest;
        })();

        gotagme.GetPhotoResponse = (function() {

            /**
             * Properties of a GetPhotoResponse.
             * @memberof huskysoft.gotagme
             * @interface IGetPhotoResponse
             * @property {Array.<huskysoft.gotagme.IPhoto>|null} [photos] GetPhotoResponse photos
             */

            /**
             * Constructs a new GetPhotoResponse.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a GetPhotoResponse.
             * @implements IGetPhotoResponse
             * @constructor
             * @param {huskysoft.gotagme.IGetPhotoResponse=} [properties] Properties to set
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
             * @member {Array.<huskysoft.gotagme.IPhoto>} photos
             * @memberof huskysoft.gotagme.GetPhotoResponse
             * @instance
             */
            GetPhotoResponse.prototype.photos = $util.emptyArray;

            /**
             * Creates a new GetPhotoResponse instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.GetPhotoResponse
             * @static
             * @param {huskysoft.gotagme.IGetPhotoResponse=} [properties] Properties to set
             * @returns {huskysoft.gotagme.GetPhotoResponse} GetPhotoResponse instance
             */
            GetPhotoResponse.create = function create(properties) {
                return new GetPhotoResponse(properties);
            };

            /**
             * Encodes the specified GetPhotoResponse message. Does not implicitly {@link huskysoft.gotagme.GetPhotoResponse.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.GetPhotoResponse
             * @static
             * @param {huskysoft.gotagme.IGetPhotoResponse} message GetPhotoResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetPhotoResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.photos != null && message.photos.length)
                    for (var i = 0; i < message.photos.length; ++i)
                        $root.huskysoft.gotagme.Photo.encode(message.photos[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GetPhotoResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.GetPhotoResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.GetPhotoResponse
             * @static
             * @param {huskysoft.gotagme.IGetPhotoResponse} message GetPhotoResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetPhotoResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetPhotoResponse message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.GetPhotoResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.GetPhotoResponse} GetPhotoResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetPhotoResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.GetPhotoResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.photos && message.photos.length))
                            message.photos = [];
                        message.photos.push($root.huskysoft.gotagme.Photo.decode(reader, reader.uint32()));
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
             * @memberof huskysoft.gotagme.GetPhotoResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.GetPhotoResponse} GetPhotoResponse
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
             * @memberof huskysoft.gotagme.GetPhotoResponse
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
                        var error = $root.huskysoft.gotagme.Photo.verify(message.photos[i]);
                        if (error)
                            return "photos." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GetPhotoResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.GetPhotoResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.GetPhotoResponse} GetPhotoResponse
             */
            GetPhotoResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.GetPhotoResponse)
                    return object;
                var message = new $root.huskysoft.gotagme.GetPhotoResponse();
                if (object.photos) {
                    if (!Array.isArray(object.photos))
                        throw TypeError(".huskysoft.gotagme.GetPhotoResponse.photos: array expected");
                    message.photos = [];
                    for (var i = 0; i < object.photos.length; ++i) {
                        if (typeof object.photos[i] !== "object")
                            throw TypeError(".huskysoft.gotagme.GetPhotoResponse.photos: object expected");
                        message.photos[i] = $root.huskysoft.gotagme.Photo.fromObject(object.photos[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetPhotoResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.GetPhotoResponse
             * @static
             * @param {huskysoft.gotagme.GetPhotoResponse} message GetPhotoResponse
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
                        object.photos[j] = $root.huskysoft.gotagme.Photo.toObject(message.photos[j], options);
                }
                return object;
            };

            /**
             * Converts this GetPhotoResponse to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.GetPhotoResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetPhotoResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetPhotoResponse;
        })();

        gotagme.InsertPhotoRequest = (function() {

            /**
             * Properties of an InsertPhotoRequest.
             * @memberof huskysoft.gotagme
             * @interface IInsertPhotoRequest
             * @property {string|null} [flickrUrl] InsertPhotoRequest flickrUrl
             * @property {string|null} [flickrAlbumUrl] InsertPhotoRequest flickrAlbumUrl
             */

            /**
             * Constructs a new InsertPhotoRequest.
             * @memberof huskysoft.gotagme
             * @classdesc Represents an InsertPhotoRequest.
             * @implements IInsertPhotoRequest
             * @constructor
             * @param {huskysoft.gotagme.IInsertPhotoRequest=} [properties] Properties to set
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
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @instance
             */
            InsertPhotoRequest.prototype.flickrUrl = "";

            /**
             * InsertPhotoRequest flickrAlbumUrl.
             * @member {string} flickrAlbumUrl
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @instance
             */
            InsertPhotoRequest.prototype.flickrAlbumUrl = "";

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * InsertPhotoRequest url.
             * @member {"flickrUrl"|"flickrAlbumUrl"|undefined} url
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @instance
             */
            Object.defineProperty(InsertPhotoRequest.prototype, "url", {
                get: $util.oneOfGetter($oneOfFields = ["flickrUrl", "flickrAlbumUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new InsertPhotoRequest instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @static
             * @param {huskysoft.gotagme.IInsertPhotoRequest=} [properties] Properties to set
             * @returns {huskysoft.gotagme.InsertPhotoRequest} InsertPhotoRequest instance
             */
            InsertPhotoRequest.create = function create(properties) {
                return new InsertPhotoRequest(properties);
            };

            /**
             * Encodes the specified InsertPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.InsertPhotoRequest.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @static
             * @param {huskysoft.gotagme.IInsertPhotoRequest} message InsertPhotoRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InsertPhotoRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.flickrUrl != null && message.hasOwnProperty("flickrUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.flickrUrl);
                if (message.flickrAlbumUrl != null && message.hasOwnProperty("flickrAlbumUrl"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.flickrAlbumUrl);
                return writer;
            };

            /**
             * Encodes the specified InsertPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.InsertPhotoRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @static
             * @param {huskysoft.gotagme.IInsertPhotoRequest} message InsertPhotoRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InsertPhotoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an InsertPhotoRequest message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.InsertPhotoRequest} InsertPhotoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            InsertPhotoRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.InsertPhotoRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.flickrUrl = reader.string();
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
             * Decodes an InsertPhotoRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.InsertPhotoRequest} InsertPhotoRequest
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
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            InsertPhotoRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.flickrUrl != null && message.hasOwnProperty("flickrUrl")) {
                    properties.url = 1;
                    if (!$util.isString(message.flickrUrl))
                        return "flickrUrl: string expected";
                }
                if (message.flickrAlbumUrl != null && message.hasOwnProperty("flickrAlbumUrl")) {
                    if (properties.url === 1)
                        return "url: multiple values";
                    properties.url = 1;
                    if (!$util.isString(message.flickrAlbumUrl))
                        return "flickrAlbumUrl: string expected";
                }
                return null;
            };

            /**
             * Creates an InsertPhotoRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.InsertPhotoRequest} InsertPhotoRequest
             */
            InsertPhotoRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.InsertPhotoRequest)
                    return object;
                var message = new $root.huskysoft.gotagme.InsertPhotoRequest();
                if (object.flickrUrl != null)
                    message.flickrUrl = String(object.flickrUrl);
                if (object.flickrAlbumUrl != null)
                    message.flickrAlbumUrl = String(object.flickrAlbumUrl);
                return message;
            };

            /**
             * Creates a plain object from an InsertPhotoRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @static
             * @param {huskysoft.gotagme.InsertPhotoRequest} message InsertPhotoRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            InsertPhotoRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.flickrUrl != null && message.hasOwnProperty("flickrUrl")) {
                    object.flickrUrl = message.flickrUrl;
                    if (options.oneofs)
                        object.url = "flickrUrl";
                }
                if (message.flickrAlbumUrl != null && message.hasOwnProperty("flickrAlbumUrl")) {
                    object.flickrAlbumUrl = message.flickrAlbumUrl;
                    if (options.oneofs)
                        object.url = "flickrAlbumUrl";
                }
                return object;
            };

            /**
             * Converts this InsertPhotoRequest to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.InsertPhotoRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            InsertPhotoRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return InsertPhotoRequest;
        })();

        gotagme.InsertPhotosRequest = (function() {

            /**
             * Properties of an InsertPhotosRequest.
             * @memberof huskysoft.gotagme
             * @interface IInsertPhotosRequest
             * @property {Array.<huskysoft.gotagme.IInsertPhotoRequest>|null} [requests] InsertPhotosRequest requests
             */

            /**
             * Constructs a new InsertPhotosRequest.
             * @memberof huskysoft.gotagme
             * @classdesc Represents an InsertPhotosRequest.
             * @implements IInsertPhotosRequest
             * @constructor
             * @param {huskysoft.gotagme.IInsertPhotosRequest=} [properties] Properties to set
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
             * @member {Array.<huskysoft.gotagme.IInsertPhotoRequest>} requests
             * @memberof huskysoft.gotagme.InsertPhotosRequest
             * @instance
             */
            InsertPhotosRequest.prototype.requests = $util.emptyArray;

            /**
             * Creates a new InsertPhotosRequest instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.InsertPhotosRequest
             * @static
             * @param {huskysoft.gotagme.IInsertPhotosRequest=} [properties] Properties to set
             * @returns {huskysoft.gotagme.InsertPhotosRequest} InsertPhotosRequest instance
             */
            InsertPhotosRequest.create = function create(properties) {
                return new InsertPhotosRequest(properties);
            };

            /**
             * Encodes the specified InsertPhotosRequest message. Does not implicitly {@link huskysoft.gotagme.InsertPhotosRequest.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.InsertPhotosRequest
             * @static
             * @param {huskysoft.gotagme.IInsertPhotosRequest} message InsertPhotosRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InsertPhotosRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.requests != null && message.requests.length)
                    for (var i = 0; i < message.requests.length; ++i)
                        $root.huskysoft.gotagme.InsertPhotoRequest.encode(message.requests[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified InsertPhotosRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.InsertPhotosRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.InsertPhotosRequest
             * @static
             * @param {huskysoft.gotagme.IInsertPhotosRequest} message InsertPhotosRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InsertPhotosRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an InsertPhotosRequest message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.InsertPhotosRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.InsertPhotosRequest} InsertPhotosRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            InsertPhotosRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.InsertPhotosRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.requests && message.requests.length))
                            message.requests = [];
                        message.requests.push($root.huskysoft.gotagme.InsertPhotoRequest.decode(reader, reader.uint32()));
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
             * @memberof huskysoft.gotagme.InsertPhotosRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.InsertPhotosRequest} InsertPhotosRequest
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
             * @memberof huskysoft.gotagme.InsertPhotosRequest
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
                        var error = $root.huskysoft.gotagme.InsertPhotoRequest.verify(message.requests[i]);
                        if (error)
                            return "requests." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an InsertPhotosRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.InsertPhotosRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.InsertPhotosRequest} InsertPhotosRequest
             */
            InsertPhotosRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.InsertPhotosRequest)
                    return object;
                var message = new $root.huskysoft.gotagme.InsertPhotosRequest();
                if (object.requests) {
                    if (!Array.isArray(object.requests))
                        throw TypeError(".huskysoft.gotagme.InsertPhotosRequest.requests: array expected");
                    message.requests = [];
                    for (var i = 0; i < object.requests.length; ++i) {
                        if (typeof object.requests[i] !== "object")
                            throw TypeError(".huskysoft.gotagme.InsertPhotosRequest.requests: object expected");
                        message.requests[i] = $root.huskysoft.gotagme.InsertPhotoRequest.fromObject(object.requests[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an InsertPhotosRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.InsertPhotosRequest
             * @static
             * @param {huskysoft.gotagme.InsertPhotosRequest} message InsertPhotosRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            InsertPhotosRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.requests = [];
                if (message.requests && message.requests.length) {
                    object.requests = [];
                    for (var j = 0; j < message.requests.length; ++j)
                        object.requests[j] = $root.huskysoft.gotagme.InsertPhotoRequest.toObject(message.requests[j], options);
                }
                return object;
            };

            /**
             * Converts this InsertPhotosRequest to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.InsertPhotosRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            InsertPhotosRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return InsertPhotosRequest;
        })();

        gotagme.InsertPhotosResponse = (function() {

            /**
             * Properties of an InsertPhotosResponse.
             * @memberof huskysoft.gotagme
             * @interface IInsertPhotosResponse
             * @property {huskysoft.gotagme.IPhoto|null} [photo] InsertPhotosResponse photo
             */

            /**
             * Constructs a new InsertPhotosResponse.
             * @memberof huskysoft.gotagme
             * @classdesc Represents an InsertPhotosResponse.
             * @implements IInsertPhotosResponse
             * @constructor
             * @param {huskysoft.gotagme.IInsertPhotosResponse=} [properties] Properties to set
             */
            function InsertPhotosResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * InsertPhotosResponse photo.
             * @member {huskysoft.gotagme.IPhoto|null|undefined} photo
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @instance
             */
            InsertPhotosResponse.prototype.photo = null;

            /**
             * Creates a new InsertPhotosResponse instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @static
             * @param {huskysoft.gotagme.IInsertPhotosResponse=} [properties] Properties to set
             * @returns {huskysoft.gotagme.InsertPhotosResponse} InsertPhotosResponse instance
             */
            InsertPhotosResponse.create = function create(properties) {
                return new InsertPhotosResponse(properties);
            };

            /**
             * Encodes the specified InsertPhotosResponse message. Does not implicitly {@link huskysoft.gotagme.InsertPhotosResponse.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @static
             * @param {huskysoft.gotagme.IInsertPhotosResponse} message InsertPhotosResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InsertPhotosResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.photo != null && message.hasOwnProperty("photo"))
                    $root.huskysoft.gotagme.Photo.encode(message.photo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified InsertPhotosResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.InsertPhotosResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @static
             * @param {huskysoft.gotagme.IInsertPhotosResponse} message InsertPhotosResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InsertPhotosResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an InsertPhotosResponse message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.InsertPhotosResponse} InsertPhotosResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            InsertPhotosResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.InsertPhotosResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.photo = $root.huskysoft.gotagme.Photo.decode(reader, reader.uint32());
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
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.InsertPhotosResponse} InsertPhotosResponse
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
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            InsertPhotosResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.photo != null && message.hasOwnProperty("photo")) {
                    var error = $root.huskysoft.gotagme.Photo.verify(message.photo);
                    if (error)
                        return "photo." + error;
                }
                return null;
            };

            /**
             * Creates an InsertPhotosResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.InsertPhotosResponse} InsertPhotosResponse
             */
            InsertPhotosResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.InsertPhotosResponse)
                    return object;
                var message = new $root.huskysoft.gotagme.InsertPhotosResponse();
                if (object.photo != null) {
                    if (typeof object.photo !== "object")
                        throw TypeError(".huskysoft.gotagme.InsertPhotosResponse.photo: object expected");
                    message.photo = $root.huskysoft.gotagme.Photo.fromObject(object.photo);
                }
                return message;
            };

            /**
             * Creates a plain object from an InsertPhotosResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @static
             * @param {huskysoft.gotagme.InsertPhotosResponse} message InsertPhotosResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            InsertPhotosResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.photo = null;
                if (message.photo != null && message.hasOwnProperty("photo"))
                    object.photo = $root.huskysoft.gotagme.Photo.toObject(message.photo, options);
                return object;
            };

            /**
             * Converts this InsertPhotosResponse to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.InsertPhotosResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            InsertPhotosResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return InsertPhotosResponse;
        })();

        gotagme.User = (function() {

            /**
             * Properties of a User.
             * @memberof huskysoft.gotagme
             * @interface IUser
             * @property {string|null} [id] User id
             * @property {string|null} [displayName] User displayName
             */

            /**
             * Constructs a new User.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a User.
             * @implements IUser
             * @constructor
             * @param {huskysoft.gotagme.IUser=} [properties] Properties to set
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
             * @memberof huskysoft.gotagme.User
             * @instance
             */
            User.prototype.id = "";

            /**
             * User displayName.
             * @member {string} displayName
             * @memberof huskysoft.gotagme.User
             * @instance
             */
            User.prototype.displayName = "";

            /**
             * Creates a new User instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.User
             * @static
             * @param {huskysoft.gotagme.IUser=} [properties] Properties to set
             * @returns {huskysoft.gotagme.User} User instance
             */
            User.create = function create(properties) {
                return new User(properties);
            };

            /**
             * Encodes the specified User message. Does not implicitly {@link huskysoft.gotagme.User.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.User
             * @static
             * @param {huskysoft.gotagme.IUser} message User message or plain object to encode
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
             * Encodes the specified User message, length delimited. Does not implicitly {@link huskysoft.gotagme.User.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.User
             * @static
             * @param {huskysoft.gotagme.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a User message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.User();
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
             * @memberof huskysoft.gotagme.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.User} User
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
             * @memberof huskysoft.gotagme.User
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
             * @memberof huskysoft.gotagme.User
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.User} User
             */
            User.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.User)
                    return object;
                var message = new $root.huskysoft.gotagme.User();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.displayName != null)
                    message.displayName = String(object.displayName);
                return message;
            };

            /**
             * Creates a plain object from a User message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.User
             * @static
             * @param {huskysoft.gotagme.User} message User
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
             * @memberof huskysoft.gotagme.User
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            User.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return User;
        })();

        gotagme.TagAutocompleteRequest = (function() {

            /**
             * Properties of a TagAutocompleteRequest.
             * @memberof huskysoft.gotagme
             * @interface ITagAutocompleteRequest
             * @property {string|null} [term] TagAutocompleteRequest term
             */

            /**
             * Constructs a new TagAutocompleteRequest.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a TagAutocompleteRequest.
             * @implements ITagAutocompleteRequest
             * @constructor
             * @param {huskysoft.gotagme.ITagAutocompleteRequest=} [properties] Properties to set
             */
            function TagAutocompleteRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TagAutocompleteRequest term.
             * @member {string} term
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @instance
             */
            TagAutocompleteRequest.prototype.term = "";

            /**
             * Creates a new TagAutocompleteRequest instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @static
             * @param {huskysoft.gotagme.ITagAutocompleteRequest=} [properties] Properties to set
             * @returns {huskysoft.gotagme.TagAutocompleteRequest} TagAutocompleteRequest instance
             */
            TagAutocompleteRequest.create = function create(properties) {
                return new TagAutocompleteRequest(properties);
            };

            /**
             * Encodes the specified TagAutocompleteRequest message. Does not implicitly {@link huskysoft.gotagme.TagAutocompleteRequest.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @static
             * @param {huskysoft.gotagme.ITagAutocompleteRequest} message TagAutocompleteRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TagAutocompleteRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.term != null && message.hasOwnProperty("term"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.term);
                return writer;
            };

            /**
             * Encodes the specified TagAutocompleteRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.TagAutocompleteRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @static
             * @param {huskysoft.gotagme.ITagAutocompleteRequest} message TagAutocompleteRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TagAutocompleteRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TagAutocompleteRequest message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.TagAutocompleteRequest} TagAutocompleteRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TagAutocompleteRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.TagAutocompleteRequest();
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
             * Decodes a TagAutocompleteRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.TagAutocompleteRequest} TagAutocompleteRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TagAutocompleteRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TagAutocompleteRequest message.
             * @function verify
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TagAutocompleteRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.term != null && message.hasOwnProperty("term"))
                    if (!$util.isString(message.term))
                        return "term: string expected";
                return null;
            };

            /**
             * Creates a TagAutocompleteRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.TagAutocompleteRequest} TagAutocompleteRequest
             */
            TagAutocompleteRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.TagAutocompleteRequest)
                    return object;
                var message = new $root.huskysoft.gotagme.TagAutocompleteRequest();
                if (object.term != null)
                    message.term = String(object.term);
                return message;
            };

            /**
             * Creates a plain object from a TagAutocompleteRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @static
             * @param {huskysoft.gotagme.TagAutocompleteRequest} message TagAutocompleteRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TagAutocompleteRequest.toObject = function toObject(message, options) {
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
             * Converts this TagAutocompleteRequest to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.TagAutocompleteRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TagAutocompleteRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TagAutocompleteRequest;
        })();

        gotagme.TagAutocompleteResponse = (function() {

            /**
             * Properties of a TagAutocompleteResponse.
             * @memberof huskysoft.gotagme
             * @interface ITagAutocompleteResponse
             * @property {Array.<huskysoft.gotagme.ITag>|null} [tags] TagAutocompleteResponse tags
             */

            /**
             * Constructs a new TagAutocompleteResponse.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a TagAutocompleteResponse.
             * @implements ITagAutocompleteResponse
             * @constructor
             * @param {huskysoft.gotagme.ITagAutocompleteResponse=} [properties] Properties to set
             */
            function TagAutocompleteResponse(properties) {
                this.tags = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TagAutocompleteResponse tags.
             * @member {Array.<huskysoft.gotagme.ITag>} tags
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @instance
             */
            TagAutocompleteResponse.prototype.tags = $util.emptyArray;

            /**
             * Creates a new TagAutocompleteResponse instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @static
             * @param {huskysoft.gotagme.ITagAutocompleteResponse=} [properties] Properties to set
             * @returns {huskysoft.gotagme.TagAutocompleteResponse} TagAutocompleteResponse instance
             */
            TagAutocompleteResponse.create = function create(properties) {
                return new TagAutocompleteResponse(properties);
            };

            /**
             * Encodes the specified TagAutocompleteResponse message. Does not implicitly {@link huskysoft.gotagme.TagAutocompleteResponse.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @static
             * @param {huskysoft.gotagme.ITagAutocompleteResponse} message TagAutocompleteResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TagAutocompleteResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tags != null && message.tags.length)
                    for (var i = 0; i < message.tags.length; ++i)
                        $root.huskysoft.gotagme.Tag.encode(message.tags[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TagAutocompleteResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.TagAutocompleteResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @static
             * @param {huskysoft.gotagme.ITagAutocompleteResponse} message TagAutocompleteResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TagAutocompleteResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TagAutocompleteResponse message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.TagAutocompleteResponse} TagAutocompleteResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TagAutocompleteResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.TagAutocompleteResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.tags && message.tags.length))
                            message.tags = [];
                        message.tags.push($root.huskysoft.gotagme.Tag.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TagAutocompleteResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.TagAutocompleteResponse} TagAutocompleteResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TagAutocompleteResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TagAutocompleteResponse message.
             * @function verify
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TagAutocompleteResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.tags != null && message.hasOwnProperty("tags")) {
                    if (!Array.isArray(message.tags))
                        return "tags: array expected";
                    for (var i = 0; i < message.tags.length; ++i) {
                        var error = $root.huskysoft.gotagme.Tag.verify(message.tags[i]);
                        if (error)
                            return "tags." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a TagAutocompleteResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.TagAutocompleteResponse} TagAutocompleteResponse
             */
            TagAutocompleteResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.TagAutocompleteResponse)
                    return object;
                var message = new $root.huskysoft.gotagme.TagAutocompleteResponse();
                if (object.tags) {
                    if (!Array.isArray(object.tags))
                        throw TypeError(".huskysoft.gotagme.TagAutocompleteResponse.tags: array expected");
                    message.tags = [];
                    for (var i = 0; i < object.tags.length; ++i) {
                        if (typeof object.tags[i] !== "object")
                            throw TypeError(".huskysoft.gotagme.TagAutocompleteResponse.tags: object expected");
                        message.tags[i] = $root.huskysoft.gotagme.Tag.fromObject(object.tags[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a TagAutocompleteResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @static
             * @param {huskysoft.gotagme.TagAutocompleteResponse} message TagAutocompleteResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TagAutocompleteResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.tags = [];
                if (message.tags && message.tags.length) {
                    object.tags = [];
                    for (var j = 0; j < message.tags.length; ++j)
                        object.tags[j] = $root.huskysoft.gotagme.Tag.toObject(message.tags[j], options);
                }
                return object;
            };

            /**
             * Converts this TagAutocompleteResponse to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.TagAutocompleteResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TagAutocompleteResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TagAutocompleteResponse;
        })();

        gotagme.Tag = (function() {

            /**
             * Properties of a Tag.
             * @memberof huskysoft.gotagme
             * @interface ITag
             * @property {string|null} [id] Tag id
             * @property {string|null} [tag] Tag tag
             * @property {string|null} [key] Tag key
             * @property {number|null} [createdAt] Tag createdAt
             * @property {huskysoft.gotagme.IUser|null} [addedBy] Tag addedBy
             * @property {huskysoft.gotagme.IPhoto|null} [photo] Tag photo
             * @property {string|null} [display] Tag display
             * @property {huskysoft.gotagme.IUser|null} [taggedUser] Tag taggedUser
             * @property {huskysoft.gotagme.ICostume|null} [costume] Tag costume
             * @property {string|null} [hashtag] Tag hashtag
             * @property {huskysoft.gotagme.ApprovalState|null} [state] Tag state
             */

            /**
             * Constructs a new Tag.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a Tag.
             * @implements ITag
             * @constructor
             * @param {huskysoft.gotagme.ITag=} [properties] Properties to set
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
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.id = "";

            /**
             * Tag tag.
             * @member {string} tag
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.tag = "";

            /**
             * Tag key.
             * @member {string} key
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.key = "";

            /**
             * Tag createdAt.
             * @member {number} createdAt
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.createdAt = 0;

            /**
             * Tag addedBy.
             * @member {huskysoft.gotagme.IUser|null|undefined} addedBy
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.addedBy = null;

            /**
             * Tag photo.
             * @member {huskysoft.gotagme.IPhoto|null|undefined} photo
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.photo = null;

            /**
             * Tag display.
             * @member {string} display
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.display = "";

            /**
             * Tag taggedUser.
             * @member {huskysoft.gotagme.IUser|null|undefined} taggedUser
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.taggedUser = null;

            /**
             * Tag costume.
             * @member {huskysoft.gotagme.ICostume|null|undefined} costume
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.costume = null;

            /**
             * Tag hashtag.
             * @member {string} hashtag
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.hashtag = "";

            /**
             * Tag state.
             * @member {huskysoft.gotagme.ApprovalState} state
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Tag.prototype.state = 0;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Tag value.
             * @member {"taggedUser"|"costume"|"hashtag"|undefined} value
             * @memberof huskysoft.gotagme.Tag
             * @instance
             */
            Object.defineProperty(Tag.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["taggedUser", "costume", "hashtag"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Tag instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.Tag
             * @static
             * @param {huskysoft.gotagme.ITag=} [properties] Properties to set
             * @returns {huskysoft.gotagme.Tag} Tag instance
             */
            Tag.create = function create(properties) {
                return new Tag(properties);
            };

            /**
             * Encodes the specified Tag message. Does not implicitly {@link huskysoft.gotagme.Tag.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.Tag
             * @static
             * @param {huskysoft.gotagme.ITag} message Tag message or plain object to encode
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
                    $root.huskysoft.gotagme.User.encode(message.addedBy, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.photo != null && message.hasOwnProperty("photo"))
                    $root.huskysoft.gotagme.Photo.encode(message.photo, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.display != null && message.hasOwnProperty("display"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.display);
                if (message.taggedUser != null && message.hasOwnProperty("taggedUser"))
                    $root.huskysoft.gotagme.User.encode(message.taggedUser, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.costume != null && message.hasOwnProperty("costume"))
                    $root.huskysoft.gotagme.Costume.encode(message.costume, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.hashtag != null && message.hasOwnProperty("hashtag"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.hashtag);
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.state);
                return writer;
            };

            /**
             * Encodes the specified Tag message, length delimited. Does not implicitly {@link huskysoft.gotagme.Tag.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.Tag
             * @static
             * @param {huskysoft.gotagme.ITag} message Tag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Tag.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Tag message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.Tag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.Tag} Tag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Tag.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.Tag();
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
                        message.addedBy = $root.huskysoft.gotagme.User.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.photo = $root.huskysoft.gotagme.Photo.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.display = reader.string();
                        break;
                    case 8:
                        message.taggedUser = $root.huskysoft.gotagme.User.decode(reader, reader.uint32());
                        break;
                    case 9:
                        message.costume = $root.huskysoft.gotagme.Costume.decode(reader, reader.uint32());
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
             * @memberof huskysoft.gotagme.Tag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.Tag} Tag
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
             * @memberof huskysoft.gotagme.Tag
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
                    var error = $root.huskysoft.gotagme.User.verify(message.addedBy);
                    if (error)
                        return "addedBy." + error;
                }
                if (message.photo != null && message.hasOwnProperty("photo")) {
                    var error = $root.huskysoft.gotagme.Photo.verify(message.photo);
                    if (error)
                        return "photo." + error;
                }
                if (message.display != null && message.hasOwnProperty("display"))
                    if (!$util.isString(message.display))
                        return "display: string expected";
                if (message.taggedUser != null && message.hasOwnProperty("taggedUser")) {
                    properties.value = 1;
                    {
                        var error = $root.huskysoft.gotagme.User.verify(message.taggedUser);
                        if (error)
                            return "taggedUser." + error;
                    }
                }
                if (message.costume != null && message.hasOwnProperty("costume")) {
                    if (properties.value === 1)
                        return "value: multiple values";
                    properties.value = 1;
                    {
                        var error = $root.huskysoft.gotagme.Costume.verify(message.costume);
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
             * @memberof huskysoft.gotagme.Tag
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.Tag} Tag
             */
            Tag.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.Tag)
                    return object;
                var message = new $root.huskysoft.gotagme.Tag();
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
                        throw TypeError(".huskysoft.gotagme.Tag.addedBy: object expected");
                    message.addedBy = $root.huskysoft.gotagme.User.fromObject(object.addedBy);
                }
                if (object.photo != null) {
                    if (typeof object.photo !== "object")
                        throw TypeError(".huskysoft.gotagme.Tag.photo: object expected");
                    message.photo = $root.huskysoft.gotagme.Photo.fromObject(object.photo);
                }
                if (object.display != null)
                    message.display = String(object.display);
                if (object.taggedUser != null) {
                    if (typeof object.taggedUser !== "object")
                        throw TypeError(".huskysoft.gotagme.Tag.taggedUser: object expected");
                    message.taggedUser = $root.huskysoft.gotagme.User.fromObject(object.taggedUser);
                }
                if (object.costume != null) {
                    if (typeof object.costume !== "object")
                        throw TypeError(".huskysoft.gotagme.Tag.costume: object expected");
                    message.costume = $root.huskysoft.gotagme.Costume.fromObject(object.costume);
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
             * @memberof huskysoft.gotagme.Tag
             * @static
             * @param {huskysoft.gotagme.Tag} message Tag
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
                    object.addedBy = $root.huskysoft.gotagme.User.toObject(message.addedBy, options);
                if (message.photo != null && message.hasOwnProperty("photo"))
                    object.photo = $root.huskysoft.gotagme.Photo.toObject(message.photo, options);
                if (message.display != null && message.hasOwnProperty("display"))
                    object.display = message.display;
                if (message.taggedUser != null && message.hasOwnProperty("taggedUser")) {
                    object.taggedUser = $root.huskysoft.gotagme.User.toObject(message.taggedUser, options);
                    if (options.oneofs)
                        object.value = "taggedUser";
                }
                if (message.costume != null && message.hasOwnProperty("costume")) {
                    object.costume = $root.huskysoft.gotagme.Costume.toObject(message.costume, options);
                    if (options.oneofs)
                        object.value = "costume";
                }
                if (message.hashtag != null && message.hasOwnProperty("hashtag")) {
                    object.hashtag = message.hashtag;
                    if (options.oneofs)
                        object.value = "hashtag";
                }
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.huskysoft.gotagme.ApprovalState[message.state] : message.state;
                return object;
            };

            /**
             * Converts this Tag to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.Tag
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Tag.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Tag;
        })();

        gotagme.AddTagsToPhotoRequest = (function() {

            /**
             * Properties of an AddTagsToPhotoRequest.
             * @memberof huskysoft.gotagme
             * @interface IAddTagsToPhotoRequest
             * @property {Array.<huskysoft.gotagme.ITag>|null} [tags] AddTagsToPhotoRequest tags
             * @property {huskysoft.gotagme.ITag|null} [capturedBy] AddTagsToPhotoRequest capturedBy
             */

            /**
             * Constructs a new AddTagsToPhotoRequest.
             * @memberof huskysoft.gotagme
             * @classdesc Represents an AddTagsToPhotoRequest.
             * @implements IAddTagsToPhotoRequest
             * @constructor
             * @param {huskysoft.gotagme.IAddTagsToPhotoRequest=} [properties] Properties to set
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
             * @member {Array.<huskysoft.gotagme.ITag>} tags
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @instance
             */
            AddTagsToPhotoRequest.prototype.tags = $util.emptyArray;

            /**
             * AddTagsToPhotoRequest capturedBy.
             * @member {huskysoft.gotagme.ITag|null|undefined} capturedBy
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @instance
             */
            AddTagsToPhotoRequest.prototype.capturedBy = null;

            /**
             * Creates a new AddTagsToPhotoRequest instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @static
             * @param {huskysoft.gotagme.IAddTagsToPhotoRequest=} [properties] Properties to set
             * @returns {huskysoft.gotagme.AddTagsToPhotoRequest} AddTagsToPhotoRequest instance
             */
            AddTagsToPhotoRequest.create = function create(properties) {
                return new AddTagsToPhotoRequest(properties);
            };

            /**
             * Encodes the specified AddTagsToPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.AddTagsToPhotoRequest.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @static
             * @param {huskysoft.gotagme.IAddTagsToPhotoRequest} message AddTagsToPhotoRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddTagsToPhotoRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tags != null && message.tags.length)
                    for (var i = 0; i < message.tags.length; ++i)
                        $root.huskysoft.gotagme.Tag.encode(message.tags[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                    $root.huskysoft.gotagme.Tag.encode(message.capturedBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified AddTagsToPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.AddTagsToPhotoRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @static
             * @param {huskysoft.gotagme.IAddTagsToPhotoRequest} message AddTagsToPhotoRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddTagsToPhotoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AddTagsToPhotoRequest message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.AddTagsToPhotoRequest} AddTagsToPhotoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddTagsToPhotoRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.AddTagsToPhotoRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.tags && message.tags.length))
                            message.tags = [];
                        message.tags.push($root.huskysoft.gotagme.Tag.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        message.capturedBy = $root.huskysoft.gotagme.Tag.decode(reader, reader.uint32());
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
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.AddTagsToPhotoRequest} AddTagsToPhotoRequest
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
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
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
                        var error = $root.huskysoft.gotagme.Tag.verify(message.tags[i]);
                        if (error)
                            return "tags." + error;
                    }
                }
                if (message.capturedBy != null && message.hasOwnProperty("capturedBy")) {
                    var error = $root.huskysoft.gotagme.Tag.verify(message.capturedBy);
                    if (error)
                        return "capturedBy." + error;
                }
                return null;
            };

            /**
             * Creates an AddTagsToPhotoRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.AddTagsToPhotoRequest} AddTagsToPhotoRequest
             */
            AddTagsToPhotoRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.AddTagsToPhotoRequest)
                    return object;
                var message = new $root.huskysoft.gotagme.AddTagsToPhotoRequest();
                if (object.tags) {
                    if (!Array.isArray(object.tags))
                        throw TypeError(".huskysoft.gotagme.AddTagsToPhotoRequest.tags: array expected");
                    message.tags = [];
                    for (var i = 0; i < object.tags.length; ++i) {
                        if (typeof object.tags[i] !== "object")
                            throw TypeError(".huskysoft.gotagme.AddTagsToPhotoRequest.tags: object expected");
                        message.tags[i] = $root.huskysoft.gotagme.Tag.fromObject(object.tags[i]);
                    }
                }
                if (object.capturedBy != null) {
                    if (typeof object.capturedBy !== "object")
                        throw TypeError(".huskysoft.gotagme.AddTagsToPhotoRequest.capturedBy: object expected");
                    message.capturedBy = $root.huskysoft.gotagme.Tag.fromObject(object.capturedBy);
                }
                return message;
            };

            /**
             * Creates a plain object from an AddTagsToPhotoRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @static
             * @param {huskysoft.gotagme.AddTagsToPhotoRequest} message AddTagsToPhotoRequest
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
                        object.tags[j] = $root.huskysoft.gotagme.Tag.toObject(message.tags[j], options);
                }
                if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                    object.capturedBy = $root.huskysoft.gotagme.Tag.toObject(message.capturedBy, options);
                return object;
            };

            /**
             * Converts this AddTagsToPhotoRequest to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.AddTagsToPhotoRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AddTagsToPhotoRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AddTagsToPhotoRequest;
        })();

        gotagme.ModifyTagRequest = (function() {

            /**
             * Properties of a ModifyTagRequest.
             * @memberof huskysoft.gotagme
             * @interface IModifyTagRequest
             * @property {string|null} [id] ModifyTagRequest id
             * @property {huskysoft.gotagme.ApprovalState|null} [state] ModifyTagRequest state
             */

            /**
             * Constructs a new ModifyTagRequest.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a ModifyTagRequest.
             * @implements IModifyTagRequest
             * @constructor
             * @param {huskysoft.gotagme.IModifyTagRequest=} [properties] Properties to set
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
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @instance
             */
            ModifyTagRequest.prototype.id = "";

            /**
             * ModifyTagRequest state.
             * @member {huskysoft.gotagme.ApprovalState} state
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @instance
             */
            ModifyTagRequest.prototype.state = 0;

            /**
             * Creates a new ModifyTagRequest instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @static
             * @param {huskysoft.gotagme.IModifyTagRequest=} [properties] Properties to set
             * @returns {huskysoft.gotagme.ModifyTagRequest} ModifyTagRequest instance
             */
            ModifyTagRequest.create = function create(properties) {
                return new ModifyTagRequest(properties);
            };

            /**
             * Encodes the specified ModifyTagRequest message. Does not implicitly {@link huskysoft.gotagme.ModifyTagRequest.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @static
             * @param {huskysoft.gotagme.IModifyTagRequest} message ModifyTagRequest message or plain object to encode
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
             * Encodes the specified ModifyTagRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.ModifyTagRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @static
             * @param {huskysoft.gotagme.IModifyTagRequest} message ModifyTagRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModifyTagRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModifyTagRequest message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.ModifyTagRequest} ModifyTagRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModifyTagRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.ModifyTagRequest();
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
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.ModifyTagRequest} ModifyTagRequest
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
             * @memberof huskysoft.gotagme.ModifyTagRequest
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
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.ModifyTagRequest} ModifyTagRequest
             */
            ModifyTagRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.ModifyTagRequest)
                    return object;
                var message = new $root.huskysoft.gotagme.ModifyTagRequest();
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
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @static
             * @param {huskysoft.gotagme.ModifyTagRequest} message ModifyTagRequest
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
                    object.state = options.enums === String ? $root.huskysoft.gotagme.ApprovalState[message.state] : message.state;
                return object;
            };

            /**
             * Converts this ModifyTagRequest to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.ModifyTagRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModifyTagRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ModifyTagRequest;
        })();

        gotagme.ModifyTagResponse = (function() {

            /**
             * Properties of a ModifyTagResponse.
             * @memberof huskysoft.gotagme
             * @interface IModifyTagResponse
             * @property {huskysoft.gotagme.ITag|null} [tag] ModifyTagResponse tag
             */

            /**
             * Constructs a new ModifyTagResponse.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a ModifyTagResponse.
             * @implements IModifyTagResponse
             * @constructor
             * @param {huskysoft.gotagme.IModifyTagResponse=} [properties] Properties to set
             */
            function ModifyTagResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ModifyTagResponse tag.
             * @member {huskysoft.gotagme.ITag|null|undefined} tag
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @instance
             */
            ModifyTagResponse.prototype.tag = null;

            /**
             * Creates a new ModifyTagResponse instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @static
             * @param {huskysoft.gotagme.IModifyTagResponse=} [properties] Properties to set
             * @returns {huskysoft.gotagme.ModifyTagResponse} ModifyTagResponse instance
             */
            ModifyTagResponse.create = function create(properties) {
                return new ModifyTagResponse(properties);
            };

            /**
             * Encodes the specified ModifyTagResponse message. Does not implicitly {@link huskysoft.gotagme.ModifyTagResponse.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @static
             * @param {huskysoft.gotagme.IModifyTagResponse} message ModifyTagResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModifyTagResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tag != null && message.hasOwnProperty("tag"))
                    $root.huskysoft.gotagme.Tag.encode(message.tag, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ModifyTagResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.ModifyTagResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @static
             * @param {huskysoft.gotagme.IModifyTagResponse} message ModifyTagResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModifyTagResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModifyTagResponse message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.ModifyTagResponse} ModifyTagResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModifyTagResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.ModifyTagResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.tag = $root.huskysoft.gotagme.Tag.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ModifyTagResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.ModifyTagResponse} ModifyTagResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModifyTagResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ModifyTagResponse message.
             * @function verify
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ModifyTagResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.tag != null && message.hasOwnProperty("tag")) {
                    var error = $root.huskysoft.gotagme.Tag.verify(message.tag);
                    if (error)
                        return "tag." + error;
                }
                return null;
            };

            /**
             * Creates a ModifyTagResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.ModifyTagResponse} ModifyTagResponse
             */
            ModifyTagResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.ModifyTagResponse)
                    return object;
                var message = new $root.huskysoft.gotagme.ModifyTagResponse();
                if (object.tag != null) {
                    if (typeof object.tag !== "object")
                        throw TypeError(".huskysoft.gotagme.ModifyTagResponse.tag: object expected");
                    message.tag = $root.huskysoft.gotagme.Tag.fromObject(object.tag);
                }
                return message;
            };

            /**
             * Creates a plain object from a ModifyTagResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @static
             * @param {huskysoft.gotagme.ModifyTagResponse} message ModifyTagResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ModifyTagResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.tag = null;
                if (message.tag != null && message.hasOwnProperty("tag"))
                    object.tag = $root.huskysoft.gotagme.Tag.toObject(message.tag, options);
                return object;
            };

            /**
             * Converts this ModifyTagResponse to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.ModifyTagResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModifyTagResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ModifyTagResponse;
        })();

        gotagme.GetTagsRequest = (function() {

            /**
             * Properties of a GetTagsRequest.
             * @memberof huskysoft.gotagme
             * @interface IGetTagsRequest
             * @property {string|null} [tagID] GetTagsRequest tagID
             * @property {string|null} [photoID] GetTagsRequest photoID
             */

            /**
             * Constructs a new GetTagsRequest.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a GetTagsRequest.
             * @implements IGetTagsRequest
             * @constructor
             * @param {huskysoft.gotagme.IGetTagsRequest=} [properties] Properties to set
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
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @instance
             */
            GetTagsRequest.prototype.tagID = "";

            /**
             * GetTagsRequest photoID.
             * @member {string} photoID
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @instance
             */
            GetTagsRequest.prototype.photoID = "";

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * GetTagsRequest id.
             * @member {"tagID"|"photoID"|undefined} id
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @instance
             */
            Object.defineProperty(GetTagsRequest.prototype, "id", {
                get: $util.oneOfGetter($oneOfFields = ["tagID", "photoID"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new GetTagsRequest instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @static
             * @param {huskysoft.gotagme.IGetTagsRequest=} [properties] Properties to set
             * @returns {huskysoft.gotagme.GetTagsRequest} GetTagsRequest instance
             */
            GetTagsRequest.create = function create(properties) {
                return new GetTagsRequest(properties);
            };

            /**
             * Encodes the specified GetTagsRequest message. Does not implicitly {@link huskysoft.gotagme.GetTagsRequest.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @static
             * @param {huskysoft.gotagme.IGetTagsRequest} message GetTagsRequest message or plain object to encode
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
                return writer;
            };

            /**
             * Encodes the specified GetTagsRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.GetTagsRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @static
             * @param {huskysoft.gotagme.IGetTagsRequest} message GetTagsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTagsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetTagsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.GetTagsRequest} GetTagsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTagsRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.GetTagsRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.tagID = reader.string();
                        break;
                    case 2:
                        message.photoID = reader.string();
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
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.GetTagsRequest} GetTagsRequest
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
             * @memberof huskysoft.gotagme.GetTagsRequest
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
                return null;
            };

            /**
             * Creates a GetTagsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.GetTagsRequest} GetTagsRequest
             */
            GetTagsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.GetTagsRequest)
                    return object;
                var message = new $root.huskysoft.gotagme.GetTagsRequest();
                if (object.tagID != null)
                    message.tagID = String(object.tagID);
                if (object.photoID != null)
                    message.photoID = String(object.photoID);
                return message;
            };

            /**
             * Creates a plain object from a GetTagsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @static
             * @param {huskysoft.gotagme.GetTagsRequest} message GetTagsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTagsRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
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
                return object;
            };

            /**
             * Converts this GetTagsRequest to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.GetTagsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTagsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTagsRequest;
        })();

        gotagme.GetTagsResponse = (function() {

            /**
             * Properties of a GetTagsResponse.
             * @memberof huskysoft.gotagme
             * @interface IGetTagsResponse
             * @property {Array.<huskysoft.gotagme.ITag>|null} [tags] GetTagsResponse tags
             * @property {huskysoft.gotagme.ITag|null} [capturedBy] GetTagsResponse capturedBy
             */

            /**
             * Constructs a new GetTagsResponse.
             * @memberof huskysoft.gotagme
             * @classdesc Represents a GetTagsResponse.
             * @implements IGetTagsResponse
             * @constructor
             * @param {huskysoft.gotagme.IGetTagsResponse=} [properties] Properties to set
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
             * @member {Array.<huskysoft.gotagme.ITag>} tags
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @instance
             */
            GetTagsResponse.prototype.tags = $util.emptyArray;

            /**
             * GetTagsResponse capturedBy.
             * @member {huskysoft.gotagme.ITag|null|undefined} capturedBy
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @instance
             */
            GetTagsResponse.prototype.capturedBy = null;

            /**
             * Creates a new GetTagsResponse instance using the specified properties.
             * @function create
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @static
             * @param {huskysoft.gotagme.IGetTagsResponse=} [properties] Properties to set
             * @returns {huskysoft.gotagme.GetTagsResponse} GetTagsResponse instance
             */
            GetTagsResponse.create = function create(properties) {
                return new GetTagsResponse(properties);
            };

            /**
             * Encodes the specified GetTagsResponse message. Does not implicitly {@link huskysoft.gotagme.GetTagsResponse.verify|verify} messages.
             * @function encode
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @static
             * @param {huskysoft.gotagme.IGetTagsResponse} message GetTagsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTagsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tags != null && message.tags.length)
                    for (var i = 0; i < message.tags.length; ++i)
                        $root.huskysoft.gotagme.Tag.encode(message.tags[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                    $root.huskysoft.gotagme.Tag.encode(message.capturedBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GetTagsResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.GetTagsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @static
             * @param {huskysoft.gotagme.IGetTagsResponse} message GetTagsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTagsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetTagsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {huskysoft.gotagme.GetTagsResponse} GetTagsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTagsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.GetTagsResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.tags && message.tags.length))
                            message.tags = [];
                        message.tags.push($root.huskysoft.gotagme.Tag.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        message.capturedBy = $root.huskysoft.gotagme.Tag.decode(reader, reader.uint32());
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
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {huskysoft.gotagme.GetTagsResponse} GetTagsResponse
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
             * @memberof huskysoft.gotagme.GetTagsResponse
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
                        var error = $root.huskysoft.gotagme.Tag.verify(message.tags[i]);
                        if (error)
                            return "tags." + error;
                    }
                }
                if (message.capturedBy != null && message.hasOwnProperty("capturedBy")) {
                    var error = $root.huskysoft.gotagme.Tag.verify(message.capturedBy);
                    if (error)
                        return "capturedBy." + error;
                }
                return null;
            };

            /**
             * Creates a GetTagsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {huskysoft.gotagme.GetTagsResponse} GetTagsResponse
             */
            GetTagsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.huskysoft.gotagme.GetTagsResponse)
                    return object;
                var message = new $root.huskysoft.gotagme.GetTagsResponse();
                if (object.tags) {
                    if (!Array.isArray(object.tags))
                        throw TypeError(".huskysoft.gotagme.GetTagsResponse.tags: array expected");
                    message.tags = [];
                    for (var i = 0; i < object.tags.length; ++i) {
                        if (typeof object.tags[i] !== "object")
                            throw TypeError(".huskysoft.gotagme.GetTagsResponse.tags: object expected");
                        message.tags[i] = $root.huskysoft.gotagme.Tag.fromObject(object.tags[i]);
                    }
                }
                if (object.capturedBy != null) {
                    if (typeof object.capturedBy !== "object")
                        throw TypeError(".huskysoft.gotagme.GetTagsResponse.capturedBy: object expected");
                    message.capturedBy = $root.huskysoft.gotagme.Tag.fromObject(object.capturedBy);
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTagsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @static
             * @param {huskysoft.gotagme.GetTagsResponse} message GetTagsResponse
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
                        object.tags[j] = $root.huskysoft.gotagme.Tag.toObject(message.tags[j], options);
                }
                if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                    object.capturedBy = $root.huskysoft.gotagme.Tag.toObject(message.capturedBy, options);
                return object;
            };

            /**
             * Converts this GetTagsResponse to JSON.
             * @function toJSON
             * @memberof huskysoft.gotagme.GetTagsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTagsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTagsResponse;
        })();

        return gotagme;
    })();

    return huskysoft;
})();

module.exports = $root;
