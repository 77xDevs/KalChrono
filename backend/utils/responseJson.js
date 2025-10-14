export const responseObj = {
    responseJson : (response, status_code, success_status, message) => {
        return response.status(status_code).json({
            "success": success_status,
            "message": message
        });
    }
}