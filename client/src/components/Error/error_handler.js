/* Handler function to catch api errors */
export function errorHandler(error) {
  if (error.response) {
    //check if server responded
    switch (error.response.status) {
      case 400: //bad request (invalid syntax)
        let message = error.response.data.error;
        return { title: "Error", message };
      case 401: //Unauthorized Error
        return { title: "Incorrect details", message: ["Please try again"] };
      case 404: //Not Found
        return {
          title: "Not Found",
          message: [`Sorry! We couldn't find what you're looking for.`],
        };
      case 403: //No permission
        return {
          title: "No Permission",
          message: [`Sorry you don't have permission to take that action`],
        };
      case 500: //internal server error
        return {
          title: "Server Error",
          message: [
            "An unexpected server error just occurred, please try again.",
          ],
        };
      default:
        //unexpected or un-dealt with error
        return {
          title: "Unexpected Error",
          message: ["An unexpected error just occurred, please try again."],
        };
    }
  } else {
    //Server didn't respond
    return {
      title: "Unexpected Error",
      message: ["An unexpected error just occurred, please try again."],
    };
  }
}
