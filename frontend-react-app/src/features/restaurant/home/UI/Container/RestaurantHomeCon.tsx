import type { FC } from 'react';
import { RestaurantHomePre } from '../Presentational/RestaurantHomePre';
import { CategoryType } from '../../../../../application/@types/Category';

/**
 * レストラン, ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、RestaurantHomePreに渡す
 */

export const RestaurantHomeCon: FC = () => {
  return <RestaurantHomePre
    categoryList={[{ id: 1, name: 'カテゴリー1' }, { id: 2, name: 'カテゴリー2' }]}
    menuItemList={[{ id: 1, name: 'メニュー1', price: 100, description: 'メニュー1の説明', photo_url: "", restaurant_id: 1, category: 'カテゴリー1' }, { id: 2, name: 'メニュー2', price: 200, description: 'メニュー2の説明', photo_url: "", restaurant_id: 1, category: 'カテゴリー2' }]}
    selectedCategory={{} as CategoryType}
    isLargerThan800={false}
    isLargerThan1200={false}
    onClickCategory={() => { }}
  />;
}