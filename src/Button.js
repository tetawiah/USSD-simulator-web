const Button = ({
  className = "btn",
  content,
  height,
  width,
  onClick = () => {},
}) => (
  <button
    id="form-btn"
    type="submit"
    className={className}
    style={{ width: `${width}px`, height: `${height}px` }}
    onClick={onClick}
  >
    {content}
  </button>
);

export default Button;
