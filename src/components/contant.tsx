"use client";
import React, { useEffect, useState } from "react";

interface props {
  tema: boolean;
}
/**
 * Melhorias sugeridas:
 * 1. Tipagem mais precisa para props (tema: boolean).
 * 2. Renomear interface para PascalCase (Props).
 * 3. Corrigir lógica de verificação de vitória (usar estado atualizado).
 * 4. Evitar alert, usar estado para mostrar vencedor.
 * 5. Prevenir jogada em espaço já preenchido.
 * 6. Melhorar nomes de variáveis (vez -> getCurrentPlayer, space -> handleCellClick).
 * 7. Adicionar feedback visual para vencedor/empate.
 * 8. Separar lógica de vitória em função.
 * 9. Remover "use client" se não necessário.
 * 10. Adicionar botão de reiniciar.
 */
export default function Content({ tema = false }: props) {
  const [state, setState] = useState<string[]>([]);
  const [turno, setTurno] = useState(true);
  const [winX, setwinx] = useState(Number);
  const [winO, setwinO] = useState(Number);

  useEffect(() => {
    setState(Array(9).fill(""));
  }, []);

  const vez = () => {
    if (turno === true) {
      return "X";
    } else {
      return "O";
    }
  };

  const space = (id: number) => {
    if (state[id] !== "") return;

    setState((prev) => prev.map((p, idx) => (idx === id ? `${vez()}` : p)));
  };

  const isBoardEmpty = (board: string[]) => board.every((e) => e === "");

  useEffect(() => {
    if (isBoardEmpty(state)) return;

    const combinaçoes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    combinaçoes.forEach((p) => {
      if (
        state[p[0]] === state[p[1]] &&
        state[p[1]] === state[p[2]] &&
        state[p[0]] !== ""
      ) {
        // alert(`O ${turno ? "O" : "X"} venceu`);
        setState(Array(9).fill(""));
        if (turno) {
          setwinx(winX + 1);
          setTurno(true);
        } else {
          setwinO(winO + 1);
          setTurno(true);
        }
      }
    });
    if (state.every((e) => e !== "")) {
      setState(Array(9).fill(""));
    }
    setTurno(!turno);
  }, [state]);

  return (
    <div className="flex flex-col lg:flex-row  w-full lg:w-fit lg:space-x-55 gap-10 lg:px-10">
      <div className="flex flex-col  justify-center items-center lg:w-fit bg-purple-50 border border-black px-20 rounded-2xl m-auto sm:w-1/3 lg:ml-0  ">
        <h1
          className={`${
            tema ? "text-blue-700" : "text-purple-700"
          }text-3xl font-bold `}
        >
          Wins
        </h1>
        <div className="flex space-x-5">
          <div className="flex flex-col">
            <h1>X</h1>
            <h2>{winX}</h2>
          </div>

          <span className="h-20 lg:h-64 w-[1px] inline bg-black"></span>
          <div className="flex flex-col">
            <h1>O</h1>
            <h2>{winO}</h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 ml-auto  w-full sm:w-fit p-10 lg:p-0  ">
        {state.map((item, index) => (
          <div
            onClick={() => space(index)}
            id={`${index}`}
            key={index}
            className={`border rounded-lg shadow-md transition-colors duration-300 cursor-pointer
              ${
                tema
                  ? "border-blue-400 bg-blue-50 hover:bg-blue-200 text-blue-700"
                  : "border-purple-400 bg-purple-50 hover:bg-purple-200 text-purple-700"
              }
              w-24 h-24 flex items-center justify-center text-3xl font-bold`}
          >
            {item}
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}
