import { copy, cut } from '$lib/fsutils'
export async function post({ body }) {
    const { source, action, destination } = body;
    let status = 200;
    let resBody = {
        success: true
    }
    let result;
    switch (action) {
        case "copy":
            result = copy(source, destination)
            if (!result.success) {
                status = 500
                resBody = { success: result.success, err: result.err }
            }
            break;
        case "cut":
            result = cut(source, destination)
            if (!result.success) {
                status = 500
                resBody = { success: result.success, err: result.err }
            }
            break;
        default:
            status = 400
            resBody = {
                success: false,
                err: "Invalid Action"
            }
    }
    return {
        status,
        body: resBody
    }
}