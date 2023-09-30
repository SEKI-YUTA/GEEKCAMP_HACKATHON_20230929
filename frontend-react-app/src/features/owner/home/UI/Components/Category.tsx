import { FC } from "react";

interface CategoryProps {
  name: string
}

export const Category: FC<CategoryProps> = (props) => {
  return (
    <div className="category" >
      {props.name}
    </div>
  )
}