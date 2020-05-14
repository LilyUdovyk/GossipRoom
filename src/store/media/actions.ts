import { createAsyncAction } from "typesafe-actions";
import { FileData } from "./types";

export const uploadFile = createAsyncAction(
    "media/UPLOAD_FILE_REQUEST",
    "media/UPLOAD_FILE_SUCCESS",
    "media/UPLOAD_FILE_FAILURE"
)<HTMLFormElement, FileData, string>();