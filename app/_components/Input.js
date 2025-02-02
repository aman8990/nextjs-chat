function Input({
  label,
  id,
  type,
  register,
  errors,
  value,
  roundedFull,
  disabled,
  required = false,
  placeholder,
  validationRules = {},
  autoComplete = 'on',
  onChange,
}) {
  return (
    <div>
      <label className={`text-lg font-medium ${roundedFull ? 'hidden' : ''}`}>
        {label}{' '}
        <span className="text-red-500 text-sm">{errors?.[id]?.message}</span>
      </label>
      <div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
          {...(register ? register(id, validationRules) : { value, onChange })}
          className={`w-full text-gray-900 outline-none border-2 border-solid focus:border-2 focus:border-solid focus:border-red-600 block form-input ${
            disabled ? 'bg-blue-100 text-gray-500 cursor-not-allowed' : ''
          } ${
            roundedFull
              ? 'rounded-full py-1 px-2'
              : 'rounded-md py-0.5 px-2 md:py-1'
          }`}
        />
      </div>
    </div>
  );
}

export default Input;
