import { dirStat } from '$lib/fsutils';

export async function get({ params }) {
    const { sub } = params;
    return {
        status: 200,
        body: dirStat(sub)
    }
}