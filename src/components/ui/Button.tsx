import { cva, VariantProps } from "class-variance-authority";
import { Icons } from "./Icons";

const styles = cva(
  "px-5 py-3 rounded-lg border flex items-center justify-center gap-2 text-sm font-semibold whitespace-nowrap transition",
  {
    variants: {
      intent: {
        black: "bg-gray-900 text-gray-100 border-gray-900",
        "black-outlined": "border-gray-900 ",
        beige:
          "bg-beige-100 text-gray-900 hover:bg-gray-900 hover:text-beige-100",
      },
    },
  }
);

type Props = {
  children: React.ReactNode;
  iconLeft?: keyof typeof Icons;
  iconRight?: keyof typeof Icons;
  onClick?: () => void;
  type?: "button" | "submit";
  className: string;
};

const Button = ({
  intent,
  children,
  iconLeft,
  iconRight,
  onClick,
  className,
}: Props & VariantProps<typeof styles>) => {
  let IconLeft, IconRight;
  if (iconLeft) {
    IconLeft = Icons[iconLeft];
  } else if (iconRight) {
    IconRight = Icons[iconRight];
  }

  return (
    <button onClick={onClick} className={`${styles({ intent })} ${className}`}>
      {IconLeft ? <IconLeft /> : null}
      {children}
      {IconRight ? <IconRight /> : null}
    </button>
  );
};

export default Button;
