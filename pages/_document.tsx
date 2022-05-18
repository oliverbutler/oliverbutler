import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head />
        <body className="overflow-x-hidden text-gray-600 dark:bg-black dark:text-gray-400">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
