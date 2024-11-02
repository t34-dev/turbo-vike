import { MantineProvider as BaseMantineProvider, createTheme } from "@mantine/core";
import React, { FC, PropsWithChildren } from "react";

// Создаем тему
const theme = createTheme({
  scale: 1.4,
});

export const MantineProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseMantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </BaseMantineProvider>
  );
};
