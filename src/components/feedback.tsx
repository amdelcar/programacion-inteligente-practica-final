interface FeedbackProps {
  message: string
  actionLabel?: string
  onAction?: () => void
}

export function Feedback({ message, actionLabel, onAction }: FeedbackProps) {
  return (
    <div className="feedback" role="status">
      <p>{message}</p>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
