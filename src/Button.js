const Button = ({ content, size, onClick = () => {} }) => (
  <button
    id="form-btn"
    type="submit"
    className="btn"
    style={{ width: `${size}px` }}
    onClick={onClick}
  >
    {content}
  </button>
);

export default Button;
