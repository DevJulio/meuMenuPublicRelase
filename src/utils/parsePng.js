import pngjs from "pngjs";
import React, { useEffect, useRef } from "react";

var fs = require("fs");

function alterarCorIcone(caminhoIcone, novaCor) {
  // Carrega o arquivo PNG
  const arquivoPng = fs.readFileSync(caminhoIcone);
  const png = pngjs.PNG.sync.read(arquivoPng);

  // Obtém as dimensões da imagem
  const largura = png.width;
  const altura = png.height;

  // Percorre todos os pixels da imagem
  for (let x = 0; x < largura; x++) {
    for (let y = 0; y < altura; y++) {
      // Obtém o índice do pixel atual na matriz de pixels
      const idx = (png.width * y + x) << 2;

      // Obtém a cor atual do pixel
      const corAtual = {
        r: png.data[idx],
        g: png.data[idx + 1],
        b: png.data[idx + 2],
        a: png.data[idx + 3],
      };

      // Se a transparência do pixel for 0, mantém a cor atual
      if (corAtual.a === 0) continue;

      // Aplica a nova cor ao pixel
      const novaCorRgba = novaCor.concat(corAtual.a);
      png.data[idx] = novaCorRgba[0];
      png.data[idx + 1] = novaCorRgba[1];
      png.data[idx + 2] = novaCorRgba[2];
      png.data[idx + 3] = novaCorRgba[3];
    }
  }

  // Retorna a imagem modificada
  return pngjs.PNG.sync.write(png);
}

function IconeAlteravel({ caminhoIcone, cor }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Carrega a imagem e altera sua cor
    const imagemModificada = alterarCorIcone(caminhoIcone, cor);

    // Desenha a imagem modificada no canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imagemModificada;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }, [caminhoIcone, cor]);

  return <canvas ref={canvasRef} />;
}
