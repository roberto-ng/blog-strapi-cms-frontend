export interface Post {
    titulo: string,
    texto: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
}

export interface Dado<T> {
    id: number,
    attributes: T,
}

export interface Resposta<T> {
    data: Dado<T>[],
    meta: any,
}

/** Retorna a URL completa do Strapi */
export function getStrapiURL(caminho = '') {
    const endereco = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
    return `${endereco}${caminho}`;
}

export async function buscarTodosPosts(): Promise<Resposta<Post>> {
    const url = getStrapiURL('/api/posts');
    const resposta = await fetch(url);
    if (!resposta.ok) {
        console.error(resposta.statusText);
        throw new Error(`Erro ${resposta.status}. Por favor, tente novamente`);
    }

    return await resposta.json();
}