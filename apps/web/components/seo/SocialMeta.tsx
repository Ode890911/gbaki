import Head from 'next/head'

interface SocialMetaProps {
  title: string
  description: string
  image: string
  url: string
  type?: 'website' | 'article' | 'product'
  siteName?: string
  twitterCard?: 'summary' | 'summary_large_image'
  twitterSite?: string
}

export function SocialMeta({
  title,
  description,
  image,
  url,
  type = 'website',
  siteName = 'Gbaki Digital Solutions',
  twitterCard = 'summary_large_image',
  twitterSite = '@gbakidigital',
}: SocialMetaProps) {
  return (
    <Head>
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <link rel="canonical" href={url} />
    </Head>
  )
}

