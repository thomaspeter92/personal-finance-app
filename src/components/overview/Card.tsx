type Props = {
  title: string;
  value: string;
};

const Card = ({ title, value }: Props) => {
  return (
    <div className="group rounded-xl bg-white p-5 capitalize space-y-3 hover:bg-gray-900 hover:text-beige-100">
      <p className="group-hover:text-beige-100 text-gray-500">{title}</p>
      <p className="font-bold text-3xl">{value}</p>
    </div>
  );
};

export default Card;
