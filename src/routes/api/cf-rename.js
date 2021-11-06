import { rename } from '$lib/fsutils'
export async function post({ body }) {
    const { source, destination } = body;
    let status = 200;
    let resBody = {
        success: true
    }
    const result = rename(source, destination)
    if (!result.success) {
        status = 500
        resBody = { success: result.success, err: result.err }
    }
    return {
        status,
        body: resBody
    }
}