import { project } from "../models/project.model";

export function getFormData( data: project ): FormData {

    /* Default encoding type is "multipart/form-data" */
    var formData: FormData = new FormData();

    formData.append("pid", data.pid.toString());
    formData.append("title", data.title);
    formData.append("descn", data.descn);
    formData.append("effort", data.effort.toString());

    if (data.file != null) {
      formData.append("file", data.file);
    }

    return formData;
}

export function getFormDataFromToken (token: any): FormData {
    var formData: FormData = new FormData();

    formData.append("jwt", token);

    return formData;
}