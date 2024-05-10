interface InputFieldProps {
  labelFor: string;
  type: string;
  name: string;
  id: string;
  label: string;
}

function InputField(props: InputFieldProps) {
  return (
    <>
      <label htmlFor={props.labelFor}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
      />
    </>
  );
}

export default InputField;
