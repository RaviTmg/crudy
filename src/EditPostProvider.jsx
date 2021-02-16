import { createContext, useContext, useRef, useState } from "react";
import EditPostDialog from "./EditPostDialog";

const EditPostContext = createContext();
export const useConfirmation = () => useContext(EditPostContext);

export const EditPostProvider = ({ children }) => {
  const [confirmationState, setConfirmationState] = useState();

  const awaitingPromiseRef = useRef();

  const openConfirmation = (options) => {
    setConfirmationState(options);
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (confirmationState.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setConfirmationState(null);
  };

  const handleSubmit = (value) => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve(value);
    }

    setConfirmationState(null);
  };

  return (
    <>
      <EditPostContext.Provider value={openConfirmation} children={children} />
      {confirmationState && (
        <EditPostDialog handleEditPost={handleSubmit} onClose={handleClose} {...confirmationState} />
      )}
    </>
  );
};
