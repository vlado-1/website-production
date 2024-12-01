import { project } from "../types/project.model";

/** 
 * Create a form encapsulating a project object 
 * 
 * @param {project} data Project object 
 * */
export function getFormData( data: project ): FormData {

    /* Default encoding type is "multipart/form-data" */
    var formData: FormData = new FormData();

    formData.append("pid", data.pid.toString());
    formData.append("title", data.title);
    formData.append("descn", data.descn);
    formData.append("pageUrl", data.pageUrl);

    if (data.file != null) {
      formData.append("file", data.file);
    }

    return formData;
}

/** 
 * Create a form encapsulating Google's JWT 
 * 
 * @param {any} token JWT*/
export function getFormDataFromToken (token: any): FormData {
    var formData: FormData = new FormData();

    formData.append("jwt", JSON.stringify(token));

    return formData;
}