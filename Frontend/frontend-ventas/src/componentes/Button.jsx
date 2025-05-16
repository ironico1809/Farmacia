// Botón genérico reutilizable para AdminLTE/Bootstrap
function Button({ type = "button", className = "btn btn-primary", onClick, children, ...props }) {
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
