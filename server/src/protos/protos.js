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

        gotagme.common = (function() {

            /**
             * Namespace common.
             * @memberof huskysoft.gotagme
             * @namespace
             */
            var common = {};

            /**
             * ApprovalState enum.
             * @name huskysoft.gotagme.common.ApprovalState
             * @enum {string}
             * @property {number} NEW=0 NEW value
             * @property {number} APPROVED=1 APPROVED value
             * @property {number} REJECTED=2 REJECTED value
             */
            common.ApprovalState = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "NEW"] = 0;
                values[valuesById[1] = "APPROVED"] = 1;
                values[valuesById[2] = "REJECTED"] = 2;
                return values;
            })();

            common.ApprovalStatus = (function() {

                /**
                 * Properties of an ApprovalStatus.
                 * @memberof huskysoft.gotagme.common
                 * @interface IApprovalStatus
                 * @property {huskysoft.gotagme.common.ApprovalState|null} [state] ApprovalStatus state
                 * @property {huskysoft.gotagme.models.IUser|null} [setBy] ApprovalStatus setBy
                 * @property {number|Long|null} [createdAt] ApprovalStatus createdAt
                 */

                /**
                 * Constructs a new ApprovalStatus.
                 * @memberof huskysoft.gotagme.common
                 * @classdesc Represents an ApprovalStatus.
                 * @implements IApprovalStatus
                 * @constructor
                 * @param {huskysoft.gotagme.common.IApprovalStatus=} [properties] Properties to set
                 */
                function ApprovalStatus(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ApprovalStatus state.
                 * @member {huskysoft.gotagme.common.ApprovalState} state
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @instance
                 */
                ApprovalStatus.prototype.state = 0;

                /**
                 * ApprovalStatus setBy.
                 * @member {huskysoft.gotagme.models.IUser|null|undefined} setBy
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @instance
                 */
                ApprovalStatus.prototype.setBy = null;

                /**
                 * ApprovalStatus createdAt.
                 * @member {number|Long} createdAt
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @instance
                 */
                ApprovalStatus.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new ApprovalStatus instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @static
                 * @param {huskysoft.gotagme.common.IApprovalStatus=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.common.ApprovalStatus} ApprovalStatus instance
                 */
                ApprovalStatus.create = function create(properties) {
                    return new ApprovalStatus(properties);
                };

                /**
                 * Encodes the specified ApprovalStatus message. Does not implicitly {@link huskysoft.gotagme.common.ApprovalStatus.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @static
                 * @param {huskysoft.gotagme.common.IApprovalStatus} message ApprovalStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ApprovalStatus.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.state != null && message.hasOwnProperty("state"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                    if (message.setBy != null && message.hasOwnProperty("setBy"))
                        $root.huskysoft.gotagme.models.User.encode(message.setBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int64(message.createdAt);
                    return writer;
                };

                /**
                 * Encodes the specified ApprovalStatus message, length delimited. Does not implicitly {@link huskysoft.gotagme.common.ApprovalStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @static
                 * @param {huskysoft.gotagme.common.IApprovalStatus} message ApprovalStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ApprovalStatus.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an ApprovalStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.common.ApprovalStatus} ApprovalStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ApprovalStatus.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.common.ApprovalStatus();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.state = reader.int32();
                            break;
                        case 2:
                            message.setBy = $root.huskysoft.gotagme.models.User.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.createdAt = reader.int64();
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
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.common.ApprovalStatus} ApprovalStatus
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
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
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
                        var error = $root.huskysoft.gotagme.models.User.verify(message.setBy);
                        if (error)
                            return "setBy." + error;
                    }
                    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                        if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                            return "createdAt: integer|Long expected";
                    return null;
                };

                /**
                 * Creates an ApprovalStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.common.ApprovalStatus} ApprovalStatus
                 */
                ApprovalStatus.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.common.ApprovalStatus)
                        return object;
                    var message = new $root.huskysoft.gotagme.common.ApprovalStatus();
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
                            throw TypeError(".huskysoft.gotagme.common.ApprovalStatus.setBy: object expected");
                        message.setBy = $root.huskysoft.gotagme.models.User.fromObject(object.setBy);
                    }
                    if (object.createdAt != null)
                        if ($util.Long)
                            (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned = false;
                        else if (typeof object.createdAt === "string")
                            message.createdAt = parseInt(object.createdAt, 10);
                        else if (typeof object.createdAt === "number")
                            message.createdAt = object.createdAt;
                        else if (typeof object.createdAt === "object")
                            message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber();
                    return message;
                };

                /**
                 * Creates a plain object from an ApprovalStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @static
                 * @param {huskysoft.gotagme.common.ApprovalStatus} message ApprovalStatus
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
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.createdAt = options.longs === String ? "0" : 0;
                    }
                    if (message.state != null && message.hasOwnProperty("state"))
                        object.state = options.enums === String ? $root.huskysoft.gotagme.common.ApprovalState[message.state] : message.state;
                    if (message.setBy != null && message.hasOwnProperty("setBy"))
                        object.setBy = $root.huskysoft.gotagme.models.User.toObject(message.setBy, options);
                    if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                        if (typeof message.createdAt === "number")
                            object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
                        else
                            object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber() : message.createdAt;
                    return object;
                };

                /**
                 * Converts this ApprovalStatus to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.common.ApprovalStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ApprovalStatus.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ApprovalStatus;
            })();

            return common;
        })();

        gotagme.models = (function() {

            /**
             * Namespace models.
             * @memberof huskysoft.gotagme
             * @namespace
             */
            var models = {};

            models.Costume = (function() {

                /**
                 * Properties of a Costume.
                 * @memberof huskysoft.gotagme.models
                 * @interface ICostume
                 * @property {string|null} [id] Costume id
                 * @property {string|null} [name] Costume name
                 * @property {huskysoft.gotagme.models.IUser|null} [owner] Costume owner
                 */

                /**
                 * Constructs a new Costume.
                 * @memberof huskysoft.gotagme.models
                 * @classdesc Represents a Costume.
                 * @implements ICostume
                 * @constructor
                 * @param {huskysoft.gotagme.models.ICostume=} [properties] Properties to set
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
                 * @memberof huskysoft.gotagme.models.Costume
                 * @instance
                 */
                Costume.prototype.id = "";

                /**
                 * Costume name.
                 * @member {string} name
                 * @memberof huskysoft.gotagme.models.Costume
                 * @instance
                 */
                Costume.prototype.name = "";

                /**
                 * Costume owner.
                 * @member {huskysoft.gotagme.models.IUser|null|undefined} owner
                 * @memberof huskysoft.gotagme.models.Costume
                 * @instance
                 */
                Costume.prototype.owner = null;

                /**
                 * Creates a new Costume instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.models.Costume
                 * @static
                 * @param {huskysoft.gotagme.models.ICostume=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.models.Costume} Costume instance
                 */
                Costume.create = function create(properties) {
                    return new Costume(properties);
                };

                /**
                 * Encodes the specified Costume message. Does not implicitly {@link huskysoft.gotagme.models.Costume.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.models.Costume
                 * @static
                 * @param {huskysoft.gotagme.models.ICostume} message Costume message or plain object to encode
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
                        $root.huskysoft.gotagme.models.User.encode(message.owner, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Costume message, length delimited. Does not implicitly {@link huskysoft.gotagme.models.Costume.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.models.Costume
                 * @static
                 * @param {huskysoft.gotagme.models.ICostume} message Costume message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Costume.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Costume message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.models.Costume
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.models.Costume} Costume
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Costume.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.models.Costume();
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
                            message.owner = $root.huskysoft.gotagme.models.User.decode(reader, reader.uint32());
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
                 * @memberof huskysoft.gotagme.models.Costume
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.models.Costume} Costume
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
                 * @memberof huskysoft.gotagme.models.Costume
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
                        var error = $root.huskysoft.gotagme.models.User.verify(message.owner);
                        if (error)
                            return "owner." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Costume message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.models.Costume
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.models.Costume} Costume
                 */
                Costume.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.models.Costume)
                        return object;
                    var message = new $root.huskysoft.gotagme.models.Costume();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.owner != null) {
                        if (typeof object.owner !== "object")
                            throw TypeError(".huskysoft.gotagme.models.Costume.owner: object expected");
                        message.owner = $root.huskysoft.gotagme.models.User.fromObject(object.owner);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Costume message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.models.Costume
                 * @static
                 * @param {huskysoft.gotagme.models.Costume} message Costume
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
                        object.owner = $root.huskysoft.gotagme.models.User.toObject(message.owner, options);
                    return object;
                };

                /**
                 * Converts this Costume to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.models.Costume
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Costume.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Costume;
            })();

            models.Photo = (function() {

                /**
                 * Properties of a Photo.
                 * @memberof huskysoft.gotagme.models
                 * @interface IPhoto
                 * @property {string|null} [id] Photo id
                 * @property {huskysoft.gotagme.models.IUser|null} [postedBy] Photo postedBy
                 * @property {huskysoft.gotagme.models.IUser|null} [capturedBy] Photo capturedBy
                 * @property {number|Long|null} [capturedAt] Photo capturedAt
                 * @property {huskysoft.gotagme.common.ApprovalState|null} [state] Photo state
                 * @property {string|null} [externalUrl] Photo externalUrl
                 * @property {string|null} [smallImageUrl] Photo smallImageUrl
                 * @property {string|null} [largeImageUrl] Photo largeImageUrl
                 * @property {string|null} [xlargeImageUrl] Photo xlargeImageUrl
                 * @property {string|null} [title] Photo title
                 * @property {string|null} [description] Photo description
                 */

                /**
                 * Constructs a new Photo.
                 * @memberof huskysoft.gotagme.models
                 * @classdesc Represents a Photo.
                 * @implements IPhoto
                 * @constructor
                 * @param {huskysoft.gotagme.models.IPhoto=} [properties] Properties to set
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
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.id = "";

                /**
                 * Photo postedBy.
                 * @member {huskysoft.gotagme.models.IUser|null|undefined} postedBy
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.postedBy = null;

                /**
                 * Photo capturedBy.
                 * @member {huskysoft.gotagme.models.IUser|null|undefined} capturedBy
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.capturedBy = null;

                /**
                 * Photo capturedAt.
                 * @member {number|Long} capturedAt
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.capturedAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Photo state.
                 * @member {huskysoft.gotagme.common.ApprovalState} state
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.state = 0;

                /**
                 * Photo externalUrl.
                 * @member {string} externalUrl
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.externalUrl = "";

                /**
                 * Photo smallImageUrl.
                 * @member {string} smallImageUrl
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.smallImageUrl = "";

                /**
                 * Photo largeImageUrl.
                 * @member {string} largeImageUrl
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.largeImageUrl = "";

                /**
                 * Photo xlargeImageUrl.
                 * @member {string} xlargeImageUrl
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.xlargeImageUrl = "";

                /**
                 * Photo title.
                 * @member {string} title
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.title = "";

                /**
                 * Photo description.
                 * @member {string} description
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 */
                Photo.prototype.description = "";

                /**
                 * Creates a new Photo instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.models.Photo
                 * @static
                 * @param {huskysoft.gotagme.models.IPhoto=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.models.Photo} Photo instance
                 */
                Photo.create = function create(properties) {
                    return new Photo(properties);
                };

                /**
                 * Encodes the specified Photo message. Does not implicitly {@link huskysoft.gotagme.models.Photo.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.models.Photo
                 * @static
                 * @param {huskysoft.gotagme.models.IPhoto} message Photo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Photo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.postedBy != null && message.hasOwnProperty("postedBy"))
                        $root.huskysoft.gotagme.models.User.encode(message.postedBy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                        $root.huskysoft.gotagme.models.User.encode(message.capturedBy, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.capturedAt != null && message.hasOwnProperty("capturedAt"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int64(message.capturedAt);
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
                 * Encodes the specified Photo message, length delimited. Does not implicitly {@link huskysoft.gotagme.models.Photo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.models.Photo
                 * @static
                 * @param {huskysoft.gotagme.models.IPhoto} message Photo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Photo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Photo message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.models.Photo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.models.Photo} Photo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Photo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.models.Photo();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.postedBy = $root.huskysoft.gotagme.models.User.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.capturedBy = $root.huskysoft.gotagme.models.User.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.capturedAt = reader.int64();
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
                 * @memberof huskysoft.gotagme.models.Photo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.models.Photo} Photo
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
                 * @memberof huskysoft.gotagme.models.Photo
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
                        var error = $root.huskysoft.gotagme.models.User.verify(message.postedBy);
                        if (error)
                            return "postedBy." + error;
                    }
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy")) {
                        var error = $root.huskysoft.gotagme.models.User.verify(message.capturedBy);
                        if (error)
                            return "capturedBy." + error;
                    }
                    if (message.capturedAt != null && message.hasOwnProperty("capturedAt"))
                        if (!$util.isInteger(message.capturedAt) && !(message.capturedAt && $util.isInteger(message.capturedAt.low) && $util.isInteger(message.capturedAt.high)))
                            return "capturedAt: integer|Long expected";
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
                 * @memberof huskysoft.gotagme.models.Photo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.models.Photo} Photo
                 */
                Photo.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.models.Photo)
                        return object;
                    var message = new $root.huskysoft.gotagme.models.Photo();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.postedBy != null) {
                        if (typeof object.postedBy !== "object")
                            throw TypeError(".huskysoft.gotagme.models.Photo.postedBy: object expected");
                        message.postedBy = $root.huskysoft.gotagme.models.User.fromObject(object.postedBy);
                    }
                    if (object.capturedBy != null) {
                        if (typeof object.capturedBy !== "object")
                            throw TypeError(".huskysoft.gotagme.models.Photo.capturedBy: object expected");
                        message.capturedBy = $root.huskysoft.gotagme.models.User.fromObject(object.capturedBy);
                    }
                    if (object.capturedAt != null)
                        if ($util.Long)
                            (message.capturedAt = $util.Long.fromValue(object.capturedAt)).unsigned = false;
                        else if (typeof object.capturedAt === "string")
                            message.capturedAt = parseInt(object.capturedAt, 10);
                        else if (typeof object.capturedAt === "number")
                            message.capturedAt = object.capturedAt;
                        else if (typeof object.capturedAt === "object")
                            message.capturedAt = new $util.LongBits(object.capturedAt.low >>> 0, object.capturedAt.high >>> 0).toNumber();
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
                 * @memberof huskysoft.gotagme.models.Photo
                 * @static
                 * @param {huskysoft.gotagme.models.Photo} message Photo
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
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.capturedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.capturedAt = options.longs === String ? "0" : 0;
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
                        object.postedBy = $root.huskysoft.gotagme.models.User.toObject(message.postedBy, options);
                    if (message.capturedBy != null && message.hasOwnProperty("capturedBy"))
                        object.capturedBy = $root.huskysoft.gotagme.models.User.toObject(message.capturedBy, options);
                    if (message.capturedAt != null && message.hasOwnProperty("capturedAt"))
                        if (typeof message.capturedAt === "number")
                            object.capturedAt = options.longs === String ? String(message.capturedAt) : message.capturedAt;
                        else
                            object.capturedAt = options.longs === String ? $util.Long.prototype.toString.call(message.capturedAt) : options.longs === Number ? new $util.LongBits(message.capturedAt.low >>> 0, message.capturedAt.high >>> 0).toNumber() : message.capturedAt;
                    if (message.state != null && message.hasOwnProperty("state"))
                        object.state = options.enums === String ? $root.huskysoft.gotagme.common.ApprovalState[message.state] : message.state;
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
                 * @memberof huskysoft.gotagme.models.Photo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Photo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Photo;
            })();

            models.User = (function() {

                /**
                 * Properties of a User.
                 * @memberof huskysoft.gotagme.models
                 * @interface IUser
                 * @property {string|null} [id] User id
                 * @property {string|null} [displayName] User displayName
                 */

                /**
                 * Constructs a new User.
                 * @memberof huskysoft.gotagme.models
                 * @classdesc Represents a User.
                 * @implements IUser
                 * @constructor
                 * @param {huskysoft.gotagme.models.IUser=} [properties] Properties to set
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
                 * @memberof huskysoft.gotagme.models.User
                 * @instance
                 */
                User.prototype.id = "";

                /**
                 * User displayName.
                 * @member {string} displayName
                 * @memberof huskysoft.gotagme.models.User
                 * @instance
                 */
                User.prototype.displayName = "";

                /**
                 * Creates a new User instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.models.User
                 * @static
                 * @param {huskysoft.gotagme.models.IUser=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.models.User} User instance
                 */
                User.create = function create(properties) {
                    return new User(properties);
                };

                /**
                 * Encodes the specified User message. Does not implicitly {@link huskysoft.gotagme.models.User.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.models.User
                 * @static
                 * @param {huskysoft.gotagme.models.IUser} message User message or plain object to encode
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
                 * Encodes the specified User message, length delimited. Does not implicitly {@link huskysoft.gotagme.models.User.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.models.User
                 * @static
                 * @param {huskysoft.gotagme.models.IUser} message User message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                User.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a User message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.models.User
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.models.User} User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                User.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.models.User();
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
                 * @memberof huskysoft.gotagme.models.User
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.models.User} User
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
                 * @memberof huskysoft.gotagme.models.User
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
                 * @memberof huskysoft.gotagme.models.User
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.models.User} User
                 */
                User.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.models.User)
                        return object;
                    var message = new $root.huskysoft.gotagme.models.User();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.displayName != null)
                        message.displayName = String(object.displayName);
                    return message;
                };

                /**
                 * Creates a plain object from a User message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.models.User
                 * @static
                 * @param {huskysoft.gotagme.models.User} message User
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
                 * @memberof huskysoft.gotagme.models.User
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                User.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return User;
            })();

            models.Tag = (function() {

                /**
                 * Properties of a Tag.
                 * @memberof huskysoft.gotagme.models
                 * @interface ITag
                 * @property {string|null} [id] Tag id
                 * @property {string|null} [tag] Tag tag
                 * @property {string|null} [key] Tag key
                 * @property {number|Long|null} [createdAt] Tag createdAt
                 * @property {huskysoft.gotagme.models.IUser|null} [addedBy] Tag addedBy
                 * @property {huskysoft.gotagme.models.IPhoto|null} [photo] Tag photo
                 * @property {string|null} [display] Tag display
                 * @property {huskysoft.gotagme.models.IUser|null} [taggedUser] Tag taggedUser
                 * @property {huskysoft.gotagme.models.ICostume|null} [costume] Tag costume
                 * @property {string|null} [hashtag] Tag hashtag
                 * @property {huskysoft.gotagme.common.ApprovalState|null} [state] Tag state
                 */

                /**
                 * Constructs a new Tag.
                 * @memberof huskysoft.gotagme.models
                 * @classdesc Represents a Tag.
                 * @implements ITag
                 * @constructor
                 * @param {huskysoft.gotagme.models.ITag=} [properties] Properties to set
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
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.id = "";

                /**
                 * Tag tag.
                 * @member {string} tag
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.tag = "";

                /**
                 * Tag key.
                 * @member {string} key
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.key = "";

                /**
                 * Tag createdAt.
                 * @member {number|Long} createdAt
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Tag addedBy.
                 * @member {huskysoft.gotagme.models.IUser|null|undefined} addedBy
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.addedBy = null;

                /**
                 * Tag photo.
                 * @member {huskysoft.gotagme.models.IPhoto|null|undefined} photo
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.photo = null;

                /**
                 * Tag display.
                 * @member {string} display
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.display = "";

                /**
                 * Tag taggedUser.
                 * @member {huskysoft.gotagme.models.IUser|null|undefined} taggedUser
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.taggedUser = null;

                /**
                 * Tag costume.
                 * @member {huskysoft.gotagme.models.ICostume|null|undefined} costume
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.costume = null;

                /**
                 * Tag hashtag.
                 * @member {string} hashtag
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.hashtag = "";

                /**
                 * Tag state.
                 * @member {huskysoft.gotagme.common.ApprovalState} state
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Tag.prototype.state = 0;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Tag value.
                 * @member {"taggedUser"|"costume"|"hashtag"|undefined} value
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 */
                Object.defineProperty(Tag.prototype, "value", {
                    get: $util.oneOfGetter($oneOfFields = ["taggedUser", "costume", "hashtag"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Tag instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.models.Tag
                 * @static
                 * @param {huskysoft.gotagme.models.ITag=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.models.Tag} Tag instance
                 */
                Tag.create = function create(properties) {
                    return new Tag(properties);
                };

                /**
                 * Encodes the specified Tag message. Does not implicitly {@link huskysoft.gotagme.models.Tag.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.models.Tag
                 * @static
                 * @param {huskysoft.gotagme.models.ITag} message Tag message or plain object to encode
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
                        writer.uint32(/* id 4, wireType 0 =*/32).int64(message.createdAt);
                    if (message.addedBy != null && message.hasOwnProperty("addedBy"))
                        $root.huskysoft.gotagme.models.User.encode(message.addedBy, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.photo != null && message.hasOwnProperty("photo"))
                        $root.huskysoft.gotagme.models.Photo.encode(message.photo, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.display != null && message.hasOwnProperty("display"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.display);
                    if (message.taggedUser != null && message.hasOwnProperty("taggedUser"))
                        $root.huskysoft.gotagme.models.User.encode(message.taggedUser, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    if (message.costume != null && message.hasOwnProperty("costume"))
                        $root.huskysoft.gotagme.models.Costume.encode(message.costume, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    if (message.hashtag != null && message.hasOwnProperty("hashtag"))
                        writer.uint32(/* id 10, wireType 2 =*/82).string(message.hashtag);
                    if (message.state != null && message.hasOwnProperty("state"))
                        writer.uint32(/* id 11, wireType 0 =*/88).int32(message.state);
                    return writer;
                };

                /**
                 * Encodes the specified Tag message, length delimited. Does not implicitly {@link huskysoft.gotagme.models.Tag.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.models.Tag
                 * @static
                 * @param {huskysoft.gotagme.models.ITag} message Tag message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Tag.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Tag message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.models.Tag
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.models.Tag} Tag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tag.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.models.Tag();
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
                            message.createdAt = reader.int64();
                            break;
                        case 5:
                            message.addedBy = $root.huskysoft.gotagme.models.User.decode(reader, reader.uint32());
                            break;
                        case 6:
                            message.photo = $root.huskysoft.gotagme.models.Photo.decode(reader, reader.uint32());
                            break;
                        case 7:
                            message.display = reader.string();
                            break;
                        case 8:
                            message.taggedUser = $root.huskysoft.gotagme.models.User.decode(reader, reader.uint32());
                            break;
                        case 9:
                            message.costume = $root.huskysoft.gotagme.models.Costume.decode(reader, reader.uint32());
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
                 * @memberof huskysoft.gotagme.models.Tag
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.models.Tag} Tag
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
                 * @memberof huskysoft.gotagme.models.Tag
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
                        if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                            return "createdAt: integer|Long expected";
                    if (message.addedBy != null && message.hasOwnProperty("addedBy")) {
                        var error = $root.huskysoft.gotagme.models.User.verify(message.addedBy);
                        if (error)
                            return "addedBy." + error;
                    }
                    if (message.photo != null && message.hasOwnProperty("photo")) {
                        var error = $root.huskysoft.gotagme.models.Photo.verify(message.photo);
                        if (error)
                            return "photo." + error;
                    }
                    if (message.display != null && message.hasOwnProperty("display"))
                        if (!$util.isString(message.display))
                            return "display: string expected";
                    if (message.taggedUser != null && message.hasOwnProperty("taggedUser")) {
                        properties.value = 1;
                        {
                            var error = $root.huskysoft.gotagme.models.User.verify(message.taggedUser);
                            if (error)
                                return "taggedUser." + error;
                        }
                    }
                    if (message.costume != null && message.hasOwnProperty("costume")) {
                        if (properties.value === 1)
                            return "value: multiple values";
                        properties.value = 1;
                        {
                            var error = $root.huskysoft.gotagme.models.Costume.verify(message.costume);
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
                 * @memberof huskysoft.gotagme.models.Tag
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.models.Tag} Tag
                 */
                Tag.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.models.Tag)
                        return object;
                    var message = new $root.huskysoft.gotagme.models.Tag();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.tag != null)
                        message.tag = String(object.tag);
                    if (object.key != null)
                        message.key = String(object.key);
                    if (object.createdAt != null)
                        if ($util.Long)
                            (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned = false;
                        else if (typeof object.createdAt === "string")
                            message.createdAt = parseInt(object.createdAt, 10);
                        else if (typeof object.createdAt === "number")
                            message.createdAt = object.createdAt;
                        else if (typeof object.createdAt === "object")
                            message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber();
                    if (object.addedBy != null) {
                        if (typeof object.addedBy !== "object")
                            throw TypeError(".huskysoft.gotagme.models.Tag.addedBy: object expected");
                        message.addedBy = $root.huskysoft.gotagme.models.User.fromObject(object.addedBy);
                    }
                    if (object.photo != null) {
                        if (typeof object.photo !== "object")
                            throw TypeError(".huskysoft.gotagme.models.Tag.photo: object expected");
                        message.photo = $root.huskysoft.gotagme.models.Photo.fromObject(object.photo);
                    }
                    if (object.display != null)
                        message.display = String(object.display);
                    if (object.taggedUser != null) {
                        if (typeof object.taggedUser !== "object")
                            throw TypeError(".huskysoft.gotagme.models.Tag.taggedUser: object expected");
                        message.taggedUser = $root.huskysoft.gotagme.models.User.fromObject(object.taggedUser);
                    }
                    if (object.costume != null) {
                        if (typeof object.costume !== "object")
                            throw TypeError(".huskysoft.gotagme.models.Tag.costume: object expected");
                        message.costume = $root.huskysoft.gotagme.models.Costume.fromObject(object.costume);
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
                 * @memberof huskysoft.gotagme.models.Tag
                 * @static
                 * @param {huskysoft.gotagme.models.Tag} message Tag
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
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.createdAt = options.longs === String ? "0" : 0;
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
                        if (typeof message.createdAt === "number")
                            object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
                        else
                            object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber() : message.createdAt;
                    if (message.addedBy != null && message.hasOwnProperty("addedBy"))
                        object.addedBy = $root.huskysoft.gotagme.models.User.toObject(message.addedBy, options);
                    if (message.photo != null && message.hasOwnProperty("photo"))
                        object.photo = $root.huskysoft.gotagme.models.Photo.toObject(message.photo, options);
                    if (message.display != null && message.hasOwnProperty("display"))
                        object.display = message.display;
                    if (message.taggedUser != null && message.hasOwnProperty("taggedUser")) {
                        object.taggedUser = $root.huskysoft.gotagme.models.User.toObject(message.taggedUser, options);
                        if (options.oneofs)
                            object.value = "taggedUser";
                    }
                    if (message.costume != null && message.hasOwnProperty("costume")) {
                        object.costume = $root.huskysoft.gotagme.models.Costume.toObject(message.costume, options);
                        if (options.oneofs)
                            object.value = "costume";
                    }
                    if (message.hashtag != null && message.hasOwnProperty("hashtag")) {
                        object.hashtag = message.hashtag;
                        if (options.oneofs)
                            object.value = "hashtag";
                    }
                    if (message.state != null && message.hasOwnProperty("state"))
                        object.state = options.enums === String ? $root.huskysoft.gotagme.common.ApprovalState[message.state] : message.state;
                    return object;
                };

                /**
                 * Converts this Tag to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.models.Tag
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Tag.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Tag;
            })();

            return models;
        })();

        gotagme.requests = (function() {

            /**
             * Namespace requests.
             * @memberof huskysoft.gotagme
             * @namespace
             */
            var requests = {};

            requests.InsertPhotoRequest = (function() {

                /**
                 * Properties of an InsertPhotoRequest.
                 * @memberof huskysoft.gotagme.requests
                 * @interface IInsertPhotoRequest
                 * @property {string|null} [flickrUrl] InsertPhotoRequest flickrUrl
                 * @property {string|null} [flickrAlbumUrl] InsertPhotoRequest flickrAlbumUrl
                 */

                /**
                 * Constructs a new InsertPhotoRequest.
                 * @memberof huskysoft.gotagme.requests
                 * @classdesc Represents an InsertPhotoRequest.
                 * @implements IInsertPhotoRequest
                 * @constructor
                 * @param {huskysoft.gotagme.requests.IInsertPhotoRequest=} [properties] Properties to set
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
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @instance
                 */
                InsertPhotoRequest.prototype.flickrUrl = "";

                /**
                 * InsertPhotoRequest flickrAlbumUrl.
                 * @member {string} flickrAlbumUrl
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @instance
                 */
                InsertPhotoRequest.prototype.flickrAlbumUrl = "";

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * InsertPhotoRequest url.
                 * @member {"flickrUrl"|"flickrAlbumUrl"|undefined} url
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @instance
                 */
                Object.defineProperty(InsertPhotoRequest.prototype, "url", {
                    get: $util.oneOfGetter($oneOfFields = ["flickrUrl", "flickrAlbumUrl"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new InsertPhotoRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.requests.IInsertPhotoRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.requests.InsertPhotoRequest} InsertPhotoRequest instance
                 */
                InsertPhotoRequest.create = function create(properties) {
                    return new InsertPhotoRequest(properties);
                };

                /**
                 * Encodes the specified InsertPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotoRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.requests.IInsertPhotoRequest} message InsertPhotoRequest message or plain object to encode
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
                 * Encodes the specified InsertPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotoRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.requests.IInsertPhotoRequest} message InsertPhotoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InsertPhotoRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.requests.InsertPhotoRequest} InsertPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InsertPhotoRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.requests.InsertPhotoRequest();
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
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.requests.InsertPhotoRequest} InsertPhotoRequest
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
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
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
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.requests.InsertPhotoRequest} InsertPhotoRequest
                 */
                InsertPhotoRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.requests.InsertPhotoRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.requests.InsertPhotoRequest();
                    if (object.flickrUrl != null)
                        message.flickrUrl = String(object.flickrUrl);
                    if (object.flickrAlbumUrl != null)
                        message.flickrAlbumUrl = String(object.flickrAlbumUrl);
                    return message;
                };

                /**
                 * Creates a plain object from an InsertPhotoRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @static
                 * @param {huskysoft.gotagme.requests.InsertPhotoRequest} message InsertPhotoRequest
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
                 * @memberof huskysoft.gotagme.requests.InsertPhotoRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InsertPhotoRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return InsertPhotoRequest;
            })();

            requests.InsertPhotosRequest = (function() {

                /**
                 * Properties of an InsertPhotosRequest.
                 * @memberof huskysoft.gotagme.requests
                 * @interface IInsertPhotosRequest
                 * @property {Array.<huskysoft.gotagme.requests.IInsertPhotoRequest>|null} [requests] InsertPhotosRequest requests
                 */

                /**
                 * Constructs a new InsertPhotosRequest.
                 * @memberof huskysoft.gotagme.requests
                 * @classdesc Represents an InsertPhotosRequest.
                 * @implements IInsertPhotosRequest
                 * @constructor
                 * @param {huskysoft.gotagme.requests.IInsertPhotosRequest=} [properties] Properties to set
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
                 * @member {Array.<huskysoft.gotagme.requests.IInsertPhotoRequest>} requests
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
                 * @instance
                 */
                InsertPhotosRequest.prototype.requests = $util.emptyArray;

                /**
                 * Creates a new InsertPhotosRequest instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
                 * @static
                 * @param {huskysoft.gotagme.requests.IInsertPhotosRequest=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.requests.InsertPhotosRequest} InsertPhotosRequest instance
                 */
                InsertPhotosRequest.create = function create(properties) {
                    return new InsertPhotosRequest(properties);
                };

                /**
                 * Encodes the specified InsertPhotosRequest message. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotosRequest.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
                 * @static
                 * @param {huskysoft.gotagme.requests.IInsertPhotosRequest} message InsertPhotosRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotosRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.requests != null && message.requests.length)
                        for (var i = 0; i < message.requests.length; ++i)
                            $root.huskysoft.gotagme.requests.InsertPhotoRequest.encode(message.requests[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InsertPhotosRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotosRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
                 * @static
                 * @param {huskysoft.gotagme.requests.IInsertPhotosRequest} message InsertPhotosRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotosRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InsertPhotosRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.requests.InsertPhotosRequest} InsertPhotosRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InsertPhotosRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.requests.InsertPhotosRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.requests && message.requests.length))
                                message.requests = [];
                            message.requests.push($root.huskysoft.gotagme.requests.InsertPhotoRequest.decode(reader, reader.uint32()));
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
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.requests.InsertPhotosRequest} InsertPhotosRequest
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
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
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
                            var error = $root.huskysoft.gotagme.requests.InsertPhotoRequest.verify(message.requests[i]);
                            if (error)
                                return "requests." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an InsertPhotosRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.requests.InsertPhotosRequest} InsertPhotosRequest
                 */
                InsertPhotosRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.requests.InsertPhotosRequest)
                        return object;
                    var message = new $root.huskysoft.gotagme.requests.InsertPhotosRequest();
                    if (object.requests) {
                        if (!Array.isArray(object.requests))
                            throw TypeError(".huskysoft.gotagme.requests.InsertPhotosRequest.requests: array expected");
                        message.requests = [];
                        for (var i = 0; i < object.requests.length; ++i) {
                            if (typeof object.requests[i] !== "object")
                                throw TypeError(".huskysoft.gotagme.requests.InsertPhotosRequest.requests: object expected");
                            message.requests[i] = $root.huskysoft.gotagme.requests.InsertPhotoRequest.fromObject(object.requests[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InsertPhotosRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
                 * @static
                 * @param {huskysoft.gotagme.requests.InsertPhotosRequest} message InsertPhotosRequest
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
                            object.requests[j] = $root.huskysoft.gotagme.requests.InsertPhotoRequest.toObject(message.requests[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this InsertPhotosRequest to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.requests.InsertPhotosRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InsertPhotosRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return InsertPhotosRequest;
            })();

            requests.InsertPhotosResponse = (function() {

                /**
                 * Properties of an InsertPhotosResponse.
                 * @memberof huskysoft.gotagme.requests
                 * @interface IInsertPhotosResponse
                 * @property {huskysoft.gotagme.models.IPhoto|null} [photo] InsertPhotosResponse photo
                 */

                /**
                 * Constructs a new InsertPhotosResponse.
                 * @memberof huskysoft.gotagme.requests
                 * @classdesc Represents an InsertPhotosResponse.
                 * @implements IInsertPhotosResponse
                 * @constructor
                 * @param {huskysoft.gotagme.requests.IInsertPhotosResponse=} [properties] Properties to set
                 */
                function InsertPhotosResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * InsertPhotosResponse photo.
                 * @member {huskysoft.gotagme.models.IPhoto|null|undefined} photo
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @instance
                 */
                InsertPhotosResponse.prototype.photo = null;

                /**
                 * Creates a new InsertPhotosResponse instance using the specified properties.
                 * @function create
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @static
                 * @param {huskysoft.gotagme.requests.IInsertPhotosResponse=} [properties] Properties to set
                 * @returns {huskysoft.gotagme.requests.InsertPhotosResponse} InsertPhotosResponse instance
                 */
                InsertPhotosResponse.create = function create(properties) {
                    return new InsertPhotosResponse(properties);
                };

                /**
                 * Encodes the specified InsertPhotosResponse message. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotosResponse.verify|verify} messages.
                 * @function encode
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @static
                 * @param {huskysoft.gotagme.requests.IInsertPhotosResponse} message InsertPhotosResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotosResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.photo != null && message.hasOwnProperty("photo"))
                        $root.huskysoft.gotagme.models.Photo.encode(message.photo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified InsertPhotosResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotosResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @static
                 * @param {huskysoft.gotagme.requests.IInsertPhotosResponse} message InsertPhotosResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InsertPhotosResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an InsertPhotosResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {huskysoft.gotagme.requests.InsertPhotosResponse} InsertPhotosResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InsertPhotosResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.huskysoft.gotagme.requests.InsertPhotosResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.photo = $root.huskysoft.gotagme.models.Photo.decode(reader, reader.uint32());
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
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {huskysoft.gotagme.requests.InsertPhotosResponse} InsertPhotosResponse
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
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InsertPhotosResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.photo != null && message.hasOwnProperty("photo")) {
                        var error = $root.huskysoft.gotagme.models.Photo.verify(message.photo);
                        if (error)
                            return "photo." + error;
                    }
                    return null;
                };

                /**
                 * Creates an InsertPhotosResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {huskysoft.gotagme.requests.InsertPhotosResponse} InsertPhotosResponse
                 */
                InsertPhotosResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.huskysoft.gotagme.requests.InsertPhotosResponse)
                        return object;
                    var message = new $root.huskysoft.gotagme.requests.InsertPhotosResponse();
                    if (object.photo != null) {
                        if (typeof object.photo !== "object")
                            throw TypeError(".huskysoft.gotagme.requests.InsertPhotosResponse.photo: object expected");
                        message.photo = $root.huskysoft.gotagme.models.Photo.fromObject(object.photo);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an InsertPhotosResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @static
                 * @param {huskysoft.gotagme.requests.InsertPhotosResponse} message InsertPhotosResponse
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
                        object.photo = $root.huskysoft.gotagme.models.Photo.toObject(message.photo, options);
                    return object;
                };

                /**
                 * Converts this InsertPhotosResponse to JSON.
                 * @function toJSON
                 * @memberof huskysoft.gotagme.requests.InsertPhotosResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InsertPhotosResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return InsertPhotosResponse;
            })();

            return requests;
        })();

        return gotagme;
    })();

    return huskysoft;
})();

module.exports = $root;
