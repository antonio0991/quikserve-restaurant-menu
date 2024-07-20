export const ErrorComponent: React.FC<{ error: string | null }> = ({
  error,
}) => <div>Failed loading: {error}</div>;
