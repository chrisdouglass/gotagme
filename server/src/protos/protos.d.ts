import * as $protobuf from "protobufjs";

/** Namespace huskysoft. */
export namespace huskysoft {

    /** Namespace gotagme. */
    namespace gotagme {

        /** Namespace approval. */
        namespace approval {

            /** ApprovalState enum. */
            enum ApprovalState {
                NEW = 0,
                APPROVED = 1,
                REJECTED = 2
            }

            /** Properties of an ApprovalStatus. */
            interface IApprovalStatus {

                /** ApprovalStatus state */
                state?: (huskysoft.gotagme.approval.ApprovalState|null);

                /** ApprovalStatus setBy */
                setBy?: (huskysoft.gotagme.user.IUser|null);

                /** ApprovalStatus createdAt */
                createdAt?: (number|null);
            }

            /** Represents an ApprovalStatus. */
            class ApprovalStatus implements IApprovalStatus {

                /**
                 * Constructs a new ApprovalStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.approval.IApprovalStatus);

                /** ApprovalStatus state. */
                public state: huskysoft.gotagme.approval.ApprovalState;

                /** ApprovalStatus setBy. */
                public setBy?: (huskysoft.gotagme.user.IUser|null);

                /** ApprovalStatus createdAt. */
                public createdAt: number;

                /**
                 * Creates a new ApprovalStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ApprovalStatus instance
                 */
                public static create(properties?: huskysoft.gotagme.approval.IApprovalStatus): huskysoft.gotagme.approval.ApprovalStatus;

                /**
                 * Encodes the specified ApprovalStatus message. Does not implicitly {@link huskysoft.gotagme.approval.ApprovalStatus.verify|verify} messages.
                 * @param message ApprovalStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.approval.IApprovalStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ApprovalStatus message, length delimited. Does not implicitly {@link huskysoft.gotagme.approval.ApprovalStatus.verify|verify} messages.
                 * @param message ApprovalStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.approval.IApprovalStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ApprovalStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ApprovalStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.approval.ApprovalStatus;

                /**
                 * Decodes an ApprovalStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ApprovalStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.approval.ApprovalStatus;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.approval.ApprovalStatus;

                /**
                 * Creates a plain object from an ApprovalStatus message. Also converts values to other types if specified.
                 * @param message ApprovalStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.approval.ApprovalStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ApprovalStatus to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Namespace costume. */
        namespace costume {

            /** Properties of a Costume. */
            interface ICostume {

                /** Costume id */
                id?: (string|null);

                /** Costume name */
                name?: (string|null);

                /** Costume owner */
                owner?: (huskysoft.gotagme.user.IUser|null);
            }

            /** Represents a Costume. */
            class Costume implements ICostume {

                /**
                 * Constructs a new Costume.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.costume.ICostume);

                /** Costume id. */
                public id: string;

                /** Costume name. */
                public name: string;

                /** Costume owner. */
                public owner?: (huskysoft.gotagme.user.IUser|null);

                /**
                 * Creates a new Costume instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Costume instance
                 */
                public static create(properties?: huskysoft.gotagme.costume.ICostume): huskysoft.gotagme.costume.Costume;

                /**
                 * Encodes the specified Costume message. Does not implicitly {@link huskysoft.gotagme.costume.Costume.verify|verify} messages.
                 * @param message Costume message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.costume.ICostume, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Costume message, length delimited. Does not implicitly {@link huskysoft.gotagme.costume.Costume.verify|verify} messages.
                 * @param message Costume message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.costume.ICostume, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Costume message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Costume
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.costume.Costume;

                /**
                 * Decodes a Costume message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Costume
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.costume.Costume;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.costume.Costume;

                /**
                 * Creates a plain object from a Costume message. Also converts values to other types if specified.
                 * @param message Costume
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.costume.Costume, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
                constructor(properties?: huskysoft.gotagme.costume.IEditCostumeRequest);

                /** EditCostumeRequest name. */
                public name: string;

                /** EditCostumeRequest ownerID. */
                public ownerID: string;

                /**
                 * Creates a new EditCostumeRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EditCostumeRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.costume.IEditCostumeRequest): huskysoft.gotagme.costume.EditCostumeRequest;

                /**
                 * Encodes the specified EditCostumeRequest message. Does not implicitly {@link huskysoft.gotagme.costume.EditCostumeRequest.verify|verify} messages.
                 * @param message EditCostumeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.costume.IEditCostumeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified EditCostumeRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.costume.EditCostumeRequest.verify|verify} messages.
                 * @param message EditCostumeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.costume.IEditCostumeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EditCostumeRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns EditCostumeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.costume.EditCostumeRequest;

                /**
                 * Decodes an EditCostumeRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns EditCostumeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.costume.EditCostumeRequest;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.costume.EditCostumeRequest;

                /**
                 * Creates a plain object from an EditCostumeRequest message. Also converts values to other types if specified.
                 * @param message EditCostumeRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.costume.EditCostumeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this EditCostumeRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetCostumesRequest. */
            interface IGetCostumesRequest {

                /** GetCostumesRequest userID */
                userID?: (string|null);

                /** GetCostumesRequest onlyCurrent */
                onlyCurrent?: (boolean|null);
            }

            /** Represents a GetCostumesRequest. */
            class GetCostumesRequest implements IGetCostumesRequest {

                /**
                 * Constructs a new GetCostumesRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.costume.IGetCostumesRequest);

                /** GetCostumesRequest userID. */
                public userID: string;

                /** GetCostumesRequest onlyCurrent. */
                public onlyCurrent: boolean;

                /** GetCostumesRequest id. */
                public id?: "userID";

                /**
                 * Creates a new GetCostumesRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetCostumesRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.costume.IGetCostumesRequest): huskysoft.gotagme.costume.GetCostumesRequest;

                /**
                 * Encodes the specified GetCostumesRequest message. Does not implicitly {@link huskysoft.gotagme.costume.GetCostumesRequest.verify|verify} messages.
                 * @param message GetCostumesRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.costume.IGetCostumesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetCostumesRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.costume.GetCostumesRequest.verify|verify} messages.
                 * @param message GetCostumesRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.costume.IGetCostumesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetCostumesRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetCostumesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.costume.GetCostumesRequest;

                /**
                 * Decodes a GetCostumesRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetCostumesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.costume.GetCostumesRequest;

                /**
                 * Verifies a GetCostumesRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetCostumesRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetCostumesRequest
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.costume.GetCostumesRequest;

                /**
                 * Creates a plain object from a GetCostumesRequest message. Also converts values to other types if specified.
                 * @param message GetCostumesRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.costume.GetCostumesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetCostumesRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetCostumesResponse. */
            interface IGetCostumesResponse {

                /** GetCostumesResponse costumes */
                costumes?: (huskysoft.gotagme.costume.ICostume[]|null);
            }

            /** Represents a GetCostumesResponse. */
            class GetCostumesResponse implements IGetCostumesResponse {

                /**
                 * Constructs a new GetCostumesResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.costume.IGetCostumesResponse);

                /** GetCostumesResponse costumes. */
                public costumes: huskysoft.gotagme.costume.ICostume[];

                /**
                 * Creates a new GetCostumesResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetCostumesResponse instance
                 */
                public static create(properties?: huskysoft.gotagme.costume.IGetCostumesResponse): huskysoft.gotagme.costume.GetCostumesResponse;

                /**
                 * Encodes the specified GetCostumesResponse message. Does not implicitly {@link huskysoft.gotagme.costume.GetCostumesResponse.verify|verify} messages.
                 * @param message GetCostumesResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.costume.IGetCostumesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetCostumesResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.costume.GetCostumesResponse.verify|verify} messages.
                 * @param message GetCostumesResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.costume.IGetCostumesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetCostumesResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetCostumesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.costume.GetCostumesResponse;

                /**
                 * Decodes a GetCostumesResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetCostumesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.costume.GetCostumesResponse;

                /**
                 * Verifies a GetCostumesResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetCostumesResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetCostumesResponse
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.costume.GetCostumesResponse;

                /**
                 * Creates a plain object from a GetCostumesResponse message. Also converts values to other types if specified.
                 * @param message GetCostumesResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.costume.GetCostumesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetCostumesResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Namespace photo. */
        namespace photo {

            /** Properties of a Photo. */
            interface IPhoto {

                /** Photo id */
                id?: (string|null);

                /** Photo postedBy */
                postedBy?: (huskysoft.gotagme.user.IUser|null);

                /** Photo capturedBy */
                capturedBy?: (huskysoft.gotagme.user.IUser|null);

                /** Photo capturedAt */
                capturedAt?: (number|null);

                /** Photo state */
                state?: (huskysoft.gotagme.approval.ApprovalState|null);

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
                constructor(properties?: huskysoft.gotagme.photo.IPhoto);

                /** Photo id. */
                public id: string;

                /** Photo postedBy. */
                public postedBy?: (huskysoft.gotagme.user.IUser|null);

                /** Photo capturedBy. */
                public capturedBy?: (huskysoft.gotagme.user.IUser|null);

                /** Photo capturedAt. */
                public capturedAt: number;

                /** Photo state. */
                public state: huskysoft.gotagme.approval.ApprovalState;

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
                public static create(properties?: huskysoft.gotagme.photo.IPhoto): huskysoft.gotagme.photo.Photo;

                /**
                 * Encodes the specified Photo message. Does not implicitly {@link huskysoft.gotagme.photo.Photo.verify|verify} messages.
                 * @param message Photo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.photo.IPhoto, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Photo message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.Photo.verify|verify} messages.
                 * @param message Photo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.photo.IPhoto, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Photo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Photo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.photo.Photo;

                /**
                 * Decodes a Photo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Photo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.photo.Photo;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.photo.Photo;

                /**
                 * Creates a plain object from a Photo message. Also converts values to other types if specified.
                 * @param message Photo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.photo.Photo, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
                constructor(properties?: huskysoft.gotagme.photo.IGetPhotoRequest);

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
                public static create(properties?: huskysoft.gotagme.photo.IGetPhotoRequest): huskysoft.gotagme.photo.GetPhotoRequest;

                /**
                 * Encodes the specified GetPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.photo.GetPhotoRequest.verify|verify} messages.
                 * @param message GetPhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.photo.IGetPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.GetPhotoRequest.verify|verify} messages.
                 * @param message GetPhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.photo.IGetPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetPhotoRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.photo.GetPhotoRequest;

                /**
                 * Decodes a GetPhotoRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.photo.GetPhotoRequest;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.photo.GetPhotoRequest;

                /**
                 * Creates a plain object from a GetPhotoRequest message. Also converts values to other types if specified.
                 * @param message GetPhotoRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.photo.GetPhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetPhotoRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetPhotoResponse. */
            interface IGetPhotoResponse {

                /** GetPhotoResponse photos */
                photos?: (huskysoft.gotagme.photo.IPhoto[]|null);
            }

            /** Represents a GetPhotoResponse. */
            class GetPhotoResponse implements IGetPhotoResponse {

                /**
                 * Constructs a new GetPhotoResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.photo.IGetPhotoResponse);

                /** GetPhotoResponse photos. */
                public photos: huskysoft.gotagme.photo.IPhoto[];

                /**
                 * Creates a new GetPhotoResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetPhotoResponse instance
                 */
                public static create(properties?: huskysoft.gotagme.photo.IGetPhotoResponse): huskysoft.gotagme.photo.GetPhotoResponse;

                /**
                 * Encodes the specified GetPhotoResponse message. Does not implicitly {@link huskysoft.gotagme.photo.GetPhotoResponse.verify|verify} messages.
                 * @param message GetPhotoResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.photo.IGetPhotoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetPhotoResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.GetPhotoResponse.verify|verify} messages.
                 * @param message GetPhotoResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.photo.IGetPhotoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetPhotoResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetPhotoResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.photo.GetPhotoResponse;

                /**
                 * Decodes a GetPhotoResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetPhotoResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.photo.GetPhotoResponse;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.photo.GetPhotoResponse;

                /**
                 * Creates a plain object from a GetPhotoResponse message. Also converts values to other types if specified.
                 * @param message GetPhotoResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.photo.GetPhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            }

            /** Represents an InsertPhotoRequest. */
            class InsertPhotoRequest implements IInsertPhotoRequest {

                /**
                 * Constructs a new InsertPhotoRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.photo.IInsertPhotoRequest);

                /** InsertPhotoRequest flickrUrl. */
                public flickrUrl: string;

                /**
                 * Creates a new InsertPhotoRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InsertPhotoRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.photo.IInsertPhotoRequest): huskysoft.gotagme.photo.InsertPhotoRequest;

                /**
                 * Encodes the specified InsertPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotoRequest.verify|verify} messages.
                 * @param message InsertPhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.photo.IInsertPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InsertPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotoRequest.verify|verify} messages.
                 * @param message InsertPhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.photo.IInsertPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InsertPhotoRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InsertPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.photo.InsertPhotoRequest;

                /**
                 * Decodes an InsertPhotoRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InsertPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.photo.InsertPhotoRequest;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.photo.InsertPhotoRequest;

                /**
                 * Creates a plain object from an InsertPhotoRequest message. Also converts values to other types if specified.
                 * @param message InsertPhotoRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.photo.InsertPhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InsertPhotoRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an InsertPhotosRequest. */
            interface IInsertPhotosRequest {

                /** InsertPhotosRequest requests */
                requests?: (huskysoft.gotagme.photo.IInsertPhotoRequest[]|null);

                /** InsertPhotosRequest flickrAlbumUrl */
                flickrAlbumUrl?: (string|null);
            }

            /** Represents an InsertPhotosRequest. */
            class InsertPhotosRequest implements IInsertPhotosRequest {

                /**
                 * Constructs a new InsertPhotosRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.photo.IInsertPhotosRequest);

                /** InsertPhotosRequest requests. */
                public requests: huskysoft.gotagme.photo.IInsertPhotoRequest[];

                /** InsertPhotosRequest flickrAlbumUrl. */
                public flickrAlbumUrl: string;

                /**
                 * Creates a new InsertPhotosRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InsertPhotosRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.photo.IInsertPhotosRequest): huskysoft.gotagme.photo.InsertPhotosRequest;

                /**
                 * Encodes the specified InsertPhotosRequest message. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotosRequest.verify|verify} messages.
                 * @param message InsertPhotosRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.photo.IInsertPhotosRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InsertPhotosRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotosRequest.verify|verify} messages.
                 * @param message InsertPhotosRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.photo.IInsertPhotosRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InsertPhotosRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InsertPhotosRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.photo.InsertPhotosRequest;

                /**
                 * Decodes an InsertPhotosRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InsertPhotosRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.photo.InsertPhotosRequest;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.photo.InsertPhotosRequest;

                /**
                 * Creates a plain object from an InsertPhotosRequest message. Also converts values to other types if specified.
                 * @param message InsertPhotosRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.photo.InsertPhotosRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InsertPhotosRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an InsertPhotosResponse. */
            interface IInsertPhotosResponse {

                /** InsertPhotosResponse photos */
                photos?: (huskysoft.gotagme.photo.IPhoto[]|null);
            }

            /** Represents an InsertPhotosResponse. */
            class InsertPhotosResponse implements IInsertPhotosResponse {

                /**
                 * Constructs a new InsertPhotosResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.photo.IInsertPhotosResponse);

                /** InsertPhotosResponse photos. */
                public photos: huskysoft.gotagme.photo.IPhoto[];

                /**
                 * Creates a new InsertPhotosResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns InsertPhotosResponse instance
                 */
                public static create(properties?: huskysoft.gotagme.photo.IInsertPhotosResponse): huskysoft.gotagme.photo.InsertPhotosResponse;

                /**
                 * Encodes the specified InsertPhotosResponse message. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotosResponse.verify|verify} messages.
                 * @param message InsertPhotosResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.photo.IInsertPhotosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified InsertPhotosResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.InsertPhotosResponse.verify|verify} messages.
                 * @param message InsertPhotosResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.photo.IInsertPhotosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an InsertPhotosResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns InsertPhotosResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.photo.InsertPhotosResponse;

                /**
                 * Decodes an InsertPhotosResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns InsertPhotosResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.photo.InsertPhotosResponse;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.photo.InsertPhotosResponse;

                /**
                 * Creates a plain object from an InsertPhotosResponse message. Also converts values to other types if specified.
                 * @param message InsertPhotosResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.photo.InsertPhotosResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this InsertPhotosResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a DeletePhotoRequest. */
            interface IDeletePhotoRequest {

                /** DeletePhotoRequest id */
                id?: (string|null);
            }

            /** Represents a DeletePhotoRequest. */
            class DeletePhotoRequest implements IDeletePhotoRequest {

                /**
                 * Constructs a new DeletePhotoRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.photo.IDeletePhotoRequest);

                /** DeletePhotoRequest id. */
                public id: string;

                /**
                 * Creates a new DeletePhotoRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeletePhotoRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.photo.IDeletePhotoRequest): huskysoft.gotagme.photo.DeletePhotoRequest;

                /**
                 * Encodes the specified DeletePhotoRequest message. Does not implicitly {@link huskysoft.gotagme.photo.DeletePhotoRequest.verify|verify} messages.
                 * @param message DeletePhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.photo.IDeletePhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeletePhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.photo.DeletePhotoRequest.verify|verify} messages.
                 * @param message DeletePhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.photo.IDeletePhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeletePhotoRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeletePhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.photo.DeletePhotoRequest;

                /**
                 * Decodes a DeletePhotoRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeletePhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.photo.DeletePhotoRequest;

                /**
                 * Verifies a DeletePhotoRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeletePhotoRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeletePhotoRequest
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.photo.DeletePhotoRequest;

                /**
                 * Creates a plain object from a DeletePhotoRequest message. Also converts values to other types if specified.
                 * @param message DeletePhotoRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.photo.DeletePhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeletePhotoRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Namespace user. */
        namespace user {

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
                constructor(properties?: huskysoft.gotagme.user.IUser);

                /** User id. */
                public id: string;

                /** User displayName. */
                public displayName: string;

                /**
                 * Creates a new User instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns User instance
                 */
                public static create(properties?: huskysoft.gotagme.user.IUser): huskysoft.gotagme.user.User;

                /**
                 * Encodes the specified User message. Does not implicitly {@link huskysoft.gotagme.user.User.verify|verify} messages.
                 * @param message User message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.user.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified User message, length delimited. Does not implicitly {@link huskysoft.gotagme.user.User.verify|verify} messages.
                 * @param message User message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.user.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a User message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.user.User;

                /**
                 * Decodes a User message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.user.User;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.user.User;

                /**
                 * Creates a plain object from a User message. Also converts values to other types if specified.
                 * @param message User
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.user.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this User to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetUserRequest. */
            interface IGetUserRequest {

                /** GetUserRequest id */
                id?: (string|null);
            }

            /** Represents a GetUserRequest. */
            class GetUserRequest implements IGetUserRequest {

                /**
                 * Constructs a new GetUserRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.user.IGetUserRequest);

                /** GetUserRequest id. */
                public id: string;

                /**
                 * Creates a new GetUserRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetUserRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.user.IGetUserRequest): huskysoft.gotagme.user.GetUserRequest;

                /**
                 * Encodes the specified GetUserRequest message. Does not implicitly {@link huskysoft.gotagme.user.GetUserRequest.verify|verify} messages.
                 * @param message GetUserRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.user.IGetUserRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetUserRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.user.GetUserRequest.verify|verify} messages.
                 * @param message GetUserRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.user.IGetUserRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetUserRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetUserRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.user.GetUserRequest;

                /**
                 * Decodes a GetUserRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetUserRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.user.GetUserRequest;

                /**
                 * Verifies a GetUserRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetUserRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetUserRequest
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.user.GetUserRequest;

                /**
                 * Creates a plain object from a GetUserRequest message. Also converts values to other types if specified.
                 * @param message GetUserRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.user.GetUserRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetUserRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetUserReponse. */
            interface IGetUserReponse {

                /** GetUserReponse user */
                user?: (huskysoft.gotagme.user.IUser|null);
            }

            /** Represents a GetUserReponse. */
            class GetUserReponse implements IGetUserReponse {

                /**
                 * Constructs a new GetUserReponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.user.IGetUserReponse);

                /** GetUserReponse user. */
                public user?: (huskysoft.gotagme.user.IUser|null);

                /**
                 * Creates a new GetUserReponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetUserReponse instance
                 */
                public static create(properties?: huskysoft.gotagme.user.IGetUserReponse): huskysoft.gotagme.user.GetUserReponse;

                /**
                 * Encodes the specified GetUserReponse message. Does not implicitly {@link huskysoft.gotagme.user.GetUserReponse.verify|verify} messages.
                 * @param message GetUserReponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.user.IGetUserReponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetUserReponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.user.GetUserReponse.verify|verify} messages.
                 * @param message GetUserReponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.user.IGetUserReponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetUserReponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetUserReponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.user.GetUserReponse;

                /**
                 * Decodes a GetUserReponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetUserReponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.user.GetUserReponse;

                /**
                 * Verifies a GetUserReponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetUserReponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetUserReponse
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.user.GetUserReponse;

                /**
                 * Creates a plain object from a GetUserReponse message. Also converts values to other types if specified.
                 * @param message GetUserReponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.user.GetUserReponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetUserReponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Namespace tag. */
        namespace tag {

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
                addedBy?: (huskysoft.gotagme.user.IUser|null);

                /** Tag photo */
                photo?: (huskysoft.gotagme.photo.IPhoto|null);

                /** Tag display */
                display?: (string|null);

                /** Tag taggedUser */
                taggedUser?: (huskysoft.gotagme.user.IUser|null);

                /** Tag costume */
                costume?: (huskysoft.gotagme.costume.ICostume|null);

                /** Tag hashtag */
                hashtag?: (string|null);

                /** Tag state */
                state?: (huskysoft.gotagme.approval.ApprovalState|null);
            }

            /** Represents a Tag. */
            class Tag implements ITag {

                /**
                 * Constructs a new Tag.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.ITag);

                /** Tag id. */
                public id: string;

                /** Tag tag. */
                public tag: string;

                /** Tag key. */
                public key: string;

                /** Tag createdAt. */
                public createdAt: number;

                /** Tag addedBy. */
                public addedBy?: (huskysoft.gotagme.user.IUser|null);

                /** Tag photo. */
                public photo?: (huskysoft.gotagme.photo.IPhoto|null);

                /** Tag display. */
                public display: string;

                /** Tag taggedUser. */
                public taggedUser?: (huskysoft.gotagme.user.IUser|null);

                /** Tag costume. */
                public costume?: (huskysoft.gotagme.costume.ICostume|null);

                /** Tag hashtag. */
                public hashtag: string;

                /** Tag state. */
                public state: huskysoft.gotagme.approval.ApprovalState;

                /** Tag value. */
                public value?: ("taggedUser"|"costume"|"hashtag");

                /**
                 * Creates a new Tag instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Tag instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.ITag): huskysoft.gotagme.tag.Tag;

                /**
                 * Encodes the specified Tag message. Does not implicitly {@link huskysoft.gotagme.tag.Tag.verify|verify} messages.
                 * @param message Tag message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Tag message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.Tag.verify|verify} messages.
                 * @param message Tag message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.ITag, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Tag message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Tag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.Tag;

                /**
                 * Decodes a Tag message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Tag
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.Tag;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.Tag;

                /**
                 * Creates a plain object from a Tag message. Also converts values to other types if specified.
                 * @param message Tag
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.Tag, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Tag to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an AddTagsToPhotoRequest. */
            interface IAddTagsToPhotoRequest {

                /** AddTagsToPhotoRequest tags */
                tags?: (huskysoft.gotagme.tag.ITag[]|null);

                /** AddTagsToPhotoRequest capturedBy */
                capturedBy?: (huskysoft.gotagme.tag.ITag|null);
            }

            /** Represents an AddTagsToPhotoRequest. */
            class AddTagsToPhotoRequest implements IAddTagsToPhotoRequest {

                /**
                 * Constructs a new AddTagsToPhotoRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IAddTagsToPhotoRequest);

                /** AddTagsToPhotoRequest tags. */
                public tags: huskysoft.gotagme.tag.ITag[];

                /** AddTagsToPhotoRequest capturedBy. */
                public capturedBy?: (huskysoft.gotagme.tag.ITag|null);

                /**
                 * Creates a new AddTagsToPhotoRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AddTagsToPhotoRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IAddTagsToPhotoRequest): huskysoft.gotagme.tag.AddTagsToPhotoRequest;

                /**
                 * Encodes the specified AddTagsToPhotoRequest message. Does not implicitly {@link huskysoft.gotagme.tag.AddTagsToPhotoRequest.verify|verify} messages.
                 * @param message AddTagsToPhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IAddTagsToPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AddTagsToPhotoRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.AddTagsToPhotoRequest.verify|verify} messages.
                 * @param message AddTagsToPhotoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IAddTagsToPhotoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AddTagsToPhotoRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AddTagsToPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.AddTagsToPhotoRequest;

                /**
                 * Decodes an AddTagsToPhotoRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AddTagsToPhotoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.AddTagsToPhotoRequest;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.AddTagsToPhotoRequest;

                /**
                 * Creates a plain object from an AddTagsToPhotoRequest message. Also converts values to other types if specified.
                 * @param message AddTagsToPhotoRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.AddTagsToPhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
                state?: (huskysoft.gotagme.approval.ApprovalState|null);
            }

            /** Represents a ModifyTagRequest. */
            class ModifyTagRequest implements IModifyTagRequest {

                /**
                 * Constructs a new ModifyTagRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IModifyTagRequest);

                /** ModifyTagRequest id. */
                public id: string;

                /** ModifyTagRequest state. */
                public state: huskysoft.gotagme.approval.ApprovalState;

                /**
                 * Creates a new ModifyTagRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ModifyTagRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IModifyTagRequest): huskysoft.gotagme.tag.ModifyTagRequest;

                /**
                 * Encodes the specified ModifyTagRequest message. Does not implicitly {@link huskysoft.gotagme.tag.ModifyTagRequest.verify|verify} messages.
                 * @param message ModifyTagRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IModifyTagRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ModifyTagRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.ModifyTagRequest.verify|verify} messages.
                 * @param message ModifyTagRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IModifyTagRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ModifyTagRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ModifyTagRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.ModifyTagRequest;

                /**
                 * Decodes a ModifyTagRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ModifyTagRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.ModifyTagRequest;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.ModifyTagRequest;

                /**
                 * Creates a plain object from a ModifyTagRequest message. Also converts values to other types if specified.
                 * @param message ModifyTagRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.ModifyTagRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ModifyTagRequest to JSON.
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

                /** GetTagsRequest userID */
                userID?: (string|null);

                /** GetTagsRequest costumeID */
                costumeID?: (string|null);

                /** GetTagsRequest hashtag */
                hashtag?: (string|null);

                /** GetTagsRequest stateFilter */
                stateFilter?: (huskysoft.gotagme.approval.ApprovalState|null);
            }

            /** Represents a GetTagsRequest. */
            class GetTagsRequest implements IGetTagsRequest {

                /**
                 * Constructs a new GetTagsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IGetTagsRequest);

                /** GetTagsRequest tagID. */
                public tagID: string;

                /** GetTagsRequest photoID. */
                public photoID: string;

                /** GetTagsRequest userID. */
                public userID: string;

                /** GetTagsRequest costumeID. */
                public costumeID: string;

                /** GetTagsRequest hashtag. */
                public hashtag: string;

                /** GetTagsRequest stateFilter. */
                public stateFilter: huskysoft.gotagme.approval.ApprovalState;

                /** GetTagsRequest id. */
                public id?: ("tagID"|"photoID"|"userID"|"costumeID"|"hashtag");

                /**
                 * Creates a new GetTagsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetTagsRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IGetTagsRequest): huskysoft.gotagme.tag.GetTagsRequest;

                /**
                 * Encodes the specified GetTagsRequest message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagsRequest.verify|verify} messages.
                 * @param message GetTagsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IGetTagsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetTagsRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagsRequest.verify|verify} messages.
                 * @param message GetTagsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IGetTagsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetTagsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetTagsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.GetTagsRequest;

                /**
                 * Decodes a GetTagsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetTagsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.GetTagsRequest;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.GetTagsRequest;

                /**
                 * Creates a plain object from a GetTagsRequest message. Also converts values to other types if specified.
                 * @param message GetTagsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.GetTagsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetTagsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetTagsResponse. */
            interface IGetTagsResponse {

                /** GetTagsResponse tags */
                tags?: (huskysoft.gotagme.tag.ITag[]|null);

                /** GetTagsResponse capturedBy */
                capturedBy?: (huskysoft.gotagme.tag.ITag|null);
            }

            /** Represents a GetTagsResponse. */
            class GetTagsResponse implements IGetTagsResponse {

                /**
                 * Constructs a new GetTagsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IGetTagsResponse);

                /** GetTagsResponse tags. */
                public tags: huskysoft.gotagme.tag.ITag[];

                /** GetTagsResponse capturedBy. */
                public capturedBy?: (huskysoft.gotagme.tag.ITag|null);

                /**
                 * Creates a new GetTagsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetTagsResponse instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IGetTagsResponse): huskysoft.gotagme.tag.GetTagsResponse;

                /**
                 * Encodes the specified GetTagsResponse message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagsResponse.verify|verify} messages.
                 * @param message GetTagsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IGetTagsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetTagsResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagsResponse.verify|verify} messages.
                 * @param message GetTagsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IGetTagsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetTagsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetTagsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.GetTagsResponse;

                /**
                 * Decodes a GetTagsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetTagsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.GetTagsResponse;

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
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.GetTagsResponse;

                /**
                 * Creates a plain object from a GetTagsResponse message. Also converts values to other types if specified.
                 * @param message GetTagsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.GetTagsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetTagsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetAutocompleteTagsRequest. */
            interface IGetAutocompleteTagsRequest {

                /** GetAutocompleteTagsRequest term */
                term?: (string|null);
            }

            /** Represents a GetAutocompleteTagsRequest. */
            class GetAutocompleteTagsRequest implements IGetAutocompleteTagsRequest {

                /**
                 * Constructs a new GetAutocompleteTagsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IGetAutocompleteTagsRequest);

                /** GetAutocompleteTagsRequest term. */
                public term: string;

                /**
                 * Creates a new GetAutocompleteTagsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetAutocompleteTagsRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IGetAutocompleteTagsRequest): huskysoft.gotagme.tag.GetAutocompleteTagsRequest;

                /**
                 * Encodes the specified GetAutocompleteTagsRequest message. Does not implicitly {@link huskysoft.gotagme.tag.GetAutocompleteTagsRequest.verify|verify} messages.
                 * @param message GetAutocompleteTagsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IGetAutocompleteTagsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetAutocompleteTagsRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetAutocompleteTagsRequest.verify|verify} messages.
                 * @param message GetAutocompleteTagsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IGetAutocompleteTagsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetAutocompleteTagsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetAutocompleteTagsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.GetAutocompleteTagsRequest;

                /**
                 * Decodes a GetAutocompleteTagsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetAutocompleteTagsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.GetAutocompleteTagsRequest;

                /**
                 * Verifies a GetAutocompleteTagsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetAutocompleteTagsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetAutocompleteTagsRequest
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.GetAutocompleteTagsRequest;

                /**
                 * Creates a plain object from a GetAutocompleteTagsRequest message. Also converts values to other types if specified.
                 * @param message GetAutocompleteTagsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.GetAutocompleteTagsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetAutocompleteTagsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetAutocompleteTagsResponse. */
            interface IGetAutocompleteTagsResponse {

                /** GetAutocompleteTagsResponse tags */
                tags?: (huskysoft.gotagme.tag.ITag[]|null);
            }

            /** Represents a GetAutocompleteTagsResponse. */
            class GetAutocompleteTagsResponse implements IGetAutocompleteTagsResponse {

                /**
                 * Constructs a new GetAutocompleteTagsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IGetAutocompleteTagsResponse);

                /** GetAutocompleteTagsResponse tags. */
                public tags: huskysoft.gotagme.tag.ITag[];

                /**
                 * Creates a new GetAutocompleteTagsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetAutocompleteTagsResponse instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IGetAutocompleteTagsResponse): huskysoft.gotagme.tag.GetAutocompleteTagsResponse;

                /**
                 * Encodes the specified GetAutocompleteTagsResponse message. Does not implicitly {@link huskysoft.gotagme.tag.GetAutocompleteTagsResponse.verify|verify} messages.
                 * @param message GetAutocompleteTagsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IGetAutocompleteTagsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetAutocompleteTagsResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetAutocompleteTagsResponse.verify|verify} messages.
                 * @param message GetAutocompleteTagsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IGetAutocompleteTagsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetAutocompleteTagsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetAutocompleteTagsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.GetAutocompleteTagsResponse;

                /**
                 * Decodes a GetAutocompleteTagsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetAutocompleteTagsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.GetAutocompleteTagsResponse;

                /**
                 * Verifies a GetAutocompleteTagsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetAutocompleteTagsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetAutocompleteTagsResponse
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.GetAutocompleteTagsResponse;

                /**
                 * Creates a plain object from a GetAutocompleteTagsResponse message. Also converts values to other types if specified.
                 * @param message GetAutocompleteTagsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.GetAutocompleteTagsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetAutocompleteTagsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RejectTagRequest. */
            interface IRejectTagRequest {

                /** RejectTagRequest id */
                id?: (string|null);
            }

            /** Represents a RejectTagRequest. */
            class RejectTagRequest implements IRejectTagRequest {

                /**
                 * Constructs a new RejectTagRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IRejectTagRequest);

                /** RejectTagRequest id. */
                public id: string;

                /**
                 * Creates a new RejectTagRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RejectTagRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IRejectTagRequest): huskysoft.gotagme.tag.RejectTagRequest;

                /**
                 * Encodes the specified RejectTagRequest message. Does not implicitly {@link huskysoft.gotagme.tag.RejectTagRequest.verify|verify} messages.
                 * @param message RejectTagRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IRejectTagRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RejectTagRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.RejectTagRequest.verify|verify} messages.
                 * @param message RejectTagRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IRejectTagRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RejectTagRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RejectTagRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.RejectTagRequest;

                /**
                 * Decodes a RejectTagRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RejectTagRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.RejectTagRequest;

                /**
                 * Verifies a RejectTagRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RejectTagRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RejectTagRequest
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.RejectTagRequest;

                /**
                 * Creates a plain object from a RejectTagRequest message. Also converts values to other types if specified.
                 * @param message RejectTagRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.RejectTagRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RejectTagRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetTagCountsRequest. */
            interface IGetTagCountsRequest {

                /** GetTagCountsRequest costumeIDs */
                costumeIDs?: (string[]|null);

                /** GetTagCountsRequest userIDs */
                userIDs?: (string[]|null);

                /** GetTagCountsRequest hashtags */
                hashtags?: (string[]|null);
            }

            /** Represents a GetTagCountsRequest. */
            class GetTagCountsRequest implements IGetTagCountsRequest {

                /**
                 * Constructs a new GetTagCountsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IGetTagCountsRequest);

                /** GetTagCountsRequest costumeIDs. */
                public costumeIDs: string[];

                /** GetTagCountsRequest userIDs. */
                public userIDs: string[];

                /** GetTagCountsRequest hashtags. */
                public hashtags: string[];

                /**
                 * Creates a new GetTagCountsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetTagCountsRequest instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IGetTagCountsRequest): huskysoft.gotagme.tag.GetTagCountsRequest;

                /**
                 * Encodes the specified GetTagCountsRequest message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountsRequest.verify|verify} messages.
                 * @param message GetTagCountsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IGetTagCountsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetTagCountsRequest message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountsRequest.verify|verify} messages.
                 * @param message GetTagCountsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IGetTagCountsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetTagCountsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetTagCountsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.GetTagCountsRequest;

                /**
                 * Decodes a GetTagCountsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetTagCountsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.GetTagCountsRequest;

                /**
                 * Verifies a GetTagCountsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetTagCountsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetTagCountsRequest
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.GetTagCountsRequest;

                /**
                 * Creates a plain object from a GetTagCountsRequest message. Also converts values to other types if specified.
                 * @param message GetTagCountsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.GetTagCountsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetTagCountsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetTagCountResponse. */
            interface IGetTagCountResponse {

                /** GetTagCountResponse count */
                count?: (number|null);

                /** GetTagCountResponse costume */
                costume?: (huskysoft.gotagme.costume.ICostume|null);

                /** GetTagCountResponse user */
                user?: (huskysoft.gotagme.user.IUser|null);

                /** GetTagCountResponse hashtag */
                hashtag?: (string|null);
            }

            /** Represents a GetTagCountResponse. */
            class GetTagCountResponse implements IGetTagCountResponse {

                /**
                 * Constructs a new GetTagCountResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IGetTagCountResponse);

                /** GetTagCountResponse count. */
                public count: number;

                /** GetTagCountResponse costume. */
                public costume?: (huskysoft.gotagme.costume.ICostume|null);

                /** GetTagCountResponse user. */
                public user?: (huskysoft.gotagme.user.IUser|null);

                /** GetTagCountResponse hashtag. */
                public hashtag: string;

                /** GetTagCountResponse value. */
                public value?: ("costume"|"user"|"hashtag");

                /**
                 * Creates a new GetTagCountResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetTagCountResponse instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IGetTagCountResponse): huskysoft.gotagme.tag.GetTagCountResponse;

                /**
                 * Encodes the specified GetTagCountResponse message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountResponse.verify|verify} messages.
                 * @param message GetTagCountResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IGetTagCountResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetTagCountResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountResponse.verify|verify} messages.
                 * @param message GetTagCountResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IGetTagCountResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetTagCountResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetTagCountResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.GetTagCountResponse;

                /**
                 * Decodes a GetTagCountResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetTagCountResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.GetTagCountResponse;

                /**
                 * Verifies a GetTagCountResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetTagCountResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetTagCountResponse
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.GetTagCountResponse;

                /**
                 * Creates a plain object from a GetTagCountResponse message. Also converts values to other types if specified.
                 * @param message GetTagCountResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.GetTagCountResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetTagCountResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetTagCountsResponse. */
            interface IGetTagCountsResponse {

                /** GetTagCountsResponse responses */
                responses?: (huskysoft.gotagme.tag.IGetTagCountResponse[]|null);
            }

            /** Represents a GetTagCountsResponse. */
            class GetTagCountsResponse implements IGetTagCountsResponse {

                /**
                 * Constructs a new GetTagCountsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: huskysoft.gotagme.tag.IGetTagCountsResponse);

                /** GetTagCountsResponse responses. */
                public responses: huskysoft.gotagme.tag.IGetTagCountResponse[];

                /**
                 * Creates a new GetTagCountsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetTagCountsResponse instance
                 */
                public static create(properties?: huskysoft.gotagme.tag.IGetTagCountsResponse): huskysoft.gotagme.tag.GetTagCountsResponse;

                /**
                 * Encodes the specified GetTagCountsResponse message. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountsResponse.verify|verify} messages.
                 * @param message GetTagCountsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: huskysoft.gotagme.tag.IGetTagCountsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetTagCountsResponse message, length delimited. Does not implicitly {@link huskysoft.gotagme.tag.GetTagCountsResponse.verify|verify} messages.
                 * @param message GetTagCountsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: huskysoft.gotagme.tag.IGetTagCountsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetTagCountsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetTagCountsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): huskysoft.gotagme.tag.GetTagCountsResponse;

                /**
                 * Decodes a GetTagCountsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetTagCountsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): huskysoft.gotagme.tag.GetTagCountsResponse;

                /**
                 * Verifies a GetTagCountsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetTagCountsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetTagCountsResponse
                 */
                public static fromObject(object: { [k: string]: any }): huskysoft.gotagme.tag.GetTagCountsResponse;

                /**
                 * Creates a plain object from a GetTagCountsResponse message. Also converts values to other types if specified.
                 * @param message GetTagCountsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: huskysoft.gotagme.tag.GetTagCountsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetTagCountsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
