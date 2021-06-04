import React, { FC, HTMLProps, ReactElement } from 'react'
import {
  Input
} from '../../styles/FormStyle'
import {
  mergeClasses,
  classNames
} from '../../helpres/utils'

interface InputTextProps extends HTMLProps<HTMLInputElement> {
  wrapperClassName?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const InputConponent: FC<InputTextProps> = ({
  wrapperClassName,
  // className,
  leftIcon,
  rightIcon
  // ...props
}) => {
  return (
    <div className={mergeClasses(wrapperClassName, "relative")}>
      {leftIcon && (
        <div
          className={classNames([
            "absolute left-0 top-0 px-3 py-2",
          ])}
        >
          {leftIcon}
        </div>
      )}
      <Input />
      {rightIcon && (
        <div
          className={classNames([
            "absolute right-0 top-0 px-3 py-2",
          ])}
        >
          {rightIcon}
        </div>
      )}
    </div>
  )
}

export default InputConponent
