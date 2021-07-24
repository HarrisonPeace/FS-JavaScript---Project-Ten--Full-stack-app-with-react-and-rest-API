import { useHistory } from "react-router-dom";

/* Handler function to catch async and sequelize errors */
function ErrorHandler (error) {

  let history = useHistory();

  if(error.message === 'Network Error') {
    history.push('/error')//Need to workout how to make error page show
  }

  let message = error.response.data.error;

  if (message.length > 0) {
    let formattedMessage = message.map(message => {
    if(message) return `<p class="server-error-message">${message}</p>`
    else return null
  }).join(' ')

  throw new Error(formattedMessage)

  } else {
    throw new Error(message)
  }
}

export default ErrorHandler;