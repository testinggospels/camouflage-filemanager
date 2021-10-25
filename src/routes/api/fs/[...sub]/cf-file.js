import { readFile, writeFile } from '$lib/fsutils'

export async function get({ params }) {
    const { sub } = params;
    const fileContent = readFile(sub)
    return {
        status: 200,
        body: {
            fileContent
        }
    }
}

export async function post({ params, body }) {
    const { sub } = params
    let status = 200;
    let response = writeFile(sub, body.content)
    if (response !== 'success') {
        status = 500;
    }
    return {
        status: status,
        body: {
            response
        }
    }
}