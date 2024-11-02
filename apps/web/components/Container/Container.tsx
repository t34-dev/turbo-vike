import s from "./Container.module.scss";
import React, { FC, PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({ children, className = "" }) => {
  return <div className={`${s.container} ${className}`}>{children}</div>;
};
