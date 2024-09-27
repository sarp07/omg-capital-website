import React, { ReactNode } from "react";

type ContainerProps = {
   children: ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
   return (
      <div className="w-full max-w-[1320px] mx-auto h-auto flex">
         {children}
      </div>
   );
};

export default Container;
