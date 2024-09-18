import { Icons } from "./Icons";

type Props = {
  onChange?: () => void;
  icon?: keyof typeof Icons;
  value?: string;
  name?: string;
  placeholder?: string;
};

const Input = ({ icon, onChange, value, name, placeholder }: Props) => {
  let Icon;
  if (icon) {
    Icon = Icons[icon];
  }
  return (
    <div className="border px-5 rounded-lg border-beige-500 relative overflow-hidden min-w-80">
      <input
        placeholder={placeholder}
        className="py-3 w-full h-full outline-none placeholder:text-beige-500"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
      {Icon ? (
        <Icon className="fill-beige-500 w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2" />
      ) : null}
    </div>
  );
};

export default Input;
