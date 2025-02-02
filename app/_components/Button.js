function Button({ children, onClick, type, disabled, rounded }) {
  return (
    <button
      className={`flex justify-center bg-accent-1100 text-lg text-white hover:bg-accent-1000  ${
        rounded ? 'rounded-full w-28 py-1' : 'rounded-md p-1 w-full'
      }`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
