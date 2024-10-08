// next
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import palette from '../theme/palette';
import createEmotionCache from '../utils/createEmotionCache';

// ----------------------------------------------------------------------

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="manifest" href="/manifest.json" />

                    {/* PWA primary color */}
                    <meta name="theme-color" content={palette('light').primary.main} />

                    {/* Favicon */}
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/logo_speakout_branco.png" />

                    {/* Fonts */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Barlow:wght@900&display=swap"
                        rel="stylesheet"
                    />

                    {/* Emotion */}
                    <meta name="emotion-insertion-point" content="" />
                    {(this.props as any).emotionStyleTags}

                    {/* Meta */}
                    <meta
                        name="description"
                        content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
                    />
                    <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
                    <meta name="author" content="Canal Speak Out" />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async ctx => {
    const originalRenderPage = ctx.renderPage

    const cache = createEmotionCache()

    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />
                },
        })

    const initialProps = await Document.getInitialProps(ctx)

    const emotionStyles = extractCriticalToChunks(initialProps.html)

    const emotionStyleTags = emotionStyles.styles.map(style => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ))

    return {
        ...initialProps,
        emotionStyleTags,
    }
}
