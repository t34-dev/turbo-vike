import React, { FC } from "react";
import { Link } from "@/components/Link";

interface MetaItem {
  title: string;
  theme?: {
    layout: string;
  };
  items?: {
    [key: string]: string;
  };
}

interface MetaData {
  [key: string]: MetaItem | string;
}
interface RenderNavigationProps {
  meta: MetaData;
  basePath?: string;
}
export const RenderNavigation: FC<RenderNavigationProps> = ({ meta, basePath = "/docs" }) => {
  return (
    <nav>
      <ul>
        {Object.entries(meta).map(([key, value]) => {
          if (typeof value === "string") {
            return (
              <li key={key}>
                <Link href={`${basePath}/${key}`}>{value}</Link>
              </li>
            );
          } else {
            const item = value as MetaItem;
            return (
              <li key={key}>
                <Link href={`${basePath}/${key}`}>{item.title}</Link>
                {item.items && (
                  <ul>
                    {Object.entries(item.items).map(([subKey, subValue]) => (
                      <li key={subKey}>
                        <Link href={`${basePath}/${key}/${subKey}`}>{subValue}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};
