import classNames from "classnames";

// styling page profile

export const pcMain = classNames(
  "sm:container sm:bg-white sm:mx-auto sm:mt-12 sm:h-[80vh] sm:rounded-lg sm:shadow-lg sm:p-12 sm:flex sm:items-start"
);
export const pcDetail = classNames(
  "sm:container sm:mx-auto sm:w-[55vw] sm:h-[68vh] sm:flex sm:flex-col sm:items-center sm:border-2 sm:rounded-lg sm:border-slate-600 sm:p-12"
);
export const pcAbout = classNames(
  "sm:mx-auto sm:border-2 sm:w-[18vw] sm:h-[68vh] sm:rounded-lg sm:border-slate-600 sm:py-2 sm:flex sm:flex-col sm:justify-center sm:items-center [&>h1]:sm:my-3 [&>h1]:sm:font-semibold [&>h1]:sm:text-xl [&>h1]:sm:capitalize  [&>h1]:sm:text-slate-600 [&>button]:sm:bg-slate-600 [&>button]:sm:mt-24"
);
export const pcGridMap = classNames(
  "sm:grid sm:grid-cols-3 sm:gap-x-32 sm:border-b-2 sm:py-3 sm:border-slate-600"
);


export const mbDetail = classNames(
  "bg-white border-4 border-slate-600 rounded-lg m-2 pt-0 p-1 flex flex-col items-center h-60 px-5 pt-2"
)

export const mbAbout = classNames(
  "bg-white border-4 border-slate-600 rounded-lg m-2 p-2 flex flex-col justify-center items-center"
)

export const mbGridMap = classNames(
  "grid grid-cols-3 text-end"
)

// styling on About page

export const pcMainAbout = classNames(
  "md:container md:mx-auto md:h-[70vh] md:bg-white md:mt-20 md:w-[40vw] md:rounded-lg md:shadow-lg md:flex md:justify-center md:items-center"
)
export const pcDetailAbout = classNames(
  "md:mb-0 md:contianer md:w-[93%] md:h-[65vh] md:border-2 md:border-slate-500 md:rounded-lg md:flex md:flex-col md:justify-center md:items-center md:border-none"
)

export const mbMainAbout = classNames(
  "bg-white border-4 border-slate-600 rounded-lg m-2 pt-0 p-1 flex flex-col items-center h-[80vh] px-5 pt-2 shadow-lg"
)

export const mbDetailAbout = classNames(
  "p-12 flex flex-col justify-center items-center mb-40 [&>*]:my-8"
)

{/*------------------------ Home -------------------------*/}

export const mbHomeMain = classNames(
  "m-2 border-4 border-slate-600 max-h-[80vh] min-h-[70vh]"
)

export const mbHomeProfileBorder = classNames(
  "h-16 border-b-4 border-slate-600"
)

{/*------------------------ Chatting section -------------------------*/}

export const mbChatMain = classNames(
  "m-2 border-4 border-slate-600 max-h-[80vh] min-h-[70vh]"
)