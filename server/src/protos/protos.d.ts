import * as $protobuf from "protobufjs";

/** Namespace huskysoft. */
export namespace huskysoft {

    /** Namespace gotagme. */
    namespace gotagme {

        /** Namespace common. */
        namespace common {

            /** ApprovalState enum. */
            enum ApprovalState {
                NEW = 0,
                APPROVED = 1,
                REJECTED = 2
            }

            /** Properties of an ApprovalStatus. */
            interface IApprovalStatus {

                /** ApprovalStatus state */
                state?: (huskysoft.gotagme.common.ApprovalState|null);

                /** ApprovalStatus setBy */
                setBy?: (huskysoft.gotagme.models.IUser|null);

                /** ApprovalStatus createdAt */
                createdAt?: (number|Long|null);
            }

            /** Represents an ApprovalStatus. */
            class ApprovalStatus implements IApprovalStatus {

                /**
                 * Constructs a new ApprovalStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.common.IApprovalStatus);

                /** ApprovalStatus state. */
                public state: huskysoft.gotagme.common.ApprovalState;

                /** ApprovalStatus setBy. */
                public setBy?: (huskysoft.gotagme.models.IUser|null);

                /** ApprovalStatus createdAt. */
                public createdAt: (number|Long);

                /**
                 * Creates a new ApprovalStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ApprovalStatus instance
                 */
                public static create(properties?: huskysoft.gotagme.common.IApprovalStatus): huskysoft.gotagme.common.ApprovalStatus;

                /**
                 * Encodes the specified ApprovalStatus message. Does not implicitly {@link huskysoft.gotagme.common.ApprovalStatus.verify|verify} messages.
                 * @param message ApprovalStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.common.IApprovalStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ApprovalStatus message, length delimited. Does not implicitly {@link huskysoft.gotagme.common.ApprovalStatus.verify|verify} messages.
                 * @param message ApprovalStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.common.IApprovalStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ApprovalStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ApprovalStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.common.ApprovalStatus;

                /**
                 * Decodes an ApprovalStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ApprovalStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.common.ApprovalStatus;

                /**
                 * Verifies an ApprovalStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ApprovalStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ApprovalStatus
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.common.ApprovalStatus;

                /**
                 * Creates a plain object from an ApprovalStatus message. Also converts values to other types if specified.
                 * @param message ApprovalStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.common.ApprovalStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ApprovalStatus to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Namespace models. */
        namespace models {

            /** Properties of a Costume. */
            interface ICostume {

                /** Costume id */
                id?: (string|null);

                /** Costume name */
                name?: (string|null);

                /** Costume owner */
                owner?: (huskysoft.gotagme.models.IUser|null);
            }

            /** Represents a Costume. */
            class Costume implements ICostume {

                /**
                 * Constructs a new Costume.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.models.ICostume);

                /** Costume id. */
                public id: string;

                /** Costume name. */
                public name: string;

                /** Costume owner. */
                public owner?: (huskysoft.gotagme.models.IUser|null);

                /**
                 * Creates a new Costume instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Costume instance
                 */
                public static create(properties?: huskysoft.gotagme.models.ICostume): huskysoft.gotagme.models.Costume;

                /**
                 * Encodes the specified Costume message. Does not implicitly {@link huskysoft.gotagme.models.Costume.verify|verify} messages.
                 * @param message Costume message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.models.ICostume, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Costume message, length delimited. Does not implicitly {@link huskysoft.gotagme.models.Costume.verify|verify} messages.
                 * @param message Costume message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.models.ICostume, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Costume message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Costume
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.models.Costume;

                /**
                 * Decodes a Costume message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Costume
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.models.Costume;

                /**
                 * Verifies a Costume message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Costume message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Costume
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.models.Costume;

                /**
                 * Creates a plain object from a Costume message. Also converts values to other types if specified.
                 * @param message Costume
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.models.Costume, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Costume to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Photo. */
            interface IPhoto {

                /** Photo id */
                id?: (string|null);

                /** Photo postedBy */
                postedBy?: (huskysoft.gotagme.models.IUser|null);

                /** Photo capturedBy */
                capturedBy?: (huskysoft.gotagme.models.IUser|null);

                /** Photo capturedAt */
                capturedAt?: (number|Long|null);

                /** Photo state */
                state?: (huskysoft.gotagme.common.ApprovalState|null);

                /** Photo externalUrl */
                externalUrl?: (string|null);

                /** Photo smallImageUrl */
                smallImageUrl?: (string|null);

                /** Photo largeImageUrl */
                largeImageUrl?: (string|null);

                /** Photo xlargeImageUrl */
                xlargeImageUrl?: (string|null);

                /** Photo title */
                title?: (string|null);

                /** Photo description */
                description?: (string|null);
            }

            /** Represents a Photo. */
            class Photo implements IPhoto {

                /**
                 * Constructs a new Photo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.models.IPhoto);

                /** Photo id. */
                public id: string;

                /** Photo postedBy. */
                public postedBy?: (huskysoft.gotagme.models.IUser|null);

                /** Photo capturedBy. */
                public capturedBy?: (huskysoft.gotagme.models.IUser|null);

                /** Photo capturedAt. */
                public capturedAt: (number|Long);

                /** Photo state. */
                public state: huskysoft.gotagme.common.ApprovalState;

                /** Photo externalUrl. */
                public externalUrl: string;

                /** Photo smallImageUrl. */
                public smallImageUrl: string;

                /** Photo largeImageUrl. */
                public largeImageUrl: string;

                /** Photo xlargeImageUrl. */
                public xlargeImageUrl: string;

                /** Photo title. */
                public title: string;

                /** Photo description. */
                public description: string;

                /**
                 * Creates a new Photo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Photo instance
                 */
                public static create(properties?: huskysoft.gotagme.models.IPhoto): huskysoft.gotagme.models.Photo;

                /**
                 * Encodes the specified Photo message. Does not implicitly {@link huskysoft.gotagme.models.Photo.verify|verify} messages.
                 * @param message Photo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.models.IPhoto, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Photo message, length delimited. Does not implicitly {@link huskysoft.gotagme.models.Photo.verify|verify} messages.
                 * @param message Photo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.models.IPhoto, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Photo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Photo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.models.Photo;

                /**
                 * Decodes a Photo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Photo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.models.Photo;

                /**
                 * Verifies a Photo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Photo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Photo
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.models.Photo;

                /**
                 * Creates a plain object from a Photo message. Also converts values to other types if specified.
                 * @param message Photo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.models.Photo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Photo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a User. */
            interface IUser {

                /** User id */
                id?: (string|null);

                /** User displayName */
                displayName?: (string|null);
            }

            /** Represents a User. */
            class User implements IUser {

                /**
                 * Constructs a new User.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.models.IUser);

                /** User id. */
                public id: string;

                /** User displayName. */
                public displayName: string;

                /**
                 * Creates a new User instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns User instance
                 */
                public static create(properties?: huskysoft.gotagme.models.IUser): huskysoft.gotagme.models.User;

                /**
                 * Encodes the specified User message. Does not implicitly {@link huskysoft.gotagme.models.User.verify|verify} messages.
                 * @param message User message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.models.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified User message, length delimited. Does not implicitly {@link huskysoft.gotagme.models.User.verify|verify} messages.
                 * @param message User message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.models.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a User message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.models.User;

                /**
                 * Decodes a User message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.models.User;

                /**
                 * Verifies a User message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a User message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns User
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.models.User;

                /**
                 * Creates a plain object from a User message. Also converts values to other types if specified.
                 * @param message User
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.models.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this User to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Tag. */
            interface ITag {

                /** Tag id */
                id?: (string|null);

                /** Tag tag */
                tag?: (string|null);

                /** Tag key */
                key?: (string|null);

                /** Tag createdAt */
                createdAt?: (number|Long|null);

                /** Tag addedBy */
                addedBy?: (huskysoft.gotagme.models.IUser|null);

                /** Tag photo */
                photo?: (huskysoft.gotagme.models.IPhoto|null);

                /** Tag display */
                display?: (string|null);

                /** Tag taggedUser */
                taggedUser?: (huskysoft.gotagme.models.IUser|null);

                /** Tag costume */
                costume?: (huskysoft.gotagme.models.ICostume|null);

                /** Tag hashtag */
                hashtag?: (string|null);

                /** Tag state */
                state?: (huskysoft.gotagme.common.ApprovalState|null);
            }

            /** Represents a Tag. */
            class Tag implements ITag {

                /**
                 * Constructs a new Tag.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.models.ITag);

                /** Tag id. */
                public id: string;

                /** Tag tag. */
                public tag: string;

                /** Tag key. */
                public key: string;

                /** Tag createdAt. */
                public createdAt: (number|Long);

                /** Tag addedBy. */
                public addedBy?: (huskysoft.gotagme.models.IUser|null);

                /** Tag photo. */
                public photo?: (huskysoft.gotagme.models.IPhoto|null);

                /** Tag display. */
                public display: string;

                /** Tag taggedUser. */
                public taggedUser?: (huskysoft.gotagme.models.IUser|null);

                /** Tag costume. */
                public costume?: (huskysoft.gotagme.models.ICostume|null);

                /** Tag hashtag. */
                public hashtag: string;

                /** Tag state. */
                public state: huskysoft.gotagme.common.ApprovalState;

                /** Tag value. */
                public value?: ("taggedUser"|"costume"|"hashtag");

                /**
                 * Creates a new Tag instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Tag instance
                 */
                public static create(properties?: huskysoft.gotagme.models.ITag): huskysoft.gotagme.models.Tag;

                /**
                 * Encodes the specified Tag message. Does not implicitly {@link huskysoft.gotagme.models.Tag.verify|verify} messages.
                 * @param message Tag message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.models.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Tag message, length delimited. Does not implicitly {@link huskysoft.gotagme.models.Tag.verify|verify} messages.
                 * @param message Tag message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.models.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Tag message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Tag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.models.Tag;

                /**
                 * Decodes a Tag message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Tag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.models.Tag;

                /**
                 * Verifies a Tag message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Tag message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Tag
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.models.Tag;

                /**
                 * Creates a plain object from a Tag message. Also converts values to other types if specified.
                 * @param message Tag
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.models.Tag, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Tag to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Namespace requests. */
        namespace requests {

            /** Properties of an InsertPhotoRequest. */
            interface IInsertPhotoRequest {

                /** InsertPhotoRequest flickrUrl */
                flickrUrl?: (string|null);

                /** InsertPhotoRequest flickrAlbumUrl */
                flickrAlbumUrl?: (string|null);
            }

            /** Represents an InsertPhotoRequest. */
            class InsertPhotoRequest implements IInsertPhotoRequest {

                /**
                 * Constructs a new InsertPhotoRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.requests.IInsertPhotoRequest);

                /** InsertPhotoRequest flickrUrl. */
                public flickrUrl: string;

                /** InsertPhotoRequest flickrAlbumUrl. */
                public flickrAlbumUrl: string;

                /** InsertPhotoRequest url. */
                public url?: ("flickrUrl"|"flickrAlbumUrl");

                /**
                 * Creates a new InsertPhotoRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InsertPhotoRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.requests.IInsertPhotoRequest): huskysoft.gotagme.requests.InsertPhotoRequest;

                /**
                 * Encodes the specified InsertPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotoRequest.verify|verify} messages.
                 * @param message InsertPhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.requests.IInsertPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InsertPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotoRequest.verify|verify} messages.
                 * @param message InsertPhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.requests.IInsertPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InsertPhotoRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InsertPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.requests.InsertPhotoRequest;

                /**
                 * Decodes an InsertPhotoRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InsertPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.requests.InsertPhotoRequest;

                /**
                 * Verifies an InsertPhotoRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an InsertPhotoRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns InsertPhotoRequest
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.requests.InsertPhotoRequest;

                /**
                 * Creates a plain object from an InsertPhotoRequest message. Also converts values to other types if specified.
                 * @param message InsertPhotoRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.requests.InsertPhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InsertPhotoRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an InsertPhotosRequest. */
            interface IInsertPhotosRequest {

                /** InsertPhotosRequest requests */
                requests?: (huskysoft.gotagme.requests.IInsertPhotoRequest[]|null);
            }

            /** Represents an InsertPhotosRequest. */
            class InsertPhotosRequest implements IInsertPhotosRequest {

                /**
                 * Constructs a new InsertPhotosRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.requests.IInsertPhotosRequest);

                /** InsertPhotosRequest requests. */
                public requests: huskysoft.gotagme.requests.IInsertPhotoRequest[];

                /**
                 * Creates a new InsertPhotosRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InsertPhotosRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.requests.IInsertPhotosRequest): huskysoft.gotagme.requests.InsertPhotosRequest;

                /**
                 * Encodes the specified InsertPhotosRequest message. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotosRequest.verify|verify} messages.
                 * @param message InsertPhotosRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.requests.IInsertPhotosRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InsertPhotosRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotosRequest.verify|verify} messages.
                 * @param message InsertPhotosRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.requests.IInsertPhotosRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InsertPhotosRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InsertPhotosRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.requests.InsertPhotosRequest;

                /**
                 * Decodes an InsertPhotosRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InsertPhotosRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.requests.InsertPhotosRequest;

                /**
                 * Verifies an InsertPhotosRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an InsertPhotosRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns InsertPhotosRequest
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.requests.InsertPhotosRequest;

                /**
                 * Creates a plain object from an InsertPhotosRequest message. Also converts values to other types if specified.
                 * @param message InsertPhotosRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.requests.InsertPhotosRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InsertPhotosRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an InsertPhotosResponse. */
            interface IInsertPhotosResponse {

                /** InsertPhotosResponse photo */
                photo?: (huskysoft.gotagme.models.IPhoto|null);
            }

            /** Represents an InsertPhotosResponse. */
            class InsertPhotosResponse implements IInsertPhotosResponse {

                /**
                 * Constructs a new InsertPhotosResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.requests.IInsertPhotosResponse);

                /** InsertPhotosResponse photo. */
                public photo?: (huskysoft.gotagme.models.IPhoto|null);

                /**
                 * Creates a new InsertPhotosResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InsertPhotosResponse instance
                 */
                public static create(properties?: huskysoft.gotagme.requests.IInsertPhotosResponse): huskysoft.gotagme.requests.InsertPhotosResponse;

                /**
                 * Encodes the specified InsertPhotosResponse message. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotosResponse.verify|verify} messages.
                 * @param message InsertPhotosResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.requests.IInsertPhotosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InsertPhotosResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.requests.InsertPhotosResponse.verify|verify} messages.
                 * @param message InsertPhotosResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.requests.IInsertPhotosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InsertPhotosResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InsertPhotosResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.requests.InsertPhotosResponse;

                /**
                 * Decodes an InsertPhotosResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InsertPhotosResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.requests.InsertPhotosResponse;

                /**
                 * Verifies an InsertPhotosResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an InsertPhotosResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns InsertPhotosResponse
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.requests.InsertPhotosResponse;

                /**
                 * Creates a plain object from an InsertPhotosResponse message. Also converts values to other types if specified.
                 * @param message InsertPhotosResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.requests.InsertPhotosResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InsertPhotosResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
