import { readFile } from '$lib/fsutils'

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