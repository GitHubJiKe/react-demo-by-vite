import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function PortalDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<any>();
  const [portal, setPortal] = useState<any>();

  useEffect(() => {
    setPortal(createPortal(children, ref.current));
  }, []);

  return (
    <div>
      <div className="container" ref={ref}></div>
      {portal}
    </div>
  );
}
