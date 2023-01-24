import classNames from "classnames";

export const pcMain = classNames(
  "sm:container sm:bg-white sm:mx-auto sm:mt-12 sm:h-[80vh] sm:rounded-lg sm:p-12 sm:flex sm:items-start"
);
export const pcDetail = classNames(
  "sm:container sm:mx-auto sm:w-[55vw] sm:h-[68vh] sm:flex sm:flex-col sm:items-center sm:border-2 sm:rounded-lg sm:border-slate-600 sm:p-12"
);
export const pcAbout = classNames(
  "sm:mx-auto sm:border-2 sm:w-[18vw] sm:h-[68vh] sm:rounded-lg sm:border-slate-600 sm:py-2 sm:flex sm:flex-col sm:justify-center sm:items-center [&>h1]:sm:my-3 [&>h1]:sm:font-semibold [&>h1]:sm:text-xl [&>h1]:sm:capitalize  [&>h1]:sm:text-slate-600 [&>button]:sm:bg-slate-600 [&>button]:sm:mt-24"
);
export const pcGridMap = classNames(
  "grid grid-cols-3 sm:gap-x-32 sm:border-b-2 sm:py-3 sm:border-slate-600"
);

