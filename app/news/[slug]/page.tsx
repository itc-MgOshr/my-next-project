import { notFound } from 'next/navigation';
import { getNewsDetail } from '@/app/_libs/microcms';
import Article from '@/app/_components/Article';
import ButtonLink from '@/app/_components/ButtonLink';
import styles from './page.module.css';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    dk?: string;
  }>;
};

export default async function Page({ params, searchParams }: Props) {
  const data = await getNewsDetail((await params).slug, {
    draftKey: (await searchParams).dk,
  }).catch(notFound);

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/news">ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}
