import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const LeftBloc = () => {
  const router = useRouter();

  return (
    <div className="outerWrap">
      <div className="App"></div>
      <div className="musicControls">
        <div>
          <Link href="/" passHref>
            <span className={router.pathname === "/players" ? "active" : "link"}></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftBloc;
