import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
  return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() { //指定される可能性のあるidをまとめておく
  // Return a list of possible value for id (array of objects with key "params")
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false //指定パス以外なら404を返す (trueにすることで自分でその場合のためのページを書くことができる)
  }
}

export async function getStaticProps({params}){　//特定のidのデータの中身を返す
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id.join('/')) //joinしてあげないとparams.idは配列なのでurlになれない
    return {
        props:{
            postData
        }
    }
}