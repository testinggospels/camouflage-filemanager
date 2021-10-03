import { dirStat } from '$lib/fsutils'

export async function get() {
    return {
        status: 200,
        body: dirStat()
    }
}