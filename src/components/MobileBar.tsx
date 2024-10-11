import { Link } from "react-router-dom";
import { menu } from "../util/menu";
import { Icons } from "./ui/Icons";

const MobileBar = () => {
  return (
    <div className="p-3 z-50 bg-gray-900 fixed bottom-0 w-screen rounded-t-xl lg:hidden">
      <nav className="flex justify-between items-center w-full">
        {Object.keys(menu).map((d, i) => {
          const Icon = Icons[menu[d].icon as keyof typeof Icons];
          return (
            <Link
              to={menu[d].href}
              className="px-1 text-xs font-medium whitespace-nowrap flex-1 pt-3 group cursor-pointer flex flex-col items-center border-b-4 border-gray-900 gap-2 text-beige-100 hover:text-gray-900 rounded-t hover:bg-beige-100 hover:border-green"
              key={d + i}
            >
              <Icon className="fill-beige-100 group-hover:fill-green w-5 h-5" />
              <span>{menu[d].label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBar;
