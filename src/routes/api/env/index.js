export async function get() {
    return {
        status: 200,
        body: {
            env: {
                FS_ROOT: process.env["FS_ROOT"]
            }
        }
    }
}