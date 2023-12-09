export default function ErrorComponent({ message, onClose }) {
  return (
    <div className="error-message">
      <i className="fa fa-exclamation-triangle fa-2x" aria-hidden="true" />
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
