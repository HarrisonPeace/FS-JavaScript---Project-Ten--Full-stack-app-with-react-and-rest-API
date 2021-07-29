 
  /* Handler function to catch async and sequelize errors */
  export function errorHandler (error) {

    if(error.response) {
      switch (error.response.status) {
        case 400: //bad request (invalid syntax)
          let message = error.response.data.error;
          let formattedMessage = message.map(message => {
            if(message) return message
            else return null
          }).join(' ')
          return (formattedMessage) 
        case 401:
          break; //bad credentials
        case 404:
          return
        case 403:
          break; //no permission
        case 500:
          break; //internal server error
        default:
          return 'Sorry! An unexpected error just occurred, please try again.'
      }
    } else {
      return 'Sorry! An unexpected error just occurred, please try again.'
    }
  }