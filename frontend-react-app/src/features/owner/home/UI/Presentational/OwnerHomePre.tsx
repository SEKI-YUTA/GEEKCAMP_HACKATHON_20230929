import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';

interface OwnerHomePreProps {
  
}

/**
 * ホーム画面のコンポーネント（Presentational）
 * ここにUIを書く
 * @returns 
 */
export const OwnerHomePre: FC<OwnerHomePreProps> = () => {
  return (
    <>
      <Layout title='MaaS'>
        Hello
      </Layout>
    </>
  );
};