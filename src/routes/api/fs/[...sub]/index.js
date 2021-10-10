import { dirStat, deleteFile, createFolder, createFile } from '$lib/fsutils';

export async function get({ params }) {
    const { sub } = params;
    return {
        status: 200,
        body: dirStat(sub)
    }
}

export async function del({ params }) {
    const { sub } = params;
    const response = await deleteFile(sub)
    let status = 200;
    if (response.error) {
        status = 500
    }
    return {
        status: status,
        body: {
            response
        }
    }

}

export async function post({ params, query }) {
    const type = query.get("type");
    const { sub } = params;
    let status = 200;
    let response = {};
    if (type) {
        switch (type) {
            case "dir":
                response = await createFolder(sub);
                if (response.error) {
                    status = 500
                }
                break;
            case "file":
                response = await createFile(sub);
                if (response.error) {
                    status = 500
                }
                break;
            default:
                response = { error: true, "message": "Incorrect 'type'" }
                if (response.error) {
                    status = 400
                }
                break;
        }
        return {
            status: status,
            body: {
                response
            }
        }
    } else {
        return {
            status: 400,
            body: {
                error: true,
                message: "'type' missing or incorrect. Specify query param type=file or type=dir"
            }
        }
    }
}