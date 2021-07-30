 
  /* Handler function to catch async and sequelize errors */
  export function errorHandler (error) {

    if(error.response) {
      switch (error.response.status) {
        case 400: //bad request (invalid syntax)
          let message = error.response.data.error;

          return {title: 'Error', message}
        case 401:
          return {title: 'Incorrect details', message:['Please try again']}
        case 404:
          return {title: 'Not Found', message:[`Sorry! We couldn't find what you're looking for.`]}
        case 403: //no permission
          return {title: 'No Permission', message:[`Sorry you don't have permission to take that action`]}
        case 500:
          break; //internal server error
        default:
          return {title: 'Unexpected Error', message:['An unexpected error just occurred, please try again.']}
      }
    } else {
      return {title: 'Unexpected Error', message:['An unexpected error just occurred, please try again.']}
    }
  }