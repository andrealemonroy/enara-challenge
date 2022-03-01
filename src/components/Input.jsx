import React from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Input = (props) => {
  return (
    <div className="flex flex-center flex-justify-end xs-mt-5">
      <input
        className={classNames(props.valid ? "text-green" : "text-red", "w-full h-18 text-xl bg-white px-1 tracking-widest xs-h-10")}
        value={props.value}
        disabled={props.disabled}
      />
      {props.valid !== null ? (
        <label className="absolute mr-1  opacity-5">
          {props.valid ? (
            <span className="text-green">valid</span>
          ) : (
            <span className="text-red">invalid</span>
          )}
        </label>
      ) : null}
    </div>
  );
};

export default Input;
