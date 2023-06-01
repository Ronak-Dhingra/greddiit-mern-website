import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoaderButton.css";

export default function LoaderButton({
  LoadingStatus,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      disabled={disabled || LoadingStatus}
      className={`LoaderButton ${className}`}
      {...props}
    >
      {LoadingStatus && <BsArrowRepeat className="spinning" />}
      {props.children}
    </Button>
  );
}