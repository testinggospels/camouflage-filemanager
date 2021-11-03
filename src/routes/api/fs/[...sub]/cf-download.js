import { readFile } from '$lib/fsutils'

export async function get({ params }) {
    const { sub } = params;
    const fileContent = readFile(sub)
    return {
        status: 200,
        headers: {
            'Content-Disposition': `attachment; filename="${filename(sub)}"; filename*=UTF-8'${encodeURIComponent(filename(sub))}''`
        },
        body: fileContent
    }
}

function filename(fullpath) {
    const pathArray = fullpath.split("/");
    return pathArray[pathArray.length - 1];
}