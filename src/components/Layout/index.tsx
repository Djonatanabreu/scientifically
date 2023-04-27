import { ReactNode } from 'react';

export const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <header>
        <h1>Scientifically Proven</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};
