import React, {useId} from 'react'

const Select = ({options, label, className, ...props}, ref) => {
    const id = useId();
  return (
    <div>
        {label && <label htmlFor={id} className=''>{label}</label>}
        <select className={`${className}`} id={id} ref={ref} {...props}>
            {
                options?.map((option) => {
                    <option value={option} key={option}>{option}</option>
                })
            }
        </select>
    </div>
  )
}

export default React.forwardRef(Select)