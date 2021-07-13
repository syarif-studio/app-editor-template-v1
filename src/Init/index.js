import { useEffect } from "react";
import { syncWithAsyncStorage } from "../Hook";

export default function Init() {
  useEffect(() => {
    syncWithAsyncStorage();
  }, []);

  return null;
}
