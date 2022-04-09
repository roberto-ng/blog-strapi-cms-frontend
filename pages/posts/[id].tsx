import Head from 'next/head';
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { useMemo } from 'react';
import { IconButton, Paper, Typography } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBackIosNew'
import ReactMarkdown from 'react-markdown'
import { buscarPost, Post } from '../../lib/api'
import styles from '../../styles/Post.module.css'

interface Props {
    post?: Post,
    erro?: string,
}

const PaginaPost: NextPage<Props> = ({post, erro}) => {
    const dataFormatada = useMemo(() => {
        if (post != null) {
            const data = new Date(post.createdAt);
            return formatarData(data);
        } 

        return '';
    }, []);

    if (erro != null) {
        return (
            <div>
                <h5>{erro}</h5>
            </div>
        );
    } else if (post == null) {
        return (
            <div>
                <h5>Post não encontrado</h5>
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>{post.titulo} - Blog</title>
            </Head>

            <Link href="/">
                <IconButton size="large">
                    <ArrowBack />
                </IconButton>
            </Link>

            <main className={styles.main}>
                <article>
                    <Paper elevation={3} sx={{ minWidth: 300, maxWidth: '100%', minHeight: 200, margin: 2 }}>
                        <Typography variant="h5" align="center">
                            {post.titulo}
                        </Typography>
                        
                        <Typography variant="subtitle1" style={{ marginLeft: 10, marginBottom: 0 }}>
                            {dataFormatada}
                        </Typography>

                        <ReactMarkdown className={styles.postConteudo}>
                            {post.texto}
                        </ReactMarkdown>
                    </Paper>
                </article>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const id = context.params?.id;

    if (typeof id === 'string') {
        try {
            const resposta = await buscarPost(id);
            const post = resposta.data?.attributes;

            if (post != null) {
                // Post encontrado com sucesso
                return {
                    props: {
                        post,
                    },
                };
            }
        } catch (e: any) {
            return {
                props: {
                    erro: e.toString(),
                },
            };
        }
    }

    // se o post não for encontrado ou se o id for inválido
    return {
        notFound: true,
    };
};

function formatarData(data: Date, locale: string = 'pt-BR') {
    const horaFormatada = data.toLocaleTimeString(locale);
    const dataFormatada = data.toLocaleDateString(locale, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
    });


    return `${dataFormatada} - ${horaFormatada}`;
}

export default PaginaPost