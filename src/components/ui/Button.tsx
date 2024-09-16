import { cva, VariantProps } from "class-variance-authority";

const styles = cva("px-5 py-3 rounded-lg border", {
  variants: {
    intent: {
      black: "bg-gray-900 text-gray-100 border-gray-900",
      "black-outlined": "border-gray-900 text-gray-900",
    },
  },
});

type Props = {
  children: React.ReactNode;
};

const Button = ({ intent, children }: Props & VariantProps<typeof styles>) => {
  return <button className={styles({ intent })}>{children}</button>;
};

export default Button;
