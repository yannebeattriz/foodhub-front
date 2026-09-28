"use client";

import { useEffect, useState } from "react";

export default function Home() {

    const [produtos, setProdutos] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/produtos")
            .then(response => response.json())
            .then(data => setProdutos(data));
    }, []);

    return (
        <main className="  p-10 bg-amber-50">

            <h1 className="text-3xl font-bold text-pink-700">
                Nossos Produtos
            </h1>

            {produtos.map((produto, index) => (
                <p key={index}>
                    {produto.nome} - R$ {produto.preco}
                </p>
            ))}

        </main>
    );
}
