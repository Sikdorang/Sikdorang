interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Spinner({ className, ...props }: SpinnerProps) {
  return <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${className}`} {...props} />;
}
