class apiError extends Error {
    code: number
    message: string
    data: any

    constructor(code: number, message: string = "Something went wrong", data = "") {
        super(message)
        this.code = code
        this.message = message
        this.data = null
    }
}

export { apiError }