import React from "react";

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h2 className="text-2xl lg:text-3xl font-semibold border-b-2 border-slate-600 pb-2 lg:pl-2">
      {children}
    </h2>
  );
};

export default SectionTitle;
