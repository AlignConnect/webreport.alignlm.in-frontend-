
export const HandleGlobalError = (error: unknown) => {

    if ((error as any)?.response?.status === 401 || (error as Error)?.message === 'Unauthorized') {
        window.location.href = "/login"
    }


}