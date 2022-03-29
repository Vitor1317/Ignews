import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../Components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    productId: String;
    amount: Number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
    <Head>
      <title>Home | Ig.News</title>
    </Head>
    <main className={styles.contentContainer}>

      <section className={styles.hero}> 
        <span>👏 Hey, Welcome</span>
        <h1>News about the <span>React</span> world. </h1>
        <p>
          Get acess to all publications <br/>
          <span>for {product.amount} mouth</span>
        </p>

        <SubscribeButton priceId={product.productId} />
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />

    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () =>{

  const price = await stripe.prices.retrieve('price_1KdMn1Gg1lrJ6ZPKYYHMly8T')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    props:{
      product: product
    },
    revalidate: 60 * 60 * 24
  }
}
