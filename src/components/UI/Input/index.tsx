type PropsTypes = {
  type: string;
  className?: string;
  onChange?: Function | any;
  placeholder?: string;
};

const Input = (props: PropsTypes) => {
  const { type, className, onChange, placeholder } = props;
  return (
    <input
      type={type}
      className={`border w-full p-2 rounded ${className}`}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
