class apiResponse {
    code: number
    message: string
    data: object
    success: boolean
    constructor(code = 200, message = "Success", data = {}, success = false) {
        this.code = code
        this.message = message
        this.data = data
        this.success = success
    }
}

export { apiResponse }