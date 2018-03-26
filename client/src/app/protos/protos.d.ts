import * as $protobuf from "protobufjs";

/** Namespace huskysoft. */
export namespace huskysoft {

    /** Namespace gotagme. */
    namespace gotagme {

        /** ApprovalState enum. */
        enum ApprovalState {
            NEW = 0,
            APPROVED = 1,
            REJECTED = 2
        }

        /** Properties of an ApprovalStatus. */
        interface IApprovalStatus {

            /** ApprovalStatus state */
            state?: (huskysoft.gotagme.ApprovalState|null);

            /** ApprovalStatus setBy */
            setBy?: (huskysoft.gotagme.IUser|null);

            /** ApprovalStatus createdAt */
            createdAt?: (number|null);
        }

        /** Represents an ApprovalStatus. */
        class ApprovalStatus implements IApprovalStatus {

            /**
             * Constructs a new ApprovalStatus.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IApprovalStatus);

            /** ApprovalStatus state. */
            public state: huskysoft.gotagme.ApprovalState;

            /** ApprovalStatus setBy. */
            public setBy?: (huskysoft.gotagme.IUser|null);

            /** ApprovalStatus createdAt. */
            public createdAt: number;

            /**
             * Creates a new ApprovalStatus instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ApprovalStatus instance
             */
            public static create(properties?: huskysoft.gotagme.IApprovalStatus): huskysoft.gotagme.ApprovalStatus;

            /**
             * Encodes the specified ApprovalStatus message. Does not implicitly {@link huskysoft.gotagme.ApprovalStatus.verify|verify} messages.
             * @param message ApprovalStatus message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IApprovalStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ApprovalStatus message, length delimited. Does not implicitly {@link huskysoft.gotagme.ApprovalStatus.verify|verify} messages.
             * @param message ApprovalStatus message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IApprovalStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ApprovalStatus message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ApprovalStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.ApprovalStatus;

            /**
             * Decodes an ApprovalStatus message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ApprovalStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.ApprovalStatus;

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
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.ApprovalStatus;

            /**
             * Creates a plain object from an ApprovalStatus message. Also converts values to other types if specified.
             * @param message ApprovalStatus
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.ApprovalStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ApprovalStatus to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Costume. */
        interface ICostume {

            /** Costume id */
            id?: (string|null);

            /** Costume name */
            name?: (string|null);

            /** Costume owner */
            owner?: (huskysoft.gotagme.IUser|null);
        }

        /** Represents a Costume. */
        class Costume implements ICostume {

            /**
             * Constructs a new Costume.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.ICostume);

            /** Costume id. */
            public id: string;

            /** Costume name. */
            public name: string;

            /** Costume owner. */
            public owner?: (huskysoft.gotagme.IUser|null);

            /**
             * Creates a new Costume instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Costume instance
             */
            public static create(properties?: huskysoft.gotagme.ICostume): huskysoft.gotagme.Costume;

            /**
             * Encodes the specified Costume message. Does not implicitly {@link huskysoft.gotagme.Costume.verify|verify} messages.
             * @param message Costume message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.ICostume, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Costume message, length delimited. Does not implicitly {@link huskysoft.gotagme.Costume.verify|verify} messages.
             * @param message Costume message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.ICostume, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Costume message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Costume
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.Costume;

            /**
             * Decodes a Costume message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Costume
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.Costume;

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
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.Costume;

            /**
             * Creates a plain object from a Costume message. Also converts values to other types if specified.
             * @param message Costume
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.Costume, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Costume to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EditCostumeRequest. */
        interface IEditCostumeRequest {

            /** EditCostumeRequest name */
            name?: (string|null);

            /** EditCostumeRequest ownerID */
            ownerID?: (string|null);
        }

        /** Represents an EditCostumeRequest. */
        class EditCostumeRequest implements IEditCostumeRequest {

            /**
             * Constructs a new EditCostumeRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IEditCostumeRequest);

            /** EditCostumeRequest name. */
            public name: string;

            /** EditCostumeRequest ownerID. */
            public ownerID: string;

            /**
             * Creates a new EditCostumeRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EditCostumeRequest instance
             */
            public static create(properties?: huskysoft.gotagme.IEditCostumeRequest): huskysoft.gotagme.EditCostumeRequest;

            /**
             * Encodes the specified EditCostumeRequest message. Does not implicitly {@link huskysoft.gotagme.EditCostumeRequest.verify|verify} messages.
             * @param message EditCostumeRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IEditCostumeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EditCostumeRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.EditCostumeRequest.verify|verify} messages.
             * @param message EditCostumeRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IEditCostumeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EditCostumeRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EditCostumeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.EditCostumeRequest;

            /**
             * Decodes an EditCostumeRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EditCostumeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.EditCostumeRequest;

            /**
             * Verifies an EditCostumeRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EditCostumeRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EditCostumeRequest
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.EditCostumeRequest;

            /**
             * Creates a plain object from an EditCostumeRequest message. Also converts values to other types if specified.
             * @param message EditCostumeRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.EditCostumeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EditCostumeRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Photo. */
        interface IPhoto {

            /** Photo id */
            id?: (string|null);

            /** Photo postedBy */
            postedBy?: (huskysoft.gotagme.IUser|null);

            /** Photo capturedBy */
            capturedBy?: (huskysoft.gotagme.IUser|null);

            /** Photo capturedAt */
            capturedAt?: (number|null);

            /** Photo state */
            state?: (huskysoft.gotagme.ApprovalState|null);

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
            constructor(properties?: huskysoft.gotagme.IPhoto);

            /** Photo id. */
            public id: string;

            /** Photo postedBy. */
            public postedBy?: (huskysoft.gotagme.IUser|null);

            /** Photo capturedBy. */
            public capturedBy?: (huskysoft.gotagme.IUser|null);

            /** Photo capturedAt. */
            public capturedAt: number;

            /** Photo state. */
            public state: huskysoft.gotagme.ApprovalState;

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
            public static create(properties?: huskysoft.gotagme.IPhoto): huskysoft.gotagme.Photo;

            /**
             * Encodes the specified Photo message. Does not implicitly {@link huskysoft.gotagme.Photo.verify|verify} messages.
             * @param message Photo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IPhoto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Photo message, length delimited. Does not implicitly {@link huskysoft.gotagme.Photo.verify|verify} messages.
             * @param message Photo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IPhoto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Photo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Photo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.Photo;

            /**
             * Decodes a Photo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Photo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.Photo;

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
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.Photo;

            /**
             * Creates a plain object from a Photo message. Also converts values to other types if specified.
             * @param message Photo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.Photo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Photo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetPhotoRequest. */
        interface IGetPhotoRequest {

            /** GetPhotoRequest id */
            id?: (string|null);

            /** GetPhotoRequest page */
            page?: (number|null);
        }

        /** Represents a GetPhotoRequest. */
        class GetPhotoRequest implements IGetPhotoRequest {

            /**
             * Constructs a new GetPhotoRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IGetPhotoRequest);

            /** GetPhotoRequest id. */
            public id: string;

            /** GetPhotoRequest page. */
            public page: number;

            /** GetPhotoRequest key. */
            public key?: ("id"|"page");

            /**
             * Creates a new GetPhotoRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetPhotoRequest instance
             */
            public static create(properties?: huskysoft.gotagme.IGetPhotoRequest): huskysoft.gotagme.GetPhotoRequest;

            /**
             * Encodes the specified GetPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.GetPhotoRequest.verify|verify} messages.
             * @param message GetPhotoRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IGetPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.GetPhotoRequest.verify|verify} messages.
             * @param message GetPhotoRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IGetPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetPhotoRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetPhotoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.GetPhotoRequest;

            /**
             * Decodes a GetPhotoRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetPhotoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.GetPhotoRequest;

            /**
             * Verifies a GetPhotoRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetPhotoRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetPhotoRequest
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.GetPhotoRequest;

            /**
             * Creates a plain object from a GetPhotoRequest message. Also converts values to other types if specified.
             * @param message GetPhotoRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.GetPhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetPhotoRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetPhotoResponse. */
        interface IGetPhotoResponse {

            /** GetPhotoResponse photos */
            photos?: (huskysoft.gotagme.IPhoto[]|null);
        }

        /** Represents a GetPhotoResponse. */
        class GetPhotoResponse implements IGetPhotoResponse {

            /**
             * Constructs a new GetPhotoResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IGetPhotoResponse);

            /** GetPhotoResponse photos. */
            public photos: huskysoft.gotagme.IPhoto[];

            /**
             * Creates a new GetPhotoResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetPhotoResponse instance
             */
            public static create(properties?: huskysoft.gotagme.IGetPhotoResponse): huskysoft.gotagme.GetPhotoResponse;

            /**
             * Encodes the specified GetPhotoResponse message. Does not implicitly {@link huskysoft.gotagme.GetPhotoResponse.verify|verify} messages.
             * @param message GetPhotoResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IGetPhotoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetPhotoResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.GetPhotoResponse.verify|verify} messages.
             * @param message GetPhotoResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IGetPhotoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetPhotoResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetPhotoResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.GetPhotoResponse;

            /**
             * Decodes a GetPhotoResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetPhotoResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.GetPhotoResponse;

            /**
             * Verifies a GetPhotoResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetPhotoResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetPhotoResponse
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.GetPhotoResponse;

            /**
             * Creates a plain object from a GetPhotoResponse message. Also converts values to other types if specified.
             * @param message GetPhotoResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.GetPhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetPhotoResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

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
            constructor(properties?: huskysoft.gotagme.IInsertPhotoRequest);

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
            public static create(properties?: huskysoft.gotagme.IInsertPhotoRequest): huskysoft.gotagme.InsertPhotoRequest;

            /**
             * Encodes the specified InsertPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.InsertPhotoRequest.verify|verify} messages.
             * @param message InsertPhotoRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IInsertPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InsertPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.InsertPhotoRequest.verify|verify} messages.
             * @param message InsertPhotoRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IInsertPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InsertPhotoRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InsertPhotoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.InsertPhotoRequest;

            /**
             * Decodes an InsertPhotoRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InsertPhotoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.InsertPhotoRequest;

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
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.InsertPhotoRequest;

            /**
             * Creates a plain object from an InsertPhotoRequest message. Also converts values to other types if specified.
             * @param message InsertPhotoRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.InsertPhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this InsertPhotoRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an InsertPhotosRequest. */
        interface IInsertPhotosRequest {

            /** InsertPhotosRequest requests */
            requests?: (huskysoft.gotagme.IInsertPhotoRequest[]|null);
        }

        /** Represents an InsertPhotosRequest. */
        class InsertPhotosRequest implements IInsertPhotosRequest {

            /**
             * Constructs a new InsertPhotosRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IInsertPhotosRequest);

            /** InsertPhotosRequest requests. */
            public requests: huskysoft.gotagme.IInsertPhotoRequest[];

            /**
             * Creates a new InsertPhotosRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InsertPhotosRequest instance
             */
            public static create(properties?: huskysoft.gotagme.IInsertPhotosRequest): huskysoft.gotagme.InsertPhotosRequest;

            /**
             * Encodes the specified InsertPhotosRequest message. Does not implicitly {@link huskysoft.gotagme.InsertPhotosRequest.verify|verify} messages.
             * @param message InsertPhotosRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IInsertPhotosRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InsertPhotosRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.InsertPhotosRequest.verify|verify} messages.
             * @param message InsertPhotosRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IInsertPhotosRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InsertPhotosRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InsertPhotosRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.InsertPhotosRequest;

            /**
             * Decodes an InsertPhotosRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InsertPhotosRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.InsertPhotosRequest;

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
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.InsertPhotosRequest;

            /**
             * Creates a plain object from an InsertPhotosRequest message. Also converts values to other types if specified.
             * @param message InsertPhotosRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.InsertPhotosRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this InsertPhotosRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an InsertPhotosResponse. */
        interface IInsertPhotosResponse {

            /** InsertPhotosResponse photo */
            photo?: (huskysoft.gotagme.IPhoto|null);
        }

        /** Represents an InsertPhotosResponse. */
        class InsertPhotosResponse implements IInsertPhotosResponse {

            /**
             * Constructs a new InsertPhotosResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IInsertPhotosResponse);

            /** InsertPhotosResponse photo. */
            public photo?: (huskysoft.gotagme.IPhoto|null);

            /**
             * Creates a new InsertPhotosResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns InsertPhotosResponse instance
             */
            public static create(properties?: huskysoft.gotagme.IInsertPhotosResponse): huskysoft.gotagme.InsertPhotosResponse;

            /**
             * Encodes the specified InsertPhotosResponse message. Does not implicitly {@link huskysoft.gotagme.InsertPhotosResponse.verify|verify} messages.
             * @param message InsertPhotosResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IInsertPhotosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified InsertPhotosResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.InsertPhotosResponse.verify|verify} messages.
             * @param message InsertPhotosResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IInsertPhotosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an InsertPhotosResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns InsertPhotosResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.InsertPhotosResponse;

            /**
             * Decodes an InsertPhotosResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns InsertPhotosResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.InsertPhotosResponse;

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
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.InsertPhotosResponse;

            /**
             * Creates a plain object from an InsertPhotosResponse message. Also converts values to other types if specified.
             * @param message InsertPhotosResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.InsertPhotosResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this InsertPhotosResponse to JSON.
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
            constructor(properties?: huskysoft.gotagme.IUser);

            /** User id. */
            public id: string;

            /** User displayName. */
            public displayName: string;

            /**
             * Creates a new User instance using the specified properties.
             * @param [properties] Properties to set
             * @returns User instance
             */
            public static create(properties?: huskysoft.gotagme.IUser): huskysoft.gotagme.User;

            /**
             * Encodes the specified User message. Does not implicitly {@link huskysoft.gotagme.User.verify|verify} messages.
             * @param message User message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified User message, length delimited. Does not implicitly {@link huskysoft.gotagme.User.verify|verify} messages.
             * @param message User message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a User message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.User;

            /**
             * Decodes a User message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.User;

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
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.User;

            /**
             * Creates a plain object from a User message. Also converts values to other types if specified.
             * @param message User
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this User to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TagAutocompleteRequest. */
        interface ITagAutocompleteRequest {

            /** TagAutocompleteRequest term */
            term?: (string|null);
        }

        /** Represents a TagAutocompleteRequest. */
        class TagAutocompleteRequest implements ITagAutocompleteRequest {

            /**
             * Constructs a new TagAutocompleteRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.ITagAutocompleteRequest);

            /** TagAutocompleteRequest term. */
            public term: string;

            /**
             * Creates a new TagAutocompleteRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TagAutocompleteRequest instance
             */
            public static create(properties?: huskysoft.gotagme.ITagAutocompleteRequest): huskysoft.gotagme.TagAutocompleteRequest;

            /**
             * Encodes the specified TagAutocompleteRequest message. Does not implicitly {@link huskysoft.gotagme.TagAutocompleteRequest.verify|verify} messages.
             * @param message TagAutocompleteRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.ITagAutocompleteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TagAutocompleteRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.TagAutocompleteRequest.verify|verify} messages.
             * @param message TagAutocompleteRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.ITagAutocompleteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TagAutocompleteRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TagAutocompleteRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.TagAutocompleteRequest;

            /**
             * Decodes a TagAutocompleteRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TagAutocompleteRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.TagAutocompleteRequest;

            /**
             * Verifies a TagAutocompleteRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TagAutocompleteRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TagAutocompleteRequest
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.TagAutocompleteRequest;

            /**
             * Creates a plain object from a TagAutocompleteRequest message. Also converts values to other types if specified.
             * @param message TagAutocompleteRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.TagAutocompleteRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TagAutocompleteRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TagAutocompleteResponse. */
        interface ITagAutocompleteResponse {

            /** TagAutocompleteResponse tags */
            tags?: (huskysoft.gotagme.ITag[]|null);
        }

        /** Represents a TagAutocompleteResponse. */
        class TagAutocompleteResponse implements ITagAutocompleteResponse {

            /**
             * Constructs a new TagAutocompleteResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.ITagAutocompleteResponse);

            /** TagAutocompleteResponse tags. */
            public tags: huskysoft.gotagme.ITag[];

            /**
             * Creates a new TagAutocompleteResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TagAutocompleteResponse instance
             */
            public static create(properties?: huskysoft.gotagme.ITagAutocompleteResponse): huskysoft.gotagme.TagAutocompleteResponse;

            /**
             * Encodes the specified TagAutocompleteResponse message. Does not implicitly {@link huskysoft.gotagme.TagAutocompleteResponse.verify|verify} messages.
             * @param message TagAutocompleteResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.ITagAutocompleteResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TagAutocompleteResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.TagAutocompleteResponse.verify|verify} messages.
             * @param message TagAutocompleteResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.ITagAutocompleteResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TagAutocompleteResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TagAutocompleteResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.TagAutocompleteResponse;

            /**
             * Decodes a TagAutocompleteResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TagAutocompleteResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.TagAutocompleteResponse;

            /**
             * Verifies a TagAutocompleteResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TagAutocompleteResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TagAutocompleteResponse
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.TagAutocompleteResponse;

            /**
             * Creates a plain object from a TagAutocompleteResponse message. Also converts values to other types if specified.
             * @param message TagAutocompleteResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.TagAutocompleteResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TagAutocompleteResponse to JSON.
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
            createdAt?: (number|null);

            /** Tag addedBy */
            addedBy?: (huskysoft.gotagme.IUser|null);

            /** Tag photo */
            photo?: (huskysoft.gotagme.IPhoto|null);

            /** Tag display */
            display?: (string|null);

            /** Tag taggedUser */
            taggedUser?: (huskysoft.gotagme.IUser|null);

            /** Tag costume */
            costume?: (huskysoft.gotagme.ICostume|null);

            /** Tag hashtag */
            hashtag?: (string|null);

            /** Tag state */
            state?: (huskysoft.gotagme.ApprovalState|null);
        }

        /** Represents a Tag. */
        class Tag implements ITag {

            /**
             * Constructs a new Tag.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.ITag);

            /** Tag id. */
            public id: string;

            /** Tag tag. */
            public tag: string;

            /** Tag key. */
            public key: string;

            /** Tag createdAt. */
            public createdAt: number;

            /** Tag addedBy. */
            public addedBy?: (huskysoft.gotagme.IUser|null);

            /** Tag photo. */
            public photo?: (huskysoft.gotagme.IPhoto|null);

            /** Tag display. */
            public display: string;

            /** Tag taggedUser. */
            public taggedUser?: (huskysoft.gotagme.IUser|null);

            /** Tag costume. */
            public costume?: (huskysoft.gotagme.ICostume|null);

            /** Tag hashtag. */
            public hashtag: string;

            /** Tag state. */
            public state: huskysoft.gotagme.ApprovalState;

            /** Tag value. */
            public value?: ("taggedUser"|"costume"|"hashtag");

            /**
             * Creates a new Tag instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Tag instance
             */
            public static create(properties?: huskysoft.gotagme.ITag): huskysoft.gotagme.Tag;

            /**
             * Encodes the specified Tag message. Does not implicitly {@link huskysoft.gotagme.Tag.verify|verify} messages.
             * @param message Tag message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Tag message, length delimited. Does not implicitly {@link huskysoft.gotagme.Tag.verify|verify} messages.
             * @param message Tag message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Tag message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Tag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.Tag;

            /**
             * Decodes a Tag message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Tag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.Tag;

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
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.Tag;

            /**
             * Creates a plain object from a Tag message. Also converts values to other types if specified.
             * @param message Tag
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.Tag, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Tag to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AddTagsToPhotoRequest. */
        interface IAddTagsToPhotoRequest {

            /** AddTagsToPhotoRequest tags */
            tags?: (huskysoft.gotagme.ITag[]|null);

            /** AddTagsToPhotoRequest capturedBy */
            capturedBy?: (huskysoft.gotagme.ITag|null);
        }

        /** Represents an AddTagsToPhotoRequest. */
        class AddTagsToPhotoRequest implements IAddTagsToPhotoRequest {

            /**
             * Constructs a new AddTagsToPhotoRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IAddTagsToPhotoRequest);

            /** AddTagsToPhotoRequest tags. */
            public tags: huskysoft.gotagme.ITag[];

            /** AddTagsToPhotoRequest capturedBy. */
            public capturedBy?: (huskysoft.gotagme.ITag|null);

            /**
             * Creates a new AddTagsToPhotoRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AddTagsToPhotoRequest instance
             */
            public static create(properties?: huskysoft.gotagme.IAddTagsToPhotoRequest): huskysoft.gotagme.AddTagsToPhotoRequest;

            /**
             * Encodes the specified AddTagsToPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.AddTagsToPhotoRequest.verify|verify} messages.
             * @param message AddTagsToPhotoRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IAddTagsToPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AddTagsToPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.AddTagsToPhotoRequest.verify|verify} messages.
             * @param message AddTagsToPhotoRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IAddTagsToPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AddTagsToPhotoRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AddTagsToPhotoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.AddTagsToPhotoRequest;

            /**
             * Decodes an AddTagsToPhotoRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AddTagsToPhotoRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.AddTagsToPhotoRequest;

            /**
             * Verifies an AddTagsToPhotoRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AddTagsToPhotoRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AddTagsToPhotoRequest
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.AddTagsToPhotoRequest;

            /**
             * Creates a plain object from an AddTagsToPhotoRequest message. Also converts values to other types if specified.
             * @param message AddTagsToPhotoRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.AddTagsToPhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AddTagsToPhotoRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ModifyTagRequest. */
        interface IModifyTagRequest {

            /** ModifyTagRequest id */
            id?: (string|null);

            /** ModifyTagRequest state */
            state?: (huskysoft.gotagme.ApprovalState|null);
        }

        /** Represents a ModifyTagRequest. */
        class ModifyTagRequest implements IModifyTagRequest {

            /**
             * Constructs a new ModifyTagRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IModifyTagRequest);

            /** ModifyTagRequest id. */
            public id: string;

            /** ModifyTagRequest state. */
            public state: huskysoft.gotagme.ApprovalState;

            /**
             * Creates a new ModifyTagRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ModifyTagRequest instance
             */
            public static create(properties?: huskysoft.gotagme.IModifyTagRequest): huskysoft.gotagme.ModifyTagRequest;

            /**
             * Encodes the specified ModifyTagRequest message. Does not implicitly {@link huskysoft.gotagme.ModifyTagRequest.verify|verify} messages.
             * @param message ModifyTagRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IModifyTagRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ModifyTagRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.ModifyTagRequest.verify|verify} messages.
             * @param message ModifyTagRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IModifyTagRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ModifyTagRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ModifyTagRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.ModifyTagRequest;

            /**
             * Decodes a ModifyTagRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ModifyTagRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.ModifyTagRequest;

            /**
             * Verifies a ModifyTagRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ModifyTagRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ModifyTagRequest
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.ModifyTagRequest;

            /**
             * Creates a plain object from a ModifyTagRequest message. Also converts values to other types if specified.
             * @param message ModifyTagRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.ModifyTagRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ModifyTagRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ModifyTagResponse. */
        interface IModifyTagResponse {

            /** ModifyTagResponse tag */
            tag?: (huskysoft.gotagme.ITag|null);
        }

        /** Represents a ModifyTagResponse. */
        class ModifyTagResponse implements IModifyTagResponse {

            /**
             * Constructs a new ModifyTagResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IModifyTagResponse);

            /** ModifyTagResponse tag. */
            public tag?: (huskysoft.gotagme.ITag|null);

            /**
             * Creates a new ModifyTagResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ModifyTagResponse instance
             */
            public static create(properties?: huskysoft.gotagme.IModifyTagResponse): huskysoft.gotagme.ModifyTagResponse;

            /**
             * Encodes the specified ModifyTagResponse message. Does not implicitly {@link huskysoft.gotagme.ModifyTagResponse.verify|verify} messages.
             * @param message ModifyTagResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IModifyTagResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ModifyTagResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.ModifyTagResponse.verify|verify} messages.
             * @param message ModifyTagResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IModifyTagResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ModifyTagResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ModifyTagResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.ModifyTagResponse;

            /**
             * Decodes a ModifyTagResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ModifyTagResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.ModifyTagResponse;

            /**
             * Verifies a ModifyTagResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ModifyTagResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ModifyTagResponse
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.ModifyTagResponse;

            /**
             * Creates a plain object from a ModifyTagResponse message. Also converts values to other types if specified.
             * @param message ModifyTagResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.ModifyTagResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ModifyTagResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTagsRequest. */
        interface IGetTagsRequest {

            /** GetTagsRequest tagID */
            tagID?: (string|null);

            /** GetTagsRequest photoID */
            photoID?: (string|null);
        }

        /** Represents a GetTagsRequest. */
        class GetTagsRequest implements IGetTagsRequest {

            /**
             * Constructs a new GetTagsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IGetTagsRequest);

            /** GetTagsRequest tagID. */
            public tagID: string;

            /** GetTagsRequest photoID. */
            public photoID: string;

            /** GetTagsRequest id. */
            public id?: ("tagID"|"photoID");

            /**
             * Creates a new GetTagsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetTagsRequest instance
             */
            public static create(properties?: huskysoft.gotagme.IGetTagsRequest): huskysoft.gotagme.GetTagsRequest;

            /**
             * Encodes the specified GetTagsRequest message. Does not implicitly {@link huskysoft.gotagme.GetTagsRequest.verify|verify} messages.
             * @param message GetTagsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IGetTagsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetTagsRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.GetTagsRequest.verify|verify} messages.
             * @param message GetTagsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IGetTagsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetTagsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTagsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.GetTagsRequest;

            /**
             * Decodes a GetTagsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetTagsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.GetTagsRequest;

            /**
             * Verifies a GetTagsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetTagsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTagsRequest
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.GetTagsRequest;

            /**
             * Creates a plain object from a GetTagsRequest message. Also converts values to other types if specified.
             * @param message GetTagsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.GetTagsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTagsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTagsResponse. */
        interface IGetTagsResponse {

            /** GetTagsResponse tags */
            tags?: (huskysoft.gotagme.ITag[]|null);

            /** GetTagsResponse capturedBy */
            capturedBy?: (huskysoft.gotagme.ITag|null);
        }

        /** Represents a GetTagsResponse. */
        class GetTagsResponse implements IGetTagsResponse {

            /**
             * Constructs a new GetTagsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: huskysoft.gotagme.IGetTagsResponse);

            /** GetTagsResponse tags. */
            public tags: huskysoft.gotagme.ITag[];

            /** GetTagsResponse capturedBy. */
            public capturedBy?: (huskysoft.gotagme.ITag|null);

            /**
             * Creates a new GetTagsResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetTagsResponse instance
             */
            public static create(properties?: huskysoft.gotagme.IGetTagsResponse): huskysoft.gotagme.GetTagsResponse;

            /**
             * Encodes the specified GetTagsResponse message. Does not implicitly {@link huskysoft.gotagme.GetTagsResponse.verify|verify} messages.
             * @param message GetTagsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: huskysoft.gotagme.IGetTagsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetTagsResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.GetTagsResponse.verify|verify} messages.
             * @param message GetTagsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: huskysoft.gotagme.IGetTagsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetTagsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTagsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.GetTagsResponse;

            /**
             * Decodes a GetTagsResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetTagsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.GetTagsResponse;

            /**
             * Verifies a GetTagsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetTagsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTagsResponse
             */
            public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.GetTagsResponse;

            /**
             * Creates a plain object from a GetTagsResponse message. Also converts values to other types if specified.
             * @param message GetTagsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: huskysoft.gotagme.GetTagsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTagsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
