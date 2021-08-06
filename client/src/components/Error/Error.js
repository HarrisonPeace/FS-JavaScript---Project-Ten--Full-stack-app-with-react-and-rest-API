
import withContext from "../Context/Context";
import ErrorInline from "./Error_Inline";
import { errorHandler } from "./error_handler";
import Forbidden from "./Forbidden";
import NotFound from "./NotFound";
import ErrorBoundary from "./Error_Boundary";
import ErrorUnhandled from "./Error_Unhandled";

const ForbiddenWithContext = withContext(Forbidden);

export { ForbiddenWithContext, ErrorInline, errorHandler, NotFound, ErrorBoundary, ErrorUnhandled }