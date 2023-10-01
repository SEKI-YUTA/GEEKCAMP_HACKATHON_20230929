import { FC } from "react";

export interface MenuItemProps {
  id: number
  name: string
  img: string
  price: number
  onPress: () => void
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <div className="menu_item" style={styles.menu_item} key={props.id} onClick={props.onPress}>
      <div className="img_area">
        <img src={props.img} alt="" />
      </div>
      <div className="name_and_price" style={styles.name_and_price}>
        <div>{props.name}</div>
        <div>{props.price}円</div>
      </div>
    </div>
  )
}

const styles = {
  menu_item: {
    // 外縁を黒にする
    border: 'solid 1px black',
    // 外縁を丸くする
    borderRadius: '10px',
  },
  name_and_price: {
    display: 'flex',
    justifyContent: 'space-around',
  }
};