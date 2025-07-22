import ErrorView from './ErrorView';
import { isRouteErrorResponse, useRouteError } from 'react-router';

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorView />;
  }

  return <ErrorView />;
}
