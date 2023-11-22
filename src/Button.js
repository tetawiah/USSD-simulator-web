const Button = ({ content, size }) => (
  <button type="submit" className="btn" style={{ size: `${size}px` }}>
    {content}
  </button>
);

export default Button;
