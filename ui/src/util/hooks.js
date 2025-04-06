import { useEffect } from "react";

export function onComponentLoad(callback) {
  useEffect(() => {
    (async () => {
      await callback();
    })();
  }, []);
}

export function onComponentUnload(callback) {
  useEffect(() => {
    return () => {
      (async () => {
        await callback();
      })();
    };
  }, []);
}
