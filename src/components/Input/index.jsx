import PropTypes from 'prop-types';

const Input = props => {
  const {
    id,
    placeholder = '',
    label = '',
    type = 'text',
    error = '',
    wrapperClassName,
    name,
    ...rest
  } = props;

  return (
    <div className={`${wrapperClassName ?? 'flex flex-col gap-2 w-full'}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm text-gray-9 font-normal placeholder-gray-gray4`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        className="border text-base font-normal border-gray-8 text-gray-9 rounded-sm block w-full p-2"
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  wrapperClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Input;
