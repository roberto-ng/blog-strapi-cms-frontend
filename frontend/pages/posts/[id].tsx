import { FunctionComponent } from 'react'
import { GetServerSideProps } from 'next'
import { buscarPost, Dado, Post } from '../../lib/api';

interface Props {
    post?: Dado<Post>,
    erro?: string,
}

const PaginaPost: FunctionComponent<Props> = ({post, erro}) => {
    return (
        <div>{post?.attributes?.titulo}</div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const id = context.params?.id;

    if (typeof id === 'string') {
        try {
            const resposta = await buscarPost(id);
            const post = resposta.data;

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

export default PaginaPost