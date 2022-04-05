import qs from 'qs'

export interface Post {
    titulo: string,
    texto: string,
    capa: Resposta< Dado<Midia> >,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
}

export interface Midia {
    name: string,
    width: number,
    height: number,
    url: string,
    formats: {
        thumbnail: MidiaFormato,
        large: MidiaFormato,
        medium: MidiaFormato,
        small: MidiaFormato,
    },
}

export interface MidiaFormato {
    name: string,
    hash: string,
    width: number,
    height: number,
    url: string,
}

export type MidiaFormatoNome = 'thumbnail' | 'large' | 'medium' | 'small';

export interface Dado<T> {
    id: number,
    attributes: T,
}

export interface Resposta<T> {
    data: T | null,
    meta: any,
}

/** Uma resposta da API com um único item */
export type RespostaItem<T> = Resposta<Dado<T>>;

/** Uma resposta da API com múltiplos itens */
export type RespostaLista<T> = Resposta<Array<Dado<T>>>;

/** Retorna a URL completa do Strapi */
export function getStrapiURL(caminho = '') {
    const endereco = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
    return `${endereco}${caminho}`;
}

export function getMediaURL(
    midia: RespostaItem<Midia>, 
    formato: MidiaFormatoNome = 'thumbnail',
) {
    const caminho = midia.data?.attributes.formats[formato]?.url;
    if (caminho != null) {
        return getStrapiURL(caminho);
    } else {
        return undefined;
    }
}

export async function buscarTodosPosts() {
    const query = qs.stringify({
        populate: '*',
        sort: 'createdAt:desc'
    });
    const url = getStrapiURL(`/api/posts?${query}`);
    const resposta = await fetch(url);
    if (!resposta.ok) {
        console.error(resposta.statusText);
        throw new Error(`Erro ${resposta.status}. Por favor, tente novamente`);
    }

    const posts: RespostaLista<Post> = await resposta.json();
    return posts;
}

export async function buscarPost(id: string) {
    const url = getStrapiURL(`/api/posts/${id}`);
    const resposta = await fetch(url);

    if (!resposta.ok) {
        console.error(resposta.statusText);
        throw new Error(`Erro ${resposta.status}. Por favor, tente novamente`);
    }

    const post: RespostaItem<Post> = await resposta.json();
    return post;
}