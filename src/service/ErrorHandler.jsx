
const ErrorHandler = {
    buildAlert: (error) => {
        if (error.response) {
            return {
                title: `Error ${error.response.status}!`,
                messages: error.response.data
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("primer if");
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("segundo if");
            console.log('Error', error.message);
        }
        console.log(error.config);

    }
}

export default ErrorHandler;