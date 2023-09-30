import { FC } from "react";

export interface MenuItemProps {
  id: number
  name: string
  img: string
  price: number
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <div className="menu_item" style={styles.menu_item} key={props.id}>
      <div>
        <img src={props.img} alt="" />
      </div>
      <div className="name and price" style={{ display: 'flex', justifyContent: 'space-around' }}>
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
    // 大きさを指定する
    width: '200px',
    height: '200px',
  }
};