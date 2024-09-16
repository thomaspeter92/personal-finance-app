import { Link } from "react-router-dom";
import { images } from "../util/images";
import { menu } from "../util/menu";
import { Icons } from "./ui/Icons";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="min-w-[280px] relative">
      <aside className="fixed min-w-[280px] left-0 top-0 py-10 pr-10 bg-gray-900 h-screen rounded-r-xl text-gray-300">
        <img src={images.logoLarge} alt="Logo" className="px-10" />
        <nav className="my-10">
          {Object.keys(menu).map((d, i) => {
            const Icon = Icons[menu[d].icon as keyof typeof Icons];
            return (
              <Link
                to={menu[d].href}
                className="group pl-10 cursor-pointer py-5 flex gap-5 items-center font-bold text-lg rounded-r-lg border-l-8 border-gray-900 hover:text-gray-900 hover:bg-beige-100 hover:border-green"
                key={d + i}
              >
                <Icon className="fill-beige-100 group-hover:fill-green" />
                {menu[d].label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
