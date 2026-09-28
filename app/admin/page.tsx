"use client";

import { useState } from "react";

export default function Home() {

    const [produtos, setProdutos] = useState<any[]>([]);

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");

    async function carregarProdutos() {

        const response = await fetch(
            "http://localhost:3001/produtos"
        );

        const data = await response.json();

        setProdutos(data);
    }

    async function cadastrarProduto() {

        try {

            const response = await fetch(
                "http://localhost:3001/produtos",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome,
                        preco
                    })
                }
            );

            const data = await response.json();

            alert(data.mensagem);

            setNome("");
            setPreco("");

            carregarProdutos();

        } catch (error) {

            alert("Erro ao cadastrar produto");

        }
    }

    return (
        <main className=" bg-pink-900 p-10">

            <h1 className="text-3xl font-bold text-white">
                Produtos
            </h1>

            <button
                type="button"
                onClick={carregarProdutos}
                className="mt-5 cursor-pointer rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
            >
                Carregar Produtos
            </button>

            <div className="mt-5 flex max-w-md flex-col gap-3">

                <input
                    className="border p-2"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    className="border p-2"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />

                <button
                    type="button"
                    onClick={cadastrarProduto}
                    className="cursor-pointer rounded bg-pink-500 p-2 text-white hover:bg-pink-600"
                >
                    Cadastrar Produto
                </button>

            </div>

            <div className="mt-10">

                {produtos.map((produto, index) => (

                    <div
                        key={index}
                        className="mb-2 border bg-white p-3"
                    >
                        <p>
                            Nome: {produto.nome}
                        </p>

                        <p>
                            Preço: R$ {produto.preco}
                        </p>

                    </div>

                ))}

            </div>

        </main>
    );
}
